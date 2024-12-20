import React from 'react';
import fortuneBackground from '../assets/receipt.png'; // 이미지 경로
import styles from './Chat.module.css';

const FortuneMessage = ({ userInfo, msg, key, ref }) => {
  return (
    <div
      ref={ref}
      key={key}
      style={{
        width: "60%",
        height: "875px", // 이미지의 원래 크기에 맞게 높이 설정
        backgroundImage: `url(${fortuneBackground})`,
        backgroundSize: "contain", // 이미지 전체를 포함하도록 설정
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // 이미지 중앙 정렬
        position: "relative", // 텍스트 배치를 위한 position 설정
        padding: "20px", // 이미지 안의 텍스트에 여유 공간 추가
        boxSizing: "border-box",
        color: "#333",
        borderRadius: "10px",
        borderRadius: "30px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          transform: "translate(-50%, 10%)",
          width: "70%",
          color: "#333",
        }}
      >
        <div className={styles.infoContainer}>
          <p className={styles.mainText}>{userInfo.name}</p>
          <p className={styles.subText}>{userInfo.birthDate}</p>
          <p className={styles.subText}>{userInfo.birthTime}</p>
        </div>
        <div className={styles.adviceContainer}>
          <p className={styles.plainText1}>{msg.data.advice}</p>
        </div>
        <div className={styles.amuletContainer}>
          <p className={styles.subText}>
            <span>추천 부적: </span>
            {msg.data.amulet}
          </p>
          <span className={styles.plainText1}>{msg.data.amuletDescription}</span>
        </div>
        <div className={styles.fortuneContainer}>
          <p className={styles.subText}>2025 운세 요약</p>
          <p className={styles.plainText1}>총운: {msg.data.total}</p>
          <p className={styles.plainText1}>재물운: {msg.data.finance}</p>
          <p className={styles.plainText1}>애정운: {msg.data.love}</p>
          <p className={styles.plainText1}>건강운: {msg.data.health}</p>
        </div>
        <div className={styles.messageContainer}>
          <p className={styles.plainText2}>{msg.data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneMessage;
