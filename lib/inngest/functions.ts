import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./promts";

export const INNGEST_EVENTS = {
  USER_CREATED: "app/user.created",
}

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