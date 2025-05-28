import React, { useState } from 'react';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPersonRifle, faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from './Sidebar.module.css';
import img from "../../assets/manipulator.jpg";
import ConnectDevicePopup from '../Connect-Device-Popup/ConnectDevicePopup';
import { faHouseMedicalCircleCheck } from '@fortawesome/free-solid-svg-icons/faHouseMedicalCircleCheck';

const Sidebar: React.FC = () => {

  const [isConnectPopupOpen, setIsConnectPopup] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`${styles.sidebarContainer} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.topContainer}>
          <div className={styles.headerContainer}>
            {!isCollapsed && <img src={img} alt="manipulator" />}
            <div className={styles.toggleButton} onClick={toggleSidebar}>
              <FontAwesomeIcon
                icon={isCollapsed ? faBars : faArrowLeft}
              />
            </div>
          </div>

          {!isCollapsed && <h2>Фамилия И.О.</h2>}
          <button 
            className={`${styles.sidebarBtn} ${isCollapsed ? styles.collapsedBtn : ''}`} 
            onClick={() => setIsConnectPopup(true)}
          >
            <FontAwesomeIcon icon={faHouseMedicalCircleCheck} />
            {!isCollapsed && <p>Устройства</p>}
          </button>
        </div>
        <div className={styles.bottomContainer}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faPersonRifle}

          />
        </div>
      </div>

      {isConnectPopupOpen &&
        createPortal(
          <ConnectDevicePopup onClose={() => setIsConnectPopup(false)} />,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default Sidebar;