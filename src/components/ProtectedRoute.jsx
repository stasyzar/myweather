import { isAuthenticated } from "../services/authService";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return children;
}