import './App.css';

import PersonalPage from './components/PersonalPage/PersonalPage';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import PlansBlock from './components/plansBlock/PlansBlock';
import PlanPage from './components/planPage/PlanPage';

import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchUserCheck } from './store/thunkActions';

import AllExercisesPage from './components/ExercisePage/AllExercisesPage';
import SingleExercisePage from './components/ExercisePage/SingleExercisePage';

import HomePage from './components/HomePage/HomePage';
import { useColorModeValue } from './components/ui/color-mode';
import { Box } from '@chakra-ui/react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCheck());
  }, [dispatch]);

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box bg={bgColor} minH="100vh">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<PlansBlock />} />
          <Route path="/exercises" element={<AllExercisesPage />} />
          <Route path="/exercises/:id" element={<SingleExercisePage />} />
          <Route path="/account" element={<PersonalPage />} />
          <Route path="/plans/:id" element={<PlanPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
