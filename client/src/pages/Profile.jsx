import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { set } from "mongoose";
import { useDispatch } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess,deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null)
  const [image, setimage] = useState(undefined)
  const {currentUser, loading, userError} = useSelector (state => state.user)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if(image){
      handleFileUpload(image)
    }
  },[image]);

  const handleFileUpload = async (image) => {
    
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setUploadProgress(0);
    setIsUploading(true); 
    const newformData = new FormData();
    newformData.append("file", image);
    newformData.append("upload_preset", "mern-auth-app");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj4yg18ef/image/upload", 
        newformData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setFormData({...formData, profilePicture: response.data.secure_url})
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Try again.");
    } finally {
      setTimeout(() => {
        setIsUploading(false); 
      }, 5000); 
    }

  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      
      if(data.success === false){
        dispatch(updateUserFailure(data));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        });

    if(result.isConfirmed){
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method: 'DELETE',
        });
        const data = await res.json();
  
        if(data.success === false){
          dispatch(deleteUserFailure(data))
          return;
        }
        dispatch(deleteUserSuccess(data))
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete Your account.", "error");
        dispatch(deleteUserFailure(error))
      }
    }    
  }

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, signout it!",
    });
    if(result.isConfirmed){
      try{
        await fetch(`/api/auth/signout`);
        dispatch(signOut());
      }catch(error){
        Swal.fire("Error!", "Failed to signout.", "error");
        console.log(error);
      }
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl front-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setimage(e.target.files[0])}/>
        <img src={formData.profilePicture || currentUser.profilePicture} onClick={() => fileRef.current.click()} alt="" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" />
        {isUploading && (
        <p className="text-sm self-center">
          {error ? (
            <span className="text-red-700">{error}</span>
          ) : uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : ''}
        </p>
        )}
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer">{loading ? 'Loading...' : "Update"}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{userError && 'Somthing went wrong!'}</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User is updated successfully!'}</p>
    </div>
  )
}
