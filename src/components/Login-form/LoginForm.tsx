import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordHide, setPasswordHide] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await authService.login({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/main');
      }
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setSubmitted(false);
    }
  };

  return (
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.title}>Авторизация</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Пароль:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={passwordHide ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <span
              className={styles['field-icon']}
              onClick={() => setPasswordHide(!passwordHide)}
            >
              {passwordHide ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <div className={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Запомнить меня
          </label>
        </div>
        <div>
          {submitted ? (
            <div className={styles.spinner}></div>
          ) : (
            <button type="submit" className={styles.button} disabled={submitted}>
              Войти
            </button>
          )}
        </div>
      </form>
  );
};

export default LoginForm;