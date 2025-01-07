 
import './App.css';
 
 
import PersonalPage from './components/PersonalPage/PersonalPage';
 
 
 
import { Route, Routes } from 'react-router-dom';
 
 
 
 
import Layout from './components/Layout';
 
 
import NavBar from './components/NavBar';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage';
import PlansBlock from './components/plansBlock/PlansBlock';
 
 

const fitnessPlans = [
  {
      id: 1,
      name: "Тренировка всего тела",
      description: "Комплексная тренировка, нацеленная на все основные группы мышц.",
      equipment: ["Гантели", "Эспандеры", "Коврик"],
      difficulty: "Средний",
      image: "https://www.publicdomainpictures.net/pictures/30000/velka/full-body-exercises.jpg", // Измените на новое изображение
  },
  {
      id: 2,
      name: "Кардио-тренировка",
      description: "Высокоинтенсивная кардио-тренировка для повышения выносливости.",
      equipment: ["Скакалка", "Кроссовки"],
      difficulty: "Начальный",
      image: "https://www.publicdomainpictures.net/pictures/20000/velka/running.jpg", // Измените на новое изображение
  },
  {
      id: 3,
      name: "Силовые тренировки",
      description: "Наращивание мышечной массы и силы через различные упражнения.",
      equipment: ["Штанга", "Гантели", "Скамья"],
      difficulty: "Продвинутый",
      image: "https://thebasefitness.ru/upload/iblock/42e/42ebdfcd49515c9ae499d88d03e00726.jpg", // Измените на новое изображение
  },
  {
      id: 4,
      name: "Йога и гибкость",
      description: "Улучшение гибкости и психоэмоционального состояния через йогу.",
      equipment: ["Йога-мат"],
      difficulty: "Начальный",
      image: "https://www.publicdomainpictures.net/pictures/30000/velka/yoga.jpg", // Измените на новое изображение
  },
  {
      id: 5,
      name: "HIIT (Высокоинтенсивный интервальный тренинг)",
      description: "Короткие всплески интенсивной физической активности с последующим отдыхом или плавной нагрузкой.",
      equipment: ["Таймер интервалов", "Гантели"],
      difficulty: "Продвинутый",
      image: "https://www.publicdomainpictures.net/pictures/50000/velka/hiit.jpg", // Измените на новое изображение
  },
];
function App() {
  return (
 
 
    <>
 
      
 
      
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/card" element={<PlansBlock plans={fitnessPlans} />} />
          <Route path='/account' element={<PersonalPage />} />
          </Route>
      </Routes>
 
    </>
 
  );
}

export default App;
