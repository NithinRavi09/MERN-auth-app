import { Routes, Route } from 'react-router-dom';
import SignIn from '../AdminPages/Login';
import Home from '../AdminPages/Home';
import User from '../AdminPages/User';
import Header from '../AdminComponents/Header.jsx';
import Create from '../AdminPages/Create';
import PrivateRoute from '../AdminComponents/PrivateRoute.jsx';

const AdminRoute = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute/>}>
            <Route path="userDetails" element={<User />} />
            </Route>
            <Route element={<PrivateRoute/>}>
            <Route path="create" element={<Create />} />
            </Route>
        </Routes>
        </>
    );
};

export default AdminRoute;


