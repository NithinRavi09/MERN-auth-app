import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOut } from '../redux/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'; 

export default function Header() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();  
  const navigate = useNavigate(); 

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, sign out!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`/api/admin/logout`, {
          method: "GET",  
          credentials: "include",
        });

        dispatch(signOut());
        navigate('/admin/login');
      } catch (error) {
        Swal.fire("Error!", "Failed to sign out.", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className='bg-pink-100'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold'>Auth Admin App</h1>
        <ul className='flex gap-8'>
          <Link to='/admin'>
            <li>Home</li> 
          </Link>
          {admin.isAdmin ? (
            <>
              <Link to='/admin/userDetails'>
                <li>User Details</li>
              </Link>
              <Link to='/admin/create'>
                <li>Create User</li>
              </Link>
              <li onClick={handleSignOut} className="cursor-pointer">Logout</li>
            </>
          ) : (
            <Link to='/admin/login'>
              <li>Log In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
