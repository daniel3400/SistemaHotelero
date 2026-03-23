import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RoomsPage } from "./pages/RoomsPage";
import { GuestsPage } from "./pages/GuestsPage";
import { StaysPage } from "./pages/StaysPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { CleaningPage } from "./pages/CleaningPage";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Layout>
                <RoomsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guests"
          element={
            <ProtectedRoute>
              <Layout>
                <GuestsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stays"
          element={
            <ProtectedRoute>
              <Layout>
                <StaysPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cleaning"
          element={
            <ProtectedRoute>
              <Layout>
                <CleaningPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};
