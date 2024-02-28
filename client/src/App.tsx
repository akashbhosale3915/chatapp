import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Signup />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
