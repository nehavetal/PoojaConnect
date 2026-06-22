import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Pandits from "../pages/Pandits";

import AdminDashboard from "../pages/AdminDashboard";
import AddPandit from "../pages/AddPandit";
import PanditDetails from "../pages/PanditDetails";

import BookPuja from "../pages/BookPuja";
import MyBookings from "../pages/MyBookings";

import PanditProfile from "../pages/PanditProfile";
import PanditBookings from "../pages/PanditBookings";
import PanditDashboard from "../pages/PanditDashboard";
import Availability from "../pages/Availability";
import AdminBookings from "../pages/AdminBookings";

import ProtectedRoute from "../routes/ProtectedRoute";
import RoleRoute from "../routes/RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pandits" element={<Pandits />} />

      {/* HOME */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* PANDIT DETAILS */}
      <Route
        path="/pandit/:id"
        element={
          <ProtectedRoute>
            <PanditDetails />
          </ProtectedRoute>
        }
      />

      {/* PANDIT DASHBOARD */}
      <Route
        path="/pandit/dashboard"
        element={
          <RoleRoute role="pandit">
            <PanditDashboard />
          </RoleRoute>
        }
      />

      {/* PANDIT BOOKINGS */}
      <Route
        path="/pandit/bookings"
        element={
          <RoleRoute role="pandit">
            <PanditBookings />
          </RoleRoute>
        }
      />

      {/* PANDIT PROFILE */}
      <Route
        path="/pandit/profile"
        element={
          <RoleRoute role="pandit">
            <PanditProfile />
          </RoleRoute>
        }
      />

      {/* BOOK PUJA */}
      <Route
        path="/book-puja/:id"
        element={
          <ProtectedRoute>
            <BookPuja />
          </ProtectedRoute>
        }
      />

      {/* USER BOOKINGS */}
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

    <Route
      path="/pandit/availability"
      element={
        <RoleRoute role="pandit">
          <Availability />
        </RoleRoute>
      }
    />
      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/pandits"
        element={
          <RoleRoute role="admin">
            <div>🧑‍🕉️ Manage Pandits Page</div>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/add-pandit"
        element={
          <RoleRoute role="admin">
            <AddPandit />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <RoleRoute role="admin">
            <AdminBookings />
          </RoleRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h2>❌ Page Not Found</h2>} />

    </Routes>
  );
}