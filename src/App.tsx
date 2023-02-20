import Navigator from "./navigation/Navigator";
import SwapUI from "./screen/SwapUI";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  // text-align: center;
  margin: 0 auto;
`;

const Screen = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  // text-align: center;
  margin: 0 auto;
`;

export default function App() {
  return (
    <Wrapper>
      <Navigator />
      <Screen>
        <SwapUI />
      </Screen>
    </Wrapper>
  );
}
