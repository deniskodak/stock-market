import { getNews } from "../actions/finnhub.actions";
import { getAllUsersForNewsEmail } from "../actions/user.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { sendUserNewsSummaryEmail, sendWelcomeEmail } from "../nodemailer";
import { formatDateToday } from "../utils";
import { inngest } from "./client";
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./promts";

export const INNGEST_EVENTS = {
  USER_CREATED: "app/user.created",
  DAILY_BROADCAST: 'app/daily.broadcast'
}

const CRON_SCHEDULE_DAILY_TIMELINE = '0 12 * * *';

/**
 * Step 1: Prepare base email`s template for new user
 * Step 2: Get personalized unique user welcome message from AI
 * Step 3: Send email with filled template to new user
 */
export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: INNGEST_EVENTS.USER_CREATED },
  async ({ event, step }) => {
    const userProfile = `
      - Country: ${event.data.country || "N/A"}
      - Investment Goals: ${event.data.investmentGoals || "N/A"}
      - Risk tolerance: ${event.data.riskTolerance || "N/A"}
      - Preferred industry: ${event.data.preferredIndustry || "N/A"}
    `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

    if (!(process.env.GEMINI_API_KEY ?? "")) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const response = await step.ai.infer('generate-welcome-intro', {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite", apiKey: process.env.GEMINI_API_KEY }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }]
      }
    })

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText = (part && 'text' in part ? part.text : null) || "Thanks for joining us! Now you have tools to track markets and make smarter moves.";

      if (!event.data.email || !event.data.name) {
        throw new Error("Missing email or name in event data");
      }

      await sendWelcomeEmail(event.data.email, event.data.name, introText);
    });

    return {
      success: true,
      message: 'Email sent successfully'
    }
  }
);

/**
 * Step 1: Get all users for news delivery
 * Step 2: Fetch personalized news for each user
 * Step 3: Summarize these news via AI for each user
 * Step 4: Send email with personalized news to each user
 */
export const sendDailyNewsSummary = inngest.createFunction(
  { id: 'daily-news-summary' },
  [{ event: INNGEST_EVENTS.DAILY_BROADCAST }, { cron: CRON_SCHEDULE_DAILY_TIMELINE }],
  async ({ step, event }) => {
    const todayDate = formatDateToday();

    // Step #1: Fetch all users
    const users = await step.run('get-all-users', getAllUsersForNewsEmail);

    if (!users?.length) {
      return { success: false, message: 'No users found for daily news delivery!' };
    }

    // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
    const results = await step.run('fetch-user-news', async () => {
      const perUser: Array<{ user: typeof users[0]; articles: MarketNewsArticle[] }> = [];
      for (const user of users) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);
          // Enforce max 6 articles per user
          articles = (articles || []).slice(0, 6);
          // If still empty, fallback to general
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error('daily-news: error preparing user news', user.email, e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    // Step #3: Summarize news per user via AI
    const userWithSummarizeNews: { user: User, summaryContent: string | null }[] = [];
    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

        if (!(process.env.GEMINI_API_KEY ?? "")) {
          throw new Error("Missing GEMINI_API_KEY");
        }

        const response = await step.ai.infer(`summarize-news-user-${user.email}`, {
          model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite", apiKey: process.env.GEMINI_API_KEY }),
          body: {
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }]
              }]
          }
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const summaryContent = (part && 'text' in part ? part.text : null) || "Oops, looks like there are no market news.";
        userWithSummarizeNews.push({ user, summaryContent });
      } catch (error) {
        console.error('Failed to summarize news for:', user.email);
        userWithSummarizeNews.push({ user, summaryContent: null })
      }
    }

    // Step #4: Send email with personalized news
    await step.run("send-summary-news", async () => {

      await Promise.all(userWithSummarizeNews.map(async ({user, summaryContent}) => {
        if (!summaryContent) return false;
        return await sendUserNewsSummaryEmail(user.email, todayDate, summaryContent, user.name);
      }))
    });

    return {
      success: true,
      message: 'Email daily news summary sent successfully'
    }
  }
);