import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import Layout from '../pages/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import AppContext from '../contexts/AppContext';

const PrivateRoute = ({ type }) => {
  const { userData } = useContext(AppContext);
  const routes = {
    main() {
      if (userData) return <HomePage />;
      return <Navigate to="/login" />;
    },
    login() {
      if (!userData) return <LoginPage />;
      return <Navigate to="/" />;
    },
    signup() {
      if (!userData) return <SignupPage />;
      return <Navigate to="/" />;
    },
  };
  return routes[type]();
};

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PrivateRoute type="main" />} />
      <Route path="/login" element={<PrivateRoute type="login" />} />
      <Route path="/signup" element={<PrivateRoute type="signup" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default RoutesComponent;
