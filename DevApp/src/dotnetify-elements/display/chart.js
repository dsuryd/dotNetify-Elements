import merge from "deepmerge";

const emptyTarget = (value) => (Array.isArray(value) ? [] : {});
const clone = (value, options) => merge(emptyTarget(value), value, options);

// Combine array into one: https://github.com/KyleAMathews/deepmerge
function combineMerge(target, source, options) {
  const destination = target.slice();

  source.forEach(function (e, i) {
    if (typeof destination[i] === "undefined") {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? clone(e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = merge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });
  return destination;
}

export function toDataLabelPair(value) {
  let data, label;
  if (value.length == 2) {
    label = value[0];
    data = value[1];
  } else if (value.Key) {
    label = value.Key;
    data = value.Value;
  } else {
    label = "";
    data = value;
  }
  return { data, label };
}

function toChartJsData(config, props, value) {
  let { labels, maxDataSize } = props;

  let data;
  let firstValue = value[0] || {};
  // Value type is array.
  if (firstValue.length == 2) {
    if (!labels) labels = value.map((x) => x[0]);
    data = value.map((x) => x[1]);
  } else if (firstValue.Key) {
    // Value type is key-value pair.
    if (!labels) labels = value.map((x) => x.Key);
    data = value.map((x) => x.Value);
  } else {
    // Value is primitive type.
    data = value.map((x) => x);
  }
  labels = labels || data.map((_) => "");

  if (maxDataSize > 0) {
    labels = labels.slice(-maxDataSize);
    data = data.slice(-maxDataSize);
  }

  config = config || {};
  let configData = merge(
    {
      labels: labels,
      datasets: [{ data: data }]
    },
    config.data || {},
    { arrayMerge: combineMerge }
  );

  return configData;
}

function toChartJsOptions(config, props) {
  let {
    title,
    xAxisLabel,
    yAxisLabel,
    yAxisMin,
    yAxisMax,
    streaming,
    realtime,
    tooltip,
    zoom
  } = props;
  zoom = typeof zoom == "undefined" ? true : zoom;

  config = config || {};
  let configOptions = merge(
    {
      title: { display: !!title, text: title },
      legend: { display: false },
      scales: { xAxes: [], yAxes: [] },
      tooltips: tooltip ? { mode: "nearest", intersect: false } : {},
      pan: zoom ? { enabled: true, mode: "x" } : {},
      zoom: zoom ? { enabled: true, mode: "x" } : {}
    },
    config.options || {},
    { arrayMerge: combineMerge }
  );

  if (!configOptions.scales.yAxes.length) {
    configOptions.scales = merge(configOptions.scales, {
      yAxes: [
        {
          scaleLabel: {
            display: !!yAxisLabel,
            labelString: yAxisLabel
          },
          ticks: {
            suggestedMin: yAxisMin,
            suggestedMax: yAxisMax
          }
        }
      ]
    });
  }

  if (!configOptions.scales.xAxes.length) {
    realtime = realtime || {};
    realtime.delay = realtime.delay || 2000;

    configOptions.scales = merge(configOptions.scales, {
      xAxes: [
        {
          scaleLabel: {
            display: !!xAxisLabel,
            labelString: xAxisLabel
          },
          type: streaming ? "realtime" : undefined,
          realtime
        }
      ]
    });
  }

  return configOptions;
}

export function toChartJsConfig(config, props, value) {
  return {
    data: toChartJsData(config, props, value),
    options: toChartJsOptions(config, props)
  };
}
