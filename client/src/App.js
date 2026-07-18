import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import { routes } from "./routes/routes";
import SuspenseLoader from './components/common/SuspenseLoader';
import DataProvider from './context/DataProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';

const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* Login */}
      <Route
        path={routes.login.path}
        element={<routes.login.element />}
      />

      {/* Protected Routes */}
      <Route
        path={routes.main.path}
        element={
          <ProtectedRoute>
            <routes.main.element />
          </ProtectedRoute>
        }
      >
        <Route
          path={`${routes.emails.path}/:type`}
          element={<routes.emails.element />}
          errorElement={<ErrorComponent />}
        />

        <Route
          path={routes.view.path}
          element={<routes.view.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/emails/inbox" replace />}
      />

      {/* Invalid Route */}
      <Route
        path={routes.invalid.path}
        element={<Navigate to="/login" replace />}
      />

    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Suspense>
  );
}

export default App;