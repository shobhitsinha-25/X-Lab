import React, { useState } from 'react';
import img from "../images/code.png";
import dltimg from "../images/delete.png";
import { api_base_url } from '../toggle';
import { useNavigate } from 'react-router-dom';

const ListCard = ({ item }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const deleteProject = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,
        userId: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload();
        } else {
          alert(data.message);
          setIsDeleteModelShow(false);
        }
      })
      .catch(error => {
        console.error("Error deleting project:", error);
        alert("An error occurred while deleting the project.");
      });
  };

  return (
    <div>
      <div onClick={() => { navigate(`/editor/${item._id}`); }} className='listcard mb-2 rounded-lg cursor-pointer w-full flex items-center justify-between p-4 bg-[#000c1a]'>
        
        <div className='flex items-center gap-2'>
          <img className='w-[60px]' src={img} alt="Project Thumbnail" />
          <div>
            <h3 className='text-2xl text-white'>{item.title}</h3>
            <p className='text-lg text-white-700'>Created on {new Date(item.date).toDateString()}</p>
          </div>
        </div>
        
        <div onClick={(e) => { e.stopPropagation(); setIsDeleteModelShow(true); }}>
          <img className='w-[30px] cursor-pointer' src={dltimg} alt="Delete Icon" />
        </div>
        
      </div>

      {isDeleteModelShow && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-[#1a1a00] rounded-lg p-6 w-[300px] shadow-lg text-center'>
            <h3 className='text-xl font-bold mb-4 text-[white]'>Delete this project?</h3>
            <div className='flex justify-around mt-4'>
              <button
                onClick={() => { deleteProject(item._id); }}
                className='p-2 rounded-lg bg-red-500 text-white cursor-pointer w-1/3'
              >
                Delete
              </button>
              <button
                onClick={() => { setIsDeleteModelShow(false); }}
                className='p-2 rounded-lg bg-gray-300 text-black cursor-pointer w-1/3'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCard;
