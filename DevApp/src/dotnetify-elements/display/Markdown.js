import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Element from "../core/Element";
import markdown from "../utils/markdown";
import * as utils from "../utils";

const ContainerComponent = styled.div`
  ${props => props.theme.Markdown};
  ${props => props.css};
`;

ContainerComponent.defaultProps = { theme: utils.getDefaultTheme() };

const MarkdownText = props => markdown(props.text);
const renderText = section => (typeof section == "string" ? <MarkdownText text={section} /> : section);

export class Markdown extends Element {
  static propTypes = {
    // Identifies the associated view model property.
    id: PropTypes.string,

    // Markdown text.
    text: PropTypes.string,

    // Comma-delimited condition constants.
    condition: PropTypes.string
  };

  static componentTypes = {
    ContainerComponent: ContainerComponent
  };

  mergeInsets(rawText, children) {
    let markdowns = [];
    rawText.split("[inset]").forEach((section, idx) => {
      markdowns.push(section);
      idx < children.length && markdowns.push(children[idx]);
    });

    return markdowns.map((section, idx) => <React.Fragment key={idx}>{renderText(section)}</React.Fragment>);
  }

  processConditions(rawText, condition) {
    const regex = /<if\s(.*)>((.|\r?\n)*?)<\/if>/g;
    let conditionBlocks = [];
    let match;
    while ((match = regex.exec(rawText)) !== null) {
      if (match.index === regex.lastIndex) regex.lastIndex++; // avoid infinite loops with zero-width matches.
      if (match[1]) conditionBlocks.push({ all: match[0], arg: match[1].toLowerCase(), body: match[2] });
    }

    if (conditionBlocks.length > 0) {
      const conditions = (condition && condition.toLowerCase().split(",")) || [];
      conditionBlocks.forEach(
        block => (rawText = rawText.replace(block.all, conditions.includes(block.arg) ? block.body : ""))
      );
    }

    return rawText;
  }

  render() {
    const [Container] = this.resolveComponents(Markdown);
    const { id, fullId, condition, children, style, css, ...props } = this.attrs;
    const _children = React.Children.toArray(children);

    let markdown = null;
    let rawText = this.props.text || this.value;
    if (rawText) {
      rawText = this.processConditions(rawText, condition);
      markdown = this.mergeInsets(rawText, _children);
    } else if (_children.length > 0) {
      markdown = renderText(_children[0]);
    }

    return (
      <Container id={fullId} style={style} css={css} className="markdown" {...props}>
        {markdown}
      </Container>
    );
  }
}
