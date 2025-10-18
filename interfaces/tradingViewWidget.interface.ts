export interface TradingViewWidgetProps {
  height?: number;
  scriptScr: string;
  className?: string;
  label: string;
  config: object;
  hideLabel?: boolean;
}

export type useTradingViewWidgetProps = Pick<TradingViewWidgetProps, 'config' | 'height' | 'scriptScr'>