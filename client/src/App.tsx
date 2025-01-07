import './App.css';

import PersonalPage from './components/PersonalPage/PersonalPage';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage';
import PlansBlock from './components/plansBlock/PlansBlock';
import PlanPage from './components/planPage/PlanPage';

import Slides from './components/accordion/Slides';

import ExercisePage from './components/ExercisePage/ExercisePage';

import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchUserCheck } from './store/thunkActions';
import ExerciseCard from './components/ExercisePage/ExerciseCard';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCheck());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/card" element={<PlansBlock />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/exercises/:id" element={<ExerciseCard />} />
          <Route path="/account" element={<PersonalPage />} />
          <Route path="/plans/:id" element={<PlanPage />} />

          <Route path="/carousel" element={<Slides />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
