import SwapModal from "../modal/SwapModal";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  // text-align: center;
  margin: 0 auto;
`;

export default function SwapUI() {
  return (
    <Wrapper>
      <div>
        스왑
        {/* 설정 이미지 누르면 모달창 <div></div> */}
        <div>
          <div>
            <div></div>
            <div>잔액</div>
          </div>
          <div></div>
          <div>
            <div></div>
            <div>잔액</div>
          </div>
        </div>
        <div>금액을 입력하세요.</div>
      </div>
    </Wrapper>
  );
}
