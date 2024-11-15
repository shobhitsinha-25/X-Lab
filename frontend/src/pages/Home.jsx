import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GridCard from '../components/GridCard'
import ListCard from '../components/ListCard'
import { api_base_url } from '../toggle'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [isGridCard, setGridCard] = useState(true)  
  const [projTitle, setProjtitle] = useState("")
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [isCreateModelShow, setisCreateModelShow] = useState(false)
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");;


  const createProj = (e) => {
    if (projTitle === "") {
      alert("Please Enter Project Title")
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setisCreateModelShow(false)
          setProjtitle("")
          alert("Project Created Successfully")
          navigate(`/editor/${data.projectId}`)
        } else {
          alert("Something Went Wrong")
        }
      })
    }
  }

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.projects)
      } else {
        setError(data.message)
      }
    })
  }

  useEffect(() => {
    getProj()
  }, [])

  // Filter projects based on search query
  const filteredData = data?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    })
  }, [])

  // Function to toggle between grid and list view
  const toggleView = () => {
    setGridCard(prevState => !prevState);  
  }

  return (
    <div>
      <Navbar toggleView={toggleView} isGridCard={isGridCard} />
      <div className='flex item-center justify-between px-[70px] my-[40px] '>
        <h2>Hi, {userData ? userData.username : ""} 👋</h2>
        <div className='flex items-center gap-1'>
          <div className='inputBox !w-[300px]'>
            <input
              type="text"
              placeholder='Search Here... '
              className='h-12'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => { setisCreateModelShow(true) }} className='btn rounded-[5px] !mb-0px h-12'>+</button>
        </div>
      </div>

      <div className='cards'>
        {
          isGridCard ?  
            <div className='grid px-[70px]'>
              {
                filteredData ? filteredData.map((item, index) => {
                  return <GridCard key={index} item={item} />
                }) : ""
              }
            </div>
            : <div className='list px-[70px]'>
              {
                filteredData ? filteredData.map((item, index) => {
                  return <ListCard key={index} item={item} />
                }) : ""
              }
            </div>
        }
      </div>

      {isCreateModelShow ? 
        <div className='createModelIcon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center'>
          <div className='createModel bg-[#1a1a00] rounded-[10px] p-[20px]'>
            <h3 className='text-[20px]'>Create new Project</h3>
            <div className='inputBox mt-3'>
              <input onChange={(e) => { setProjtitle(e.target.value) }} value={projTitle} type="text" placeholder='Project Title' />
            </div>

            <div className='flex items-center gap-[10px] w-full mt-2 '>
              <button onClick={createProj} className='btn !bg-[#cce6ff] !text-[black] w-[49%] rounded-[5px] mt-2 mb-2 text-[20px] '>Create</button>
              <button onClick={() => { setisCreateModelShow(false) }} className='btn !bg-[#cce6ff] !text-[black] w-[49%] rounded-[5px] mt-2 mb-2 text-[20px] '>Cancel</button>
            </div>
          </div>
        </div> : ""
      }
    </div>
  )
}

export default Home
