import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, login as performLogin } from "../services/authService";

export default function LoginPage(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = performLogin(login, password);

        if(!result.success){
            setError(result.error);
        }else{
            setError("");
            navigate("/dashboard");
        }
    }

    return(
        <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Log to App</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login">Login:</label>
            <input
              id="login"
              type="text"
              placeholder="your username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
    );
}