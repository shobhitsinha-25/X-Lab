import React, { useState } from 'react'
import codeimg from "../images/code.png"
import dltimg from "../images/delete.png"
import { api_base_url } from '../toggle';
import { useNavigate } from 'react-router-dom';

const GridCard = ({item}) => {
  const navigate=useNavigate();

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
  }).then(res => res.json()).then(data => {
    if (data.success) {
      setIsDeleteModelShow(false)
      window.location.reload();  
    } else {
      alert(data.message);
      setIsDeleteModelShow(false)
    }
  }).catch(error => {
    console.error("Error deleting project:", error);
    alert("An error occurred while deleting the project.");
  });
};
  return (
    <div className='w-[250px] h-[150px] cursor-pointer rounded-lg bg-[#000c1a] shadow-lg hover:bg-[#001833] '>
        <div onClick={()=>{navigate(`/editor/${item._id}`)}}>
        <img src={codeimg} alt="" className='w-[60px]' />
        <h3 className=' ml-2 text-[20px] w-[90%] line-clamp-1'>{item.title}</h3>
        <div className='flex items-center justify-between'>
            <p className='text-[15px] ml-2 '>Created on {new Date(item.date).toDateString()}</p>
            <img
            onClick={(e) => {
              e.stopPropagation(); 
              setIsDeleteModelShow(true); 
            }}
            className='w-[25px] mt-[10px] mr-2'
            src={dltimg}
            alt="Delete"
          />
        </div>
        </div>

{isDeleteModelShow && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-[#1a1a00] rounded-lg p-6 w-[300px] shadow-lg text-center'>
            <h3 className='text-xl font-bold mb-4 text-[white]'>Delete this project?</h3>
            <div className='flex justify-around mt-4'>
              <button
                onClick={()=>{deleteProject(item._id)}}
                className='p-2 rounded-lg bg-red-500 text-white cursor-pointer w-1/3'
              >
                Delete
              </button>
              <button
                onClick={()=>{setIsDeleteModelShow(false)}}
                className='p-2 rounded-lg bg-gray-300 text-black cursor-pointer w-1/3'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        
    </div>
  )
}

export default GridCard