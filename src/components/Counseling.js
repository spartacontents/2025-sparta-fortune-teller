import React, { useState, useEffect, useRef } from 'react';
import Chat from './Chat';
import Input from './Input';
import logoImg from '../assets/logo.png';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

function Counseling() {
  const [messages, setMessages] = useState([]); // 대화 메시지 관리
  const [step, setStep] = useState(0); // 입력 단계 관리
  const [userInfo, setUserInfo] = useState({}); // 유저 정보 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const fortuneRef = useRef(null); // fortune 메시지를 참조하는 ref
  const requestUrl = "https://uhg4155446.execute-api.ap-northeast-1.amazonaws.com/dev/api/fortune";

  const navigate = useNavigate(); // useNavigate 훅 사용
  const goHome = () => {
    navigate("/"); // 버튼 클릭 시 / 페이지로 이동
  };

  const getQuestions = (concern) => [
    "明けましておめでとうございます！今年の運勢を占いましょう。まず、あなたのお名前を教えて", // 인사
    `次に、 生年月日を教えて （例: 1990年1月1日）`, // 생년월일
    `最後に、 今年の目標を教えて`, // 목표
    `あなたの目標は 「${concern}」 なんですね。 それでは、あなたの運勢を占ってみましょう！` // 고민
  ];

  useEffect(() => {
    setMessages([{ sender: "へび", text: getQuestions('', '')[0] }]);
  }, []); // 첫 질문 추가

  const handleSend = (input) => {
    const newMessages = [{ sender: "user", text: input }];
    const keys = ["name", "birthDate", "concern"];

    if (step < 3) {
      setUserInfo((prev) => ({ ...prev, [keys[step]]: input }));

      const updatedQuestions = getQuestions(userInfo.name || input, userInfo.concern || input);

      if (step < 2) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "へび", text: updatedQuestions[step + 1] },
          ]);
        }, 500);
      } else {
        setTimeout(async () => {
          setMessages((prev) => [
            ...prev,
            { sender: "へび", text: `あなたの目標は「${input}」なんですね。 それでは、あなたの運勢を占ってみましょう！` // 고민
          }
          ]);

          // 로딩 상태 활성화
          setIsLoading((prev) => true);

          const response = await sendUserInfoToServer({ ...userInfo, concern: input });

          // 로딩 상태 비활성화
          setIsLoading((prev) => false);

          setMessages((prev) => [
            ...prev,
            { sender: "へび", type: "fortune", data: response }, // 응답 데이터 추가
          ]);
        }, 500);
      }

      setMessages((prev) => [...prev, ...newMessages]);
      setStep(step + 1);
    }
  };

  const sendUserInfoToServer = async (data) => {
    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('데이터 전송 실패:', response.statusText);
        return { advice: '서버로부터 유효한 응답을 받지 못했습니다.' };
      }
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
      return { advice: '데이터 전송 중 오류가 발생했습니다.' };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.logoContainer} onClick={goHome}>
          <img src={logoImg} alt="logo" />
        </div>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", borderRadius: "8px" }}>
          <Chat messages={messages} userInfo={userInfo} fortuneRef={fortuneRef} />
          {isLoading && <LoadingIndicator />} {/* 로딩 메시지 */}
          <Input onSend={handleSend} disabled={isLoading}/>
        </div>
      </div>
    </div>
  );
}

export default Counseling;
