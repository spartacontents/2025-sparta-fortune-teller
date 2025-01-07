import React, { useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import FortuneMessage from './FortuneMessage';
import { toPng } from 'html-to-image';

function Chat({ messages, userInfo }) {
  const chatContainerRef = useRef(null);
  const fortuneRef = useRef(); // Ref for the specific FortuneMessage to print

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDownload = async () => {
    if (fortuneRef.current) {
      try {
        const fortuneElement = fortuneRef.current;
  
        // CSS 변경으로 스크롤 영역도 포함하도록 설정
        const originalStyle = {
          width: fortuneElement.style.width,
          height: fortuneElement.style.height,
          overflow: fortuneElement.style.overflow,
        };
  
        fortuneElement.style.width = `${fortuneElement.scrollWidth}px`;
        fortuneElement.style.height = `${fortuneElement.scrollHeight}px`;
        fortuneElement.style.overflow = 'visible';
  
        // 캡처 수행
        const imageUrl = await toPng(fortuneElement, {
          width: fortuneElement.scrollWidth,
          height: fortuneElement.scrollHeight,
          pixelRatio: 2, // 고해상도
        });
  
        // 원래 스타일 복원
        fortuneElement.style.width = originalStyle.width;
        fortuneElement.style.height = originalStyle.height;
        fortuneElement.style.overflow = originalStyle.overflow;
  
        // 이미지 다운로드
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'fortune-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error converting to image:', error);
      }
    }
  };  
  
  
  return (
    <div
      ref={chatContainerRef}
      className={styles.chatContainer}
    >
      {messages.map((msg, index) =>
        msg.type === 'fortune' ? (
          <div
            key={index}
            ref={fortuneRef} // Apply ref only to the first FortuneMessage to be printed
          >
            <FortuneMessage userInfo={userInfo} msg={msg} />
            <div className={styles.btnContainer}>
              <button className={styles.sendBtn} onClick={handleDownload}>画像を保存する</button>
            </div>
          </div>
        ) : (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#ffffff',
                color: '#333',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                textAlign: 'left',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: msg.sender === 'user' ? '#0b7300' : '#555',
                }}
              >
                {msg.sender === 'user' ? '私' : '青いヘビ'}
              </strong>
              {msg.text}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Chat;
