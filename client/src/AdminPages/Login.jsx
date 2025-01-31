import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinFailure, signinStart, signinSuccess } from '../redux/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminSignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.admin); 
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signinFailure(data));
        return;
      }

      dispatch(signinSuccess(data.admin));
      navigate('/admin'); 
    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto mt-20'>
      <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Admin Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-80'>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className='text-red-700 mt-5'>{error ? error.message || "Something went wrong" : ''}</p>
    </div>
  );
}

