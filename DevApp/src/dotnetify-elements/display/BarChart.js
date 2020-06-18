import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Element from "../core/Element";
import * as utils from "../utils";
import { toChartJsConfig } from "./chart";

const ChartContainer = styled.div`
  overflow-x: hidden;
  ${props => (props.width ? "width: " + props.width : "")};
  ${props => props.theme.BarChart};
  ${props => props.css};
`;

ChartContainer.defaultProps = { theme: utils.getDefaultTheme() };

export class BarChart extends Element {
  static propTypes = {
    // Identifies the associated view model property.
    id: PropTypes.string,

    // Chart configuration.
    config: PropTypes.object,

    // Sets custom height.
    height: PropTypes.string,

    // Sets custom width.
    width: PropTypes.string
  };

  static componentTypes = {
    ChartContainer,
    ChartComponent: undefined
  };

  getConfig = (config, theme) => ({
    data: {
      datasets: [
        {
          backgroundColor: theme.BarChart.AreaColor
        }
      ]
    },
    ...config
  });

  render() {
    if (!Array.isArray(this.value)) return null;

    const [Container, Chart] = this.resolveComponents(BarChart);
    const { fullId, width, height, config, style, css, ...props } = this.attrs;

    let theme = this.context && this.context.theme;
    if (!theme) theme = utils.getDefaultTheme();

    const _config = this.getConfig(config, theme);
    const { data, options } = toChartJsConfig(_config, props, this.value);

    return (
      <Container id={fullId} width={width} style={style} css={css}>
        <Chart
          data={data}
          height={utils.toPixel(height)}
          options={options}
          {...props}
        />
      </Container>
    );
  }
}
