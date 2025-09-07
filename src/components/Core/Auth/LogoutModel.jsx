import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai'; // Make sure to import the icon
import {
  clearRole,
  clearRoomcode,
  clearToken,
} from '../../../Slices/authSlice';
import { clearUser } from '../../../Slices/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowModel } from '../../../Slices/LogoutSlice';
import toast from 'react-hot-toast';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function cancelHandler() {
    dispatch(setShowModel(false));
  }

  function yesHandler() {
    dispatch(clearToken());
    dispatch(clearUser());
    dispatch(clearRole());

    dispatch(setShowModel(false));
    toast.success('Logout Successfully');
    navigate('/login', { replace: true });
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-[600] p-4`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <AiOutlineExclamationCircle className="text-4xl text-red-500 mb-4" />

        <div className="text-lg font-semibold mb-2">Are You Leaving?</div>

        <div className="text-center text-gray-600 mb-4">
          Are you sure you want to logout? All your unsaved data will be lost.
        </div>

        <div className="flex space-x-4">
          <button
            onClick={cancelHandler}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={yesHandler}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
