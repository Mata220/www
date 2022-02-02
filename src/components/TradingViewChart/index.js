import React, { Component } from "react";
import binanceAPI from "../../services/api";
import "./index.scss";
export default class TradingViewChart extends Component {
  constructor({ chartProperties }) {
    super();
    this.state = {
      isChartReady: false,
    };
    this.bfAPI = new binanceAPI({ debug: false });
    this.widgetOptions = {
      container_id: "chart_container",
      datafeed: this.bfAPI,
      library_path: "/scripts/charting_library/",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates","symbol_search_hot_key"],
      charts_storage_url: 'https://saveload.tradingview.com',
			charts_storage_api_version: "1.1",
      ...chartProperties
    };
    this.tradingViewWidget = null;
    this.chartObject = null;
  }

  chartReady = () => {
    if (!this.tradingViewWidget) return
    this.tradingViewWidget.onChartReady(() => {
      this.chartObject = this.tradingViewWidget.activeChart();
    });
  };

  componentDidMount() {
    this.tradingViewWidget = window.tvWidget = new window.TradingView.widget(
      this.widgetOptions
    );
    this.chartReady();
  }

  componentDidUpdate() {
    if (!this.tradingViewWidget) return
  }

  render() {
    return <div id="chart_container"></div>
  }
}
