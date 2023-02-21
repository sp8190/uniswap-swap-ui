import styled from "styled-components";

export default function History() {
  let stringHistory = localStorage.getItem("coin");
  let arrayHistory: string[] = [];
  if (stringHistory === null) {
  } else {
    JSON.parse(stringHistory).map((symbol: string) => {
      arrayHistory.push(symbol);
    });
  }

  return (
    <HistoryContainer>
      {arrayHistory.map((coin: string) => (
        <HistoryContent>
          <HistoryText>{coin}</HistoryText>
        </HistoryContent>
      ))}
    </HistoryContainer>
  );
}

const HistoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-indent: 5px;
  padding: 15px;
  height: 90px;
  border-bottom: 1px solid;
  margin-bottom: 3px;
`;

const HistoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #000000;
  border-radius: 5px;
  background: #908790;
  margin: 2px;
  height: 30px;
`;

const HistoryText = styled.div`
  margin: 5px;
  align-items: center;
  vertical-align: sub;
  color: #ffffff;
  font-size: 16px;
`;
