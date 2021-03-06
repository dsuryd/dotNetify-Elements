import React, { useState } from "react";
import styled from "styled-components";
import { Markdown, VMContext, withTheme } from "dotnetify-elements";
import { DropdownList, Element, NumberField, TextField } from "dotnetify-elements";
import { currentFramework, Expander, Article } from "../components";

const Introduction = () => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <Article vm="Introduction" id="Content" onChangeFramework={x => setFramework(x)}>
      <Markdown id="Content" condition={framework}>
        <Expander label={<SeeItLive />} content={<NameInput />} />
        <Expander label={<SeeItLive />} content={<NameGenderInput />} />
        <Expander label={<SeeItLive />} content={<PrimeInput />} />
        <Expander label={<SeeItLive />} content={<RealtimeClock />} connectOnExpand />
      </Markdown>
    </Article>
  );
};

const SeeItLive = _ => <b>See It Live!</b>;

const HelloWorld = _ => (
  <VMContext vm="HelloWorld">
    <div>
      <Element id="Greetings" />
    </div>
  </VMContext>
);

const NameInput = _ => (
  <VMContext vm="NameInput">
    <TextField id="Name" label="Name:" placeholder="Enter your name" />
    <br />
    You typed:{" "}
    <b>
      <Element id="Name" />
    </b>
  </VMContext>
);

const NameGenderInput = _ => (
  <VMContext vm="NameGenderInput">
    <TextField id="Name" />
    <DropdownList id="Gender" />
  </VMContext>
);

const PrimeInput = _ => (
  <VMContext vm="PrimeInput">
    <NumberField id="Prime" />
  </VMContext>
);

const DigitalStyle = styled.div`
  font-family: "Orbitron";
  font-size: 4rem;
  display: flex;
  justify-content: center;
`;

const RealtimeClock = _ => (
  <VMContext vm="RealtimeClock">
    <DigitalStyle>
      <Element id="Clock" />
    </DigitalStyle>
  </VMContext>
);

export default withTheme(Introduction);
