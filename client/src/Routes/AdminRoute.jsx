import { Routes, Route } from 'react-router-dom';
import SignIn from '../AdminPages/Login';
import Home from '../AdminPages/Home';
import User from '../AdminPages/User';
import Header from '../AdminComponents.jsx/Header';
import Create from '../AdminPages/Create';

const AdminRoute = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="home" element={<Home />} />
            <Route path="userDetails" element={<User />} />
            <Route path="create" element={<Create />} />
        </Routes>
        </>
    );
};

export default AdminRoute;


