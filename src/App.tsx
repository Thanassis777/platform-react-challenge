import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Home from './pages/Home/Home';
import Layout from './Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ROUTES } from './constants';

import './App.css';

// Lazy loading non-critical components
const Breeds = lazy(() => import('./pages/Breeds/Breeds'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const SpinnerComponent = lazy(() => import('./components/SpinnerComponent/SpinnerComponent'));

const App = () => (
  <div className="App">
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<SpinnerComponent />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={`${ROUTES.BREEDS}/:id?`} element={<Breeds />} />
            <Route path={`${ROUTES.IMAGE}/:id?`} element={<Home />} />
            <Route path={ROUTES.FAVORITES} element={<Favorites />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  </div>
);

export default App;
