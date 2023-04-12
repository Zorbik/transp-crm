import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddTripPage } from "./pages/AddTripPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { PublicRoute } from "./components/routing/PublicRoute";
import { EditUsersPage } from "./pages/EditUsersPage";

function App() {
  return (
    <Suspense fallback={false}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AddTripPage />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <EditUsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LogInPage />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
