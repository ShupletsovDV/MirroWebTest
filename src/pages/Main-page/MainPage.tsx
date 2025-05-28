import React from 'react';
import styles from "./MainPage.module.css"
import Sidebar from '../../components/Sidebar/Sidebar';


const MainPage: React.FC = () => {


  return (
    <>
      <div className={styles.container}>
        <Sidebar/>
        <div className={styles.mainContainer}>
          <span>Здесь будут игры</span>
        </div>
      </div>
    </>
  );
};

export default MainPage;