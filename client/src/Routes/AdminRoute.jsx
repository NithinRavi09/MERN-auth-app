import { Routes, Route } from 'react-router-dom';
import SignIn from '../AdminPages/Login';
import Home from '../AdminPages/Home';
import User from '../AdminPages/User';
import Header from '../AdminComponents/Header.jsx';
import Create from '../AdminPages/Create';
import PrivateRoute from '../AdminComponents/PrivateRoute.jsx';
import LoginPrivateRoute from '../AdminComponents/LoginPrivateRoute.jsx';
import NotFound from '../AdminPages/NotFound.jsx';

const AdminRoute = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route element={<LoginPrivateRoute/>}>
            <Route path="login" element={<SignIn />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute/>}>
            <Route path="userDetails" element={<User />} />
            </Route>
            <Route element={<PrivateRoute/>}>
            <Route path="create" element={<Create />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
};

export default AdminRoute;


