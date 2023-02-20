import SwapModal from "../modal/SwapModal";
import styled from "styled-components";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  text-align: center;
  .rounded {
    margin: 0 0 0 30%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 40%;
    height: 300px;
    border-radius: 15px;
    background: #908790;
  }
`;

const SwapText = styled.div`
  height: 40px;
  color: #ffffff;
  .left_text {
    font-size: 18px;
    font-weight: bold;
    margin-right: 40%;
  }
  .right_icon {
    width: 18px;
    height: 18px;
    margin-left: 40%;
    cursor: pointer;
  }
`;

const CoinBox = styled.div`
  height: 200px;
  position: relative;
  .InputText {
    position: relative;
    margin: 10px;
    height: 95px;
    border-radius: 15px;
    background: #766c76;
  }
  .arrowDown {
    position: absolute;
    color: #ffffff;
    width: 20px;
    height: 20px;
    background-color: #766c76;
    border: 4px solid #908790;
    border-radius: 5px;
    margin: -10px;
    z-index: 5;
    right: 48%;
    top: 48%;
  }
`;

const SwapButton = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;

  margin: 0.5rem;
  height: 50px;
  border-radius: 15px;
  background: #766c76;
`;

export default function SwapUI() {
  return (
    <Wrapper>
      <div className="rounded">
        <SwapText>
          <span className="left_text">스왑</span>
          <FontAwesomeIcon
            icon={faGear}
            className="right_icon"
            onClick={() => alert("준비 중입니다")}
          />
        </SwapText>
        <CoinBox>
          <div className="InputText">
            <div></div>
            <div></div>
          </div>
          <div className="arrowDown">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="InputText">
            <div></div>
            <div></div>
          </div>
        </CoinBox>
        <SwapButton>
          <div>금액을 입력하세요.</div>
        </SwapButton>
      </div>
      <div>Uniswap 사용 가능 : {/* English 버튼 */}</div>
    </Wrapper>
  );
}
