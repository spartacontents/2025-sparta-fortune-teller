import React from 'react';
import loadingImage from '../assets/main_img.png';
import styles from './LoadingIndicator.module.css' // Make sure the CSS is imported

function LoadingIndicator() {
  return (
    <div className={styles.loadingContainer}>
      <img src={loadingImage} alt="Loading..." className={styles.shakingImage} />
    </div>
  );
}

export default LoadingIndicator;
