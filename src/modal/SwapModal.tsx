import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
  nameChange: () => void;
  children: boolean;
}

export default function Modal({
  onClickToggleModal,
  nameChange,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  // children === true 위에 버튼
  // children === false 아래에 버튼
  const [isText, setText] = useState<string>("");

  const TextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value);
  };
  return (
    <ModalWrapper>
      <DialogBox>
        <SwapText>
          <span className="left_text">토큰 선택</span>
          <FontAwesomeIcon
            icon={faX}
            className="right_icon"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
          />
        </SwapText>
        <SearchBox>
          <input
            id="first"
            type="string"
            className="InputCoinName"
            placeholder="이름 검색 또는 주소 붙여 넣기"
            value={isText}
            onChange={TextChange}
          />
        </SearchBox>
        <SearchHistory>{/* 검색 기록 */}</SearchHistory>
        <CoinList>{/* 토큰 리스트 */}</CoinList>
        <CoinManage>
          <div
            onClick={() => {
              alert("준비중입니다.");
            }}
            className="listManage"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>토큰 목록 관리</span>
          </div>
        </CoinManage>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const DialogBox = styled.dialog`
  display: flex;
  width: 60%;
  height: 600px;
  top: 10px;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const SwapText = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  color: #000000;
  align-items: center;
  justify-content: center;
  .left_text {
    font-size: 18px;
    font-weight: bold;
    margin-right: auto;
    margin-left: 18px;
  }
  .right_icon {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    margin-right: 18px;
    cursor: pointer;
  }
`;
const SearchBox = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  .InputCoinName {
    width: 97%;
    text-indent: 10px;
    font-size: 16px;
    border: 2px solid #908790;
    border-radius: 15px;
    color: #000000;
    background: #ffffff;
  }
`;

const SearchHistory = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid;
`;
const CoinList = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid;
`;
const CoinManage = styled.span`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  color: #5babab;
  .listManage {
    cursor: pointer;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
