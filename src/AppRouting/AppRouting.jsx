import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../Pages/NotFound/NotFound";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import MainProtectedRoute from "../Components/ProtectedRoutes/MainProtectedRoute/MainProtectedRoute";
import AuthProtectedRoute from "../Components/ProtectedRoutes/AuthProtectedRoute/AuthProtectedRoute";
import PostDetails from "../Pages/PostDetails/PostDetails";
import ChangePassword from "../Components/ChangePassword/ChangePassword";
import Settings from "../Pages/Settings/Settings";
import ChangeProfilePic from "../Components/ChangeProfilePic/ChangeProfilePic";

export const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <MainProtectedRoute>
        <MainLayout />
      </MainProtectedRoute>
    ),

    children: [
      { index: true, element: <Home /> },
      { path: "/profile/:userId", element: <Profile /> },
      { path: `/postDetails/:id`, element: <PostDetails /> },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          { path: "/settings/changePassword", element: <ChangePassword /> },
          { path: "/settings/changeProfile", element: <ChangeProfilePic /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "auth",
    element: (
      <AuthProtectedRoute>
        <AuthLayout />
      </AuthProtectedRoute>
    ),
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
