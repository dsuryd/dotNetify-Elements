import React, { useState } from "react";
import { Markdown, withTheme } from "dotnetify-elements";
import { currentFramework, Article, GenerateProject } from "../components";

const GetStarted = _ => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <Article vm="ElementsGetStarted" id="Content" onChangeFramework={x => setFramework(x)}>
      <Markdown id="Content" condition={framework}>
        <GenerateProject
          caption="Generate project from SPA template"
          sourceUrl="https://github.com/dsuryd/dotNetify-Elements"
          sourceDir="Templates/SPA"
        />
      </Markdown>
    </Article>
  );
};

export default withTheme(GetStarted);
