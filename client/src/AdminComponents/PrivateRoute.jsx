import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isAdmin } = useSelector(state => state.admin); 
  return isAdmin ? <Outlet/> : <Navigate to={'/admin/login'} />;
}
