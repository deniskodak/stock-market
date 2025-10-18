export const WIDGET_BASE_URL = 'https://s3.tradingview.com/external-embedding/embed-widget-'
export const WIDGET_URLS_MAP = {
  marketOverview: WIDGET_BASE_URL + 'market-overview.js',
  heatmap: WIDGET_BASE_URL + 'stock-heatmap.js',
  topStories: WIDGET_BASE_URL + 'timeline.js',
  marketQuotes: WIDGET_BASE_URL + 'market-quotes.js',
}

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: 'dark', // dark mode
  dateRange: '1d', // last 1 d
  locale: 'en', // language
  largeChartUrl: '', // link to a large chart if needed
  isTransparent: true, // makes background transparent
  showFloatingTooltip: true, // show tooltip on hover
  plotLineColorGrowing: '#0FEDBE', // line color when price goes up
  plotLineColorFalling: '#0FEDBE', // line color when price falls
  gridLineColor: 'rgba(240, 243, 250, 0)', // grid line color
  scaleFontColor: '#DBDBDB', // font color for scale
  belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)', // fill under line when growing
  belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)', // fill under line when falling
  belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
  belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
  symbolActiveColor: 'rgba(15, 237, 190, 0.05)', // highlight color for active symbol
  tabs: [
    {
      title: 'Crypto',
      symbols: [
        { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
        { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
        { s: 'BINANCE:SOLUSDT', d: 'Solana' },
        { s: 'BINANCE:XRPUSDT', d: 'XRP' },
        { s: 'BINANCE:ADAUSDT', d: 'Cardano' },
      ],
    },
    {
      title: 'Financial',
      symbols: [
        { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
        { s: 'NYSE:WFC', d: 'Wells Fargo Co New' },
        { s: 'NYSE:BAC', d: 'Bank Amer Corp' },
        { s: 'NYSE:HSBC', d: 'Hsbc Hldgs Plc' },
        { s: 'NYSE:C', d: 'Citigroup Inc' },
        { s: 'NYSE:MA', d: 'Mastercard Incorporated' },
      ],
    },
    {
      title: 'Technology',
      symbols: [
        { s: 'NASDAQ:AAPL', d: 'Apple' },
        { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
        { s: 'NASDAQ:MSFT', d: 'Microsoft' },
        { s: 'NASDAQ:FB', d: 'Meta Platforms' },
        { s: 'NYSE:ORCL', d: 'Oracle Corp' },
        { s: 'NASDAQ:INTC', d: 'Intel Corp' },
      ],
    },
  ],
  support_host: 'https://www.tradingview.com', // TradingView host
  backgroundColor: '#141414', // background color
  width: '100%', // full width
  height: 600, // height in px
  showSymbolLogo: true, // show logo next to symbols
  showChart: true, // display mini chart
};

export const HEATMAP_WIDGET_CONFIG = {
  dataSource: 'SPX500',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  grouping: 'sector',
  isTransparent: true,
  locale: 'en',
  symbolUrl: '',
  colorTheme: 'dark',
  exchanges: [],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: '100%',
  height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: 'regular',
  feedMode: 'market',
  colorTheme: 'dark',
  isTransparent: true,
  locale: 'en',
  market: 'stock',
  width: '100%',
  height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
  title: 'Stocks',
  width: '100%',
  height: 600,
  locale: 'en',
  showSymbolLogo: true,
  colorTheme: 'dark',
  isTransparent: false,
  backgroundColor: '#0F0F0F',
  symbolsGroups: [
    {
      name: 'Crypto',
      symbols: [
        { name: 'BINANCE:BTCUSDT', displayName: 'Bitcoin' },
        { name: 'BINANCE:ETHUSDT', displayName: 'Ethereum' },
        { name: 'BINANCE:SOLUSDT', displayName: 'Solana' },
        { name: 'BINANCE:XRPUSDT', displayName: 'XRP' },
        { name: 'BINANCE:ADAUSDT', displayName: 'Cardano' },
      ],
    },
    {
      name: 'Financial',
      symbols: [
        { name: 'NYSE:JPM', displayName: 'JPMorgan Chase' },
        { name: 'NYSE:WFC', displayName: 'Wells Fargo Co New' },
        { name: 'NYSE:BAC', displayName: 'Bank Amer Corp' },
        { name: 'NYSE:HSBC', displayName: 'Hsbc Hldgs Plc' },
        { name: 'NYSE:C', displayName: 'Citigroup Inc' },
        { name: 'NYSE:MA', displayName: 'Mastercard Incorporated' },
      ],
    },
    {
      name: 'Technology',
      symbols: [
        { name: 'NASDAQ:AAPL', displayName: 'Apple' },
        { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
        { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
        { name: 'NASDAQ:FB', displayName: 'Meta Platforms' },
        { name: 'NYSE:ORCL', displayName: 'Oracle Corp' },
        { name: 'NASDAQ:INTC', displayName: 'Intel Corp' },
      ],
    },
  ],
};
