// ConnectDevicePopup.tsx
import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion} from "@fortawesome/free-solid-svg-icons";

import styles from './ConnectDevicePopup.module.css';
import manipulator from '../../assets/manipulator.jpg';
import sphere from '../../assets/sphere.jpg';
import BluetoothMirroGlove from '../../services/BluetoothMirroGlove';
import { Device } from '../../interfaces/Devices';
import ErrorPopup from '../Error-Popup/Connect-Device-Popup/ErrorPopup';


interface ConnectDevicePopupProps {
  onClose: () => void;
}

const ConnectDevicePopup: React.FC<ConnectDevicePopupProps> = ({ onClose }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [targetManipulator, setTargetManipulator] = useState<Device | null>(null);
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isErrorPopupOpen, setIsErrorPopup] = useState(false);


  const handleError = (message: string) => {
    setError(message);
    setIsErrorPopup(true); 
  };


  useEffect(() => {
    
    const loadDevices = async () => {
      try {
        setLoading(true);
        const availableDevices = await BluetoothMirroGlove.searchDevices();
        setDevices(availableDevices);
        const manipulatorDevice = availableDevices.find(device => 
          device.deviceName.toLowerCase().includes("MirroRehab_V2.1".toLowerCase())
        );
        setTargetManipulator(manipulatorDevice || null);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
  }, []);

  const findManipulator = async () => {
    try {
      setLoading(true);
      setError(null);
      const availableDevices = await BluetoothMirroGlove.searchDevices();
      setDevices(availableDevices);
      const manipulatorDevice = availableDevices.find(device => 
        device.deviceName.toLowerCase().includes("MirroRehab_V2.1".toLowerCase())
      );
      if (!manipulatorDevice) {
        setError('Манипулятор не найден');
        return;
      }
      await BluetoothMirroGlove.connectToDevice(manipulatorDevice.portName);
      setTargetManipulator(manipulatorDevice);
    } catch (err: any) {
      handleError('Ошибка при загрузке устройств: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  const startDemoManipulator = async () => {
    try {
      setLoading(true);
      setError(null);
      const targetDevice = devices.find(device => 
        device.deviceName.toLowerCase().includes("MirroRehab_V2.1".toLowerCase())
      );
      if (!targetDevice) {
        setError('Устройство не найдено');
        return;
      }
      await BluetoothMirroGlove.startDemo(targetDevice.portName);
      setDemo(true);
    } catch (err: any) {
      handleError('Ошибка при загрузке устройств: ' + (err.message || 'Неизвестная ошибка'));
      setDemo(false);
    } finally {
      setLoading(false);
    }
  };

  const stopDemoManipulator = async () => {
    try {
      setLoading(true);
      setError(null);
      await BluetoothMirroGlove.stopDemo();
      setDemo(false);
    } catch (err: any) {
      handleError('Ошибка при загрузке устройств: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>✖</button>
          <div className={styles.container}>
            <div className={styles.card}>
              <h2>Манипулятор</h2>
              
              <img src={manipulator} alt="Manipulator" />
              
              <div className={styles.containerNameDevice}>
                <p>{targetManipulator?.deviceName || 'Не подключено'}</p>
                {!targetManipulator && 
                  <FontAwesomeIcon
                    style={{cursor:"pointer"}}
                    icon={faQuestion}
                  />
                }
              </div>
             

              {targetManipulator && 
                <button onClick={findManipulator} disabled={loading}>
                  {loading ? 'Запуск...' : 'Запустить'}
                </button>
              }
              {targetManipulator && 
                <button>
                  Калибровка
                </button>
              }
              {targetManipulator && 
                <button 
                  onClick={demo ? stopDemoManipulator : startDemoManipulator} 
                  disabled={loading || !targetManipulator}
                >
                  {demo ? "Демо выкл" : "Демо вкл"}
                </button>
              } 
            </div>
            
            <div className={styles.card}>
              <h2>Сфера</h2>
              <img src={sphere} alt="Sphere" />
              <button>Запустить</button>
            </div>
            <div className={styles.card}>
              <h2>Платформа</h2>
              <img style={{filter: "blur(10px)"}} src={sphere} alt="Platform" />
              <button>Запустить</button>
            </div>
          </div>
        </div>
      </div>
      {isErrorPopupOpen && error &&
          createPortal(
            <ErrorPopup message={error} onClose={() => setIsErrorPopup(false)} />,
            document.getElementById("modal-root")!
      )}
    </>
  );
};

export default ConnectDevicePopup;