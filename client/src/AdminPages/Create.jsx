import React, { useState } from 'react';

export default function Create() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(false);
      setSuccess(null);
  
      const res = await fetch('/api/admin/usersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (data.success === false) {
        setError(data.message || 'Something went wrong!');
        return;
      }
  
      setSuccess('User created successfully!');
      setFormData({ username: '', email: '', password: '' }); 
  
    } catch (error) {
      setLoading(false);
      setError('Server error, please try again.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="text" 
          placeholder='Username' 
          id='username' 
          value={formData.username} 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          placeholder='Email' 
          id='email' 
          value={formData.email} 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          placeholder='Password' 
          id='password' 
          value={formData.password} 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange} 
        />
        <button 
          disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-80'
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {success && <p className="text-green-700 mt-5">{success}</p>}
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  );
}