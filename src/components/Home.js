import { useNavigate } from 'react-router-dom';
import mainImg from '../assets/main_img.png';
import logoImg from '../assets/logo.png';
import titleImg from '../assets/title.png';
import styles from './Home.module.css';


function Home() {

  const navigate = useNavigate(); // useNavigate 훅 사용
  const goCounseling = () => {
    navigate("/counseling"); // 버튼 클릭 시 /counseling 페이지로 이동
  };

  const goHome = () => {
    navigate("/"); // 버튼 클릭 시 / 페이지로 이동
  }

  return (
    <div className={styles.container}>
        <div className={styles.logoContainer} onClick={goHome}>
            <img src={logoImg} alt="logo" />
        </div>
        <div className={styles.body}>
        
        <div className={styles.titleContainer}>
            <img className={styles.img} src={titleImg} alt="title" />
        </div>
        <div className={styles.mainImgContainer}>
            <img src={mainImg} alt="main image" />
        </div>
        <div className={styles.btnContainer}>
            <button onClick={goCounseling}>占いに行く</button>
        </div>
        </div>
    </div>

  );
}

export default Home;
