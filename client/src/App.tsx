import './App.css';
import { Suspense, lazy } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom'; // Add Navigate

import Layout from './components/Layout';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks'; // Add useAppSelector
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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.appSlice.user); 

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.appSlice.user); 

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    dispatch(fetchUserCheck());
  }, [dispatch]);

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
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <PlansBlock />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <AllExercisesPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/exercises/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <SingleExercisePage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <PersonalPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminPage />
                </Suspense>
              </AdminRoute>
            }
          />

          <Route
            path="/exercise/new"
            element={
              <AdminRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <ExerciseForm />
                </Suspense>
              </AdminRoute>
            }
          />

          <Route
            path="/plans/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <PlanPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/plans/:id/days"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <UserDaysList />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/plans/new"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <NewPlanForm />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <CalendarPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/:userId/userplans"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <UserPlansPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
