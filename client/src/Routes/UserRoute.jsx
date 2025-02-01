import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/Signin";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Header from "../compontents/Header";
import PrivateRoute from "../compontents/PrivateRoute";
import SigninPrivateRoute from "../compontents/SigninPrivateRoute";
import NotFound from "../pages/NotFound";

export default function UserRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route element={<SigninPrivateRoute/>}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
