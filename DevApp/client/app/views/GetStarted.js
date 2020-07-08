import React, { useState } from "react";
import { Markdown, withTheme } from "dotnetify-elements";
import { currentFramework, Article } from "../components";

const GetStarted = _ => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <Article vm="ElementsGetStarted" id="Content" onChangeFramework={x => setFramework(x)}>
      <Markdown id="Content" condition={framework} />
    </Article>
  );
};

export default withTheme(GetStarted);
