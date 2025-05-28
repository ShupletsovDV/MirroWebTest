import api from '../api';
import { Device } from '../interfaces/Devices';


const BluetoothMirroGlove = {
  devices: [] as Device[], // Список устройств
  connectedPort: null as string | null, // Подключенное устройство

  // Поиск устройств
  async searchDevices(): Promise<Device[]> {
    try {
      console.log("Отправка запроса на:", `${api.defaults.baseURL}/api/Bluetooth/connected-devices`);
      const response = await api.get("/api/Bluetooth/connected-devices");
      if (!Array.isArray(response.data)) {
        throw new Error("Ответ сервера не является массивом устройств");
      }
      this.devices = response.data;
      return this.devices;
    } catch (error ) {
        if(error instanceof Error){
          console.error("Ошибка во фронте:", error.message);
        }
      throw error;
    }
  },

  // Подключение к COM-порту
  async connectToDevice(portName: string): Promise<string> {
    if (!portName) {
      throw new Error("Выберите COM-порт для подключения!");
    }

    try {
      const response = await api.post("/api/Bluetooth/connect", { portName });
      this.connectedPort = portName;
      console.log(`Подключено к COM-порту: ${portName}`);
      return portName;
    } catch (error) {
      console.error("Ошибка при подключении к COM-порту:", error);
      throw error;
    }
  },

  // Отключение от COM-порта
  async disconnectFromDevice(): Promise<void> {
    if (!this.connectedPort) {
      throw new Error("Нет активного подключения!");
    }

    try {
      await api.post("/api/Bluetooth/disconnect");
      this.connectedPort = null;
      console.log("COM-порт отключен");
    } catch (error) {
      console.error("Ошибка при отключении от COM-порта:", error);
      throw error;
    }
  },

  // Отправка данных через COM-порт
  async sendData(data: any): Promise<void> {
    if (!this.connectedPort) {
      throw new Error("Нет активного подключения!");
    }

    try {
      await api.post("/api/Bluetooth/send", data);
      console.log("Данные отправлены");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      throw error;
    }
  },

  // Получение данных через COM-порт
  async receiveData(): Promise<any> {
    if (!this.connectedPort) {
      throw new Error("Нет активного подключения!");
    }

    try {
      const response = await api.get("/api/Bluetooth/receive");
      console.log("Полученные данные:", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  },


  async startDemo(port: string) {
    try {
      console.log("Отправка запроса на:", `${api.defaults.baseURL}/api/Manipulator/demo-manipulator`);
      const response = await api.post("/api/Manipulator/demo-manipulator", {
        Port: port
      });
      console.log("Ответ сервера:", response.data);
      return response.data;
    } catch (error) {
      if(error instanceof Error){
          console.error("Ошибка при запуске демо:", error.message);
          throw new Error(error.message); 
      }
      
    }
  },
  
  async stopDemo() {
    try {
      console.log("Отправка запроса на:", `${api.defaults.baseURL}/api/Manipulator/stop-demo`);
      const response = await api.post("/api/Manipulator/stop-demo");
      console.log("Ответ сервера:", response.data);
      return response.data;
    } catch (error) {
      if(error instanceof Error){
          console.error("Ошибка при остановке демо:", error.message);
          throw new Error(error.message); 
      }
    }
  },

  // Получение списка COM-портов
  getDevices(): Device[] {
    return this.devices;
  },

  // Получение подключенного COM-порта
  getConnectedDevice(): string | null {
    return this.connectedPort;
  },

};

export default BluetoothMirroGlove;