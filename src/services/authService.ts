
interface LoginResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}


const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
     
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Фиктивный токен
      const fakeToken = 'fake-jwt-token';
  
      if (credentials.email === 'test@example.com' && credentials.password === '1234') {
        return { token: fakeToken };
      } else {
        throw new Error('Неверный email или пароль');
      }
    },
  };


export default authService;