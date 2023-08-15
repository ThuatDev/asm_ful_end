import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import App from "./App";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import LoadingFallback from "./components/routes/loading/LoadingFallback";

const NotFound = () => {
  return (
    <div className="alert alert-danger container mt-3">
      Something went wrong. Please check your URL again!
    </div>
  );
};

const Layout = () => {
  const persistData = useSelector((state) => state.user); // Thay thế bằng cách lấy state thật từ redux store
  const userRole = persistData?.account?.role;
  const isAdmin = userRole === "ADMIN";

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
          {/* ... các tuyến đường khác */}
        </Route>

        <Route path="/quiz/:id" element={<DetailQuiz />} />

        {/* Kiểm tra và điều hướng dựa trên quyền */}
        {isAdmin ? (
          <Route
            path="/admins"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-quizes" element={<ManageQuiz />} />
            <Route path="manage-questions" element={<Questions />} />
          </Route>
        ) : (
          // Người dùng không phải admin, điều hướng tùy ý
          <Route path="/admins" element={<Navigate to="/users" />} />
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  );
};

export default Layout;
