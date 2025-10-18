'use client';

import { useTradingViewWidgetProps } from "@/interfaces/tradingViewWidget.interface";
import { useEffect, useRef } from "react";

const useTradingViewWidget = ({ config, height, scriptScr }: useTradingViewWidgetProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      const containerCurrent = container.current;
      if (!containerCurrent) return;
      if (containerCurrent.dataset.loaded) return;

      containerCurrent.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px"></div>`
      const script = document.createElement("script");
      script.src = scriptScr;
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      containerCurrent.appendChild(script);
      containerCurrent.dataset.loaded = "true";

      return () => {
        if (containerCurrent) {
          containerCurrent.innerHTML = "";
          containerCurrent.dataset.loaded = "false";
        }
      }
    },
    [container, config, height, scriptScr]
  );

  return container;
}

export default useTradingViewWidget;