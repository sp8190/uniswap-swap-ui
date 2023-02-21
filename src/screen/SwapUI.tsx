import SwapModal from "../modal/SwapModal";
import styled from "styled-components";
import { getCoinPrice } from "../api/Api";
import { useQuery } from "@tanstack/react-query";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";

type Information = { first: undefined | number; second: undefined | number };
type CoinInfo = { name: string; symbol: string };

interface GetCoinsPrice {
  results: CoinsPrice[];
}

interface CoinsPrice {
  id: number;
  symbol: object;
}

export default function SwapUI() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isNumModal, setNumModal] = useState<boolean>(false);
  const [isCoin, setCoin] = useState<CoinInfo[]>([
    { name: "DAI", symbol: "DAI" },
    { name: "usd-coin", symbol: "USDC" },
  ]);
  //빠르게
  const { data: oneData } = useQuery<GetCoinsPrice>(
    ["coin1"],
    () => getCoinPrice(isCoin[0].name)
    // { enabled: true, staleTime: 5000, refetchInterval: 10000 }
  );
  const { data: twoData } = useQuery<GetCoinsPrice>(
    ["coin2"],
    () => getCoinPrice(isCoin[1].name)
    // { enabled: true, staleTime: 5000, refetchInterval: 10000 }
  );

  const [isNumber, setNumber] = useState<Information>({
    first: undefined,
    second: undefined,
  });
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const { first, second } = isNumber;

  //계산식 추가 Object.values(twoData)[0].usd
  const NumberChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let cost = 0;

    // 윗 칸에 숫자 입력 할 때
    if (e.target.id === "first") {
      if (/^[\d]*\.?[\d]{0,10}$/.test(e.target.value)) {
        if (Number(e.target.value) === 0 || e.target.value === undefined) {
          setNumber({
            ...isNumber,
            [e.target.id]: undefined,
            ["second"]: 0,
          });
        } else {
          cost = Object.values(oneData)[0].usd * Number(e.target.value);
          setNumber({
            ...isNumber,
            [e.target.id]: Number(e.target.value),
            ["second"]: Number(
              (cost / Object.values(twoData)[0].usd).toFixed(10)
            ),
          });
        }
      } else {
        return false;
      }
    } // 밑 칸에 숫자 입력 할 때
    else {
      if (/^[\d]*\.?[\d]{0,10}$/.test(e.target.value)) {
        if (Number(e.target.value) === 0 || e.target.value === undefined) {
          setNumber({
            ...isNumber,
            [e.target.id]: undefined,
            ["first"]: 0,
          });
        } else {
          cost = Object.values(twoData)[0].usd * Number(e.target.value);
          setNumber({
            ...isNumber,
            [e.target.id]: Number(e.target.value),
            ["first"]: Number(
              Math.round(cost / Object.values(oneData)[0].usd).toFixed(10)
            ),
          });
        }
      } else {
        console.log(e.target.value);
        return false;
      }
    }
  };

  const onStart = () => {
    alert("준비 중입니다.");
  };
  const onCheckList = (): boolean => {
    const listComponent = Object(isNumber);
    if (listComponent.first === 0 || listComponent.first === undefined)
      return false;
    else if (listComponent.second === 0 || listComponent.second === undefined)
      return false;
    else {
      return true;
    }
  };

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
          <div className="InputBox">
            <input
              id="first"
              type="number"
              className="InputNumber"
              placeholder="0.0"
              value={first}
              onChange={NumberChange}
            />
            {first ? (
              <div className="InputDollar">
                ${(Object.values(oneData)[0].usd * first).toFixed(10)}
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => {
                onClickToggleModal();
                setNumModal(true);
              }}
              className="openModal"
            >
              <span className="text">{isCoin[0].symbol} ▽</span>
            </div>
          </div>
          <div className="arrowDown">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="InputBox">
            <input
              id="second"
              type="number"
              className="InputNumber"
              placeholder="0.0"
              value={second}
              onChange={NumberChange}
            />
            {second ? (
              <div className="InputDollar">
                ${(Object.values(twoData)[0].usd * second).toFixed(10)}
              </div>
            ) : (
              ""
            )}
            {isOpenModal && (
              <SwapModal
                onClickToggleModal={onClickToggleModal}
                isCoin={isCoin}
                setCoin={setCoin}
              >
                {isNumModal}
              </SwapModal>
            )}
            <div
              onClick={() => {
                onClickToggleModal();
                setNumModal(false);
              }}
              className="openModal down"
            >
              <span className="text">{isCoin[1].symbol} ▽</span>
            </div>
          </div>
        </CoinBox>

        {onCheckList() ? (
          <div>
            <InfoBox>
              1 {isCoin[1].symbol} =
              {(
                Object.values(twoData)[0].usd / Object.values(oneData)[0].usd
              ).toFixed(10)}{" "}
              {isCoin[0].symbol} (${Object.values(twoData)[0].usd.toFixed(10)})
            </InfoBox>
            <SwapButton onClick={onStart} className="swap">
              스왑
            </SwapButton>
          </div>
        ) : (
          <NoSwapButton onClick={onStart} className="noSwap" disabled>
            금액을 입력하세요.
          </NoSwapButton>
        )}
      </div>

      <div>Uniswap 사용 가능 : {/* English 버튼 */}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  .rounded {
    margin: 0 0 0 30%;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 40%;

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
    margin-left: 18px;
    float: left;
  }
  .right_icon {
    width: 18px;
    height: 18px;
    margin-right: 18px;
    float: right;
    cursor: pointer;
  }
`;

const CoinBox = styled.div`
  position: relative;
  height: 200px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input::placeholder {
    color: #cfcbcf;
  }

  .InputBox {
    height: 95px;
  }
  .InputNumber {
    width: 97%;
    height: 85px;
    text-indent: 10px;
    font-size: 22px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    color: #ffffff;
    background: #766c76;
  }
  .InputDollar {
    position: relative;
    bottom: 30px;
    text-align: left;
    text-indent: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #e3e1e3;
    z-index: 10;
  }
  .arrowDown {
    position: absolute;
    color: #ffffff;
    width: 20px;
    height: 20px;
    background-color: #766c76;
    border: 4px solid #908790;
    border-radius: 10px;
    margin-top: -20px;
    z-index: 5;
    right: 48%;
    top: 48%;
  }
  .openModal {
    cursor: pointer;
    position: absolute;
    height: 30px;
    background-color: #908790;
    border: 1px solid #908790;
    border-radius: 10px;
    color: #cfcbcf;
    right: 5%;
    bottom: 70%;
    z-index: 5;
  }
  .down {
    bottom: 23%;
  }
  .text {
    font-weight: bold;
    vertical-align: sub;
    padding-left: 10px;
    margin: 10px;
  }
`;

const SwapButton = styled.button`
  width: 97%;
  height: 55px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  color: #ffffff;
  background: #5babab;
  cursor: pointer;
`;

const NoSwapButton = styled.button`
  width: 97%;
  height: 55px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  color: #202124;
  background: #403c40;
`;

const InfoBox = styled.div`
  margin-bottom: 10px;
  text-indent: 20px;
  color: #ffffff;
  font-weight: bold;
  float: left;
`;
