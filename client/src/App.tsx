import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import PersonalPage from './components/PersonalPage/PersonalPage';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/account' element={<PersonalPage />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
