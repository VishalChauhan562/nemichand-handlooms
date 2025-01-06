import { Navigate, Outlet, useLocation } from "react-router-dom"; // For rendering components
import { useAppSelector } from "../../store/hooks";

// Update your ProtectedRoute.tsx
const ProtectedRoute: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  console.log("===>",{ user, isAuthenticated, isLoading });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only redirect after loading completes and user isn't authenticated
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};;


export default ProtectedRoute