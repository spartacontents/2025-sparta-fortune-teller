import React from 'react';
import receiptImage from '../assets/receipt.png'; // 이미지 import
import styles from './FortuneMessage.module.css';

const FortuneMessage = ({ userInfo, msg }) => {
  return (
    <div
      className={styles.fortuneMessageContainer}
    >
      <img src={receiptImage}/>
      <div className={styles.textOverlay}>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{userInfo.name}</p>
          <p>{userInfo.birthDate}</p>
        </div>
        <div className={styles.adviceContainer}>
          <p>{msg.data.advice}</p>
        </div>
        <div className={styles.amuletContainer}>
          <p><strong>おすすめのお守り</strong> : {msg.data.amulet}</p>
          <span>{msg.data.amuletDescription}</span>
        </div>
        <div className={styles.fortuneContainer}>
          <p>全体運: {msg.data.total}</p>
          <p>金運: {msg.data.finance}</p>
          <p>恋愛運: {msg.data.love}</p>
          <p>健康運: {msg.data.health}</p>
          <p>仕事運: {msg.data.work}</p>
        </div>
        <div className={styles.messageContainer}>
          <p>{msg.data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneMessage;
