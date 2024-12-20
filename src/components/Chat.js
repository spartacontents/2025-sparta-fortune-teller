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

  const handlePrint = async () => {
    if (fortuneRef.current) {
      try {

        // Convert the DOM element to an image with specified width and height
        const imageUrl = await toPng(fortuneRef.current, {
          pixelRatio: 1.45
        });

        // Open the image in a new tab
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <style>
                  body {
                    margin: 0 auto;
                  }
                </style>
              </head>
              <body>
                <img src="${imageUrl}" alt="Fortune Result" />
              </body>
            </html>
          `);
          newWindow.document.close(); // Ensure the document is fully loaded

          newWindow.onload = () => {
            newWindow.focus();
            newWindow.print();
            newWindow.close(); // Close the new window after printing
          };

        }
      } catch (error) {
        console.error('Error converting to image:', error);
      }
    }
  };

  return (
    <div
      ref={chatContainerRef}
      style={{
        height: '600px', // Fixed height for the chat container
        overflowY: 'scroll', // Enable vertical scrolling
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      }}
    >
      {messages.map((msg, index) =>
        msg.type === 'fortune' ? (
          <div
            key={index}
            ref={fortuneRef} // Apply ref only to the first FortuneMessage to be printed
          >
            <FortuneMessage userInfo={userInfo} msg={msg} />
            <div className={styles.btnContainer}>
              <button className={styles.sendBtn} onClick={handlePrint}>인쇄하기</button>
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
                  fontSize: '0.9em',
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
