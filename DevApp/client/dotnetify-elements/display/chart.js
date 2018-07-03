export function toChartJsData(config, props, value) {
   let { labels, maxDataSize } = props;

   let data;
   if (value[0].length == 2) {
      labels = value.map(x => x[0]);
      data = value.map(x => x[1]);
   }
   else if (value[0].Key) {
      labels = value.map(x => x.Key);
      data = value.map(x => x.Value);
   }
   else {
      data = value.map(x => x);
   }

   if (maxDataSize > 0) {
      labels = labels.slice(-maxDataSize);
      data = data.slice(-maxDataSize);
   }

   let configData =
      config && config.data
         ? config.data
         : {
              labels: [],
              datasets: [ { data: [] } ]
           };

   configData.labels = labels;
   configData.datasets[0].data = data;

   return configData;
}

export function toChartJsOptions(config, props) {
   let { xAxisLabel, yAxisLabel } = props;

   let configOptions =
      config && config.options
         ? config.options
         : {
              legend: false,
              scales: {}
           };

   if (yAxisLabel) {
      if (!configOptions.scales.yAxes) {
         configOptions.scales.yAxes = [ { scaleLabel: { display: false } } ];
      }
      configOptions.scales.yAxes[0].scaleLabel.display = true;
      configOptions.scales.yAxes[0].scaleLabel.labelString = yAxisLabel;
   }

   if (xAxisLabel) {
      if (!configOptions.scales.xAxes) {
         configOptions.scales.xAxes = [ { scaleLabel: { display: false } } ];
      }
      configOptions.scales.xAxes[0].scaleLabel.display = true;
      configOptions.scales.xAxes[0].scaleLabel.labelString = xAxisLabel;
   }

   return configOptions;
}
