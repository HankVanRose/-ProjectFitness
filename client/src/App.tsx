import './App.css';

import PersonalPage from './components/PersonalPage/PersonalPage';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import PlansBlock from './components/plansBlock/PlansBlock';
import PlanPage from './components/planPage/PlanPage';

import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchUserCheck } from './store/thunkActions';

import AllExercisesPage from './components/ExercisePage/AllExercisesPage';
import SingleExercisePage from './components/ExercisePage/SingleExercisePage';

import HomePage from './components/HomePage/HomePage';
import AddedPlanPage from './components/AddedPlanPage/AddedPlanPage';

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
          <Route path="/exercises" element={<AllExercisesPage />} />
          <Route path="/exercises/:id" element={<SingleExercisePage />} />
          <Route path="/account" element={<PersonalPage />} />
          <Route path="/plans/:id" element={<PlanPage />} />
          <Route path="/plans/:id/yourown" element={<AddedPlanPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
