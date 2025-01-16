import './App.css';
import { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchUserCheck } from './store/thunkActions';

import HomePage from './components/HomePage/HomePage';

import { useColorModeValue } from './components/ui/color-mode';
import { Box } from '@chakra-ui/react';
import { LoadingFallback } from './components/LoadingFallback';
const PlansBlock = lazy(() => import('./components/plansBlock/PlansBlock'));
const AllExercisesPage = lazy(
  () => import('./components/ExercisePage/AllExercisesPage')
);
const SingleExercisePage = lazy(
  () => import('./components/ExercisePage/SingleExercisePage')
);
const PersonalPage = lazy(
  () => import('./components/PersonalPage/PersonalPage')
);
const PlanPage = lazy(() => import('./components/planPage/PlanPage'));
const UserDaysList = lazy(() => import('./components/userdays/UserdayList'));
const NewPlanForm = lazy(() => import('./components/NewPlanPage/NewPlanForm'));
const ExerciseForm = lazy(() => import('./components/admin/ExerciseForm'));
const AdminPage = lazy(() => import('./components/admin/AdminPage'));
const CalendarPage = lazy(() => import('./components/calendar/CalendarPage'));
const UserPlansPage = lazy(
  () => import('./components/UserPlansPage/UserPlansPage')
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCheck());
  }, [dispatch]);

  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box bg={bgColor} minH="100vh" color={textColor}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/plans"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PlansBlock />
              </Suspense>
            }
          />
          <Route
            path="/exercises"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AllExercisesPage />
              </Suspense>
            }
          />
          <Route
            path="/exercises/:id"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <SingleExercisePage />
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PersonalPage />
              </Suspense>
            }
          />
          <Route
            path="/plans/:id"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PlanPage />
              </Suspense>
            }
          />
          <Route
            path="/plans/:id/days"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <UserDaysList />
              </Suspense>
            }
          />
          <Route
            path="/plans/new"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NewPlanForm />
              </Suspense>
            }
          />
          <Route
            path="/exercise/new"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ExerciseForm />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CalendarPage />
              </Suspense>
            }
          />
          <Route
            path="/:userId/userplans"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <UserPlansPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
