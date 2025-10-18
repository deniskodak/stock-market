import TradingViewWidget from "@/components/TradingViewWidget";
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG, WIDGET_URLS_MAP } from "@/lib/constants";

const Home = () => {

  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            label="Market Overview"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            scriptScr={WIDGET_URLS_MAP.marketOverview}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            label="Stock heatmap"
            config={HEATMAP_WIDGET_CONFIG}
            scriptScr={WIDGET_URLS_MAP.heatmap}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            label="Top Stories"
            hideLabel={true}
            config={TOP_STORIES_WIDGET_CONFIG}
            scriptScr={WIDGET_URLS_MAP.topStories}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            label="Market Quotes"
            hideLabel={true}
            config={MARKET_DATA_WIDGET_CONFIG}
            scriptScr={WIDGET_URLS_MAP.marketQuotes}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
