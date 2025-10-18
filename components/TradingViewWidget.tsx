"use client";

import useTradingViewWidget from "@/hooks/useTrandingViewWidget";
import { TradingViewWidgetProps } from "@/interfaces/tradingViewWidget.interface";
import { cn } from "@/lib/utils";
import React, { FunctionComponent, memo } from "react";

const TradingViewWidget: FunctionComponent<TradingViewWidgetProps> = ({
  height = 600,
  scriptScr,
  label,
  className = "",
  config,
  hideLabel = false,
}) => {
  const container = useTradingViewWidget({
    config,
    scriptScr,
    height,
  });

  const labelVisibilityClass = hideLabel ? "sr-only" : "";

  return (
    <div className="w-full">
      {/* TODO replace with role header and dynamic aria level */}
      <h3
        className={cn(
          "mb-5 text-2xl font-semibold text-gray-100",
          labelVisibilityClass
        )}
      >
        {label}
      </h3>
      <div className="tradingview-widget-container" ref={container}>
        <div
          className={cn("tradingview-widget-container__widget", className)}
          style={{ height, width: "100%" }}
        ></div>
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">AAPL stock chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
