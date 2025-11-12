import React, { useContext,  useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
     
  const { user, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name && !photo) {
      toast('Please fill at least one field to update!');
      return;
    }

    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
       
        setUser({ ...user, displayName: name, photoURL: photo });
        setMessage('✅ Profile updated successfully!');
        setTimeout(() => navigate('/auth/my-profile'), 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage(`❌ ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center  items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

        <form onSubmit={handleUpdate} className="card-body">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input
            name="photo"
            type="text"
            className="input"
            placeholder="Update Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          {message && <p className="text-center text-green-600 mt-3">{message}</p>}

          <button type="submit" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
