import {
    ChangeEvent,
    FormEvent,
    useState,
  } from 'react';
  
  import styles from './Auth.module.css'; // Импортируем стили
  import { useNavigate } from "react-router-dom";
  import {  Form, Toast } from "react-bootstrap";
  import { fetchUserSignin, fetchUserSignup } from '../../redux/thunkActions';
  import { useAppDispatch } from '../../redux/hooks';
  
  type AuthFormProps = {
    title: string;
    type: 'signin' | 'signup';
  };
  
  type SigninInputs = {
    email: string;
    password: string;
  };
  
  type SignupInputs = {
    email: string;
    password: string;
    username: string;
  };
  
  export default function AuthForm({ type, title }: AuthFormProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState<SigninInputs | SignupInputs>(
      type === 'signin'
        ? { email: '', password: '' }
        : { email: '', password: '', username: '' }
    );
  
    const [loginError, setLoginError] = useState("");
    const [showToast, setShowToast] = useState(false);
  
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const validateSignup = (): boolean => {
      if (!inputs.username) {
        showToastMessage("Имя пользователя обязательно.");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        showToastMessage("Введите электронную почту в формате you@example.com");
        return false;
      }
      if (inputs.password.length < 8) {
        showToastMessage("Пароль должен содержать минимум 8 символов.");
        return false;
      }
      return true;
    };
  
    const validateSignin = (): boolean => {
      if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        showToastMessage("Введите электронную почту в формате you@example.com");
        return false;
      }
      if (!inputs.password) {
        showToastMessage("Пароль не может быть пустым.");
        return false;
      }
      return true;
    };
  
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (type === 'signup' && !validateSignup()) {
        return;
      }
      
      if (type === 'signin' && !validateSignin()) {
        return;
      }
  
      if (type === 'signin') {
        dispatch(fetchUserSignin(inputs as SigninInputs));
      } else {
        dispatch(fetchUserSignup(inputs as SignupInputs));
      }
   
      navigate('/');
    };
  
    const showToastMessage = (message: string) => {
      setLoginError(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);  
    };
  
    return (
      <>
        <Form onSubmit={submitHandler} className={styles.authForm}>
          <h3 className={styles.h3}>{title}</h3>
          <div>
            {type === 'signin' && (
              <>
                <Form.Group controlId="formBasicEmail" className={styles.formgroup}>
                  <Form.Label>Эл.почта</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputs?.email}
                    onChange={changeHandler}
                    placeholder="Эл.почта"
                    className={styles.input}
                  />
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={inputs?.password}
                    onChange={changeHandler}
                    placeholder="Пароль"
                    className={styles.input}
                  />
                </Form.Group>
              </>
            )}
            {type === 'signup' && (
              <>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={inputs?.username}
                    onChange={changeHandler}
                    placeholder="Имя пользователя"
                    className={styles.input}
                  />
                </Form.Group>
  
                <Form.Group controlId="formBasicEmailSignup">
                  <Form.Label>Эл.почта</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputs?.email}
                    onChange={changeHandler}
                    placeholder="Эл.почта"
                    className={styles.input}
                  />
                </Form.Group>
  
                <Form.Group controlId="formBasicPasswordSignup">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={inputs?.password}
                    onChange={changeHandler}
                    placeholder="Пароль"
                    className={styles.input}
                  />
                </Form.Group>
              </>
            )}
          </div>
          <div>
            <button type="submit" className={styles.btn}>
              {type === 'signin' ? 'Вход' : 'Регистрация'}
            </button>
          </div>
        </Form>
      
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={7000}
          autohide
          className="toast"
          bg='danger'
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1050,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">ОШИБКА</strong>
            <small>{new Date().toLocaleString()}</small>
          </Toast.Header>
          <Toast.Body style={{ color: 'white' }}>
            {loginError}
          </Toast.Body>
        </Toast>
      </>
    );
  }