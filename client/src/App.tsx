import './App.css';

import PersonalPage from './components/PersonalPage/PersonalPage';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import PlansBlock from './components/plansBlock/PlansBlock';

import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchUserCheck } from './store/thunkActions';

import AllExercisesPage from './components/ExercisePage/AllExercisesPage';
import SingleExercisePage from './components/ExercisePage/SingleExercisePage';

import HomePage from './components/HomePage/HomePage';

import { useColorModeValue } from './components/ui/color-mode';
import { Box } from '@chakra-ui/react';

import NewPlanForm from './components/NewPlanPage/NewPlanForm';
import AdminPage from './components/admin/AdminPage';
 
 
import FitnessCalendar from './components/calendar/FitnessCalendar';
import UserDaysList from './components/userdays/UserdayList';
import PlanPage from './components/planPage/PlanPage';
 


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCheck());
  }, [dispatch]);

  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  return (

    <Box bg={bgColor} minH='100vh' color={textColor}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/card' element={<PlansBlock />} />
          <Route path='/exercises' element={<AllExercisesPage />} />
          <Route path='/exercises/:id' element={<SingleExercisePage />} />
          <Route path='/account' element={<PersonalPage />} />
          <Route path='/plans/:id' element={<PlanPage />} />
          <Route path='/plans/:id/days' element={<UserDaysList />} />
          <Route path='/plans/new' element={<NewPlanForm />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/calendar' element={<FitnessCalendar />} />

        </Route>
      </Routes>
    </Box>
  );
}

export default App;
