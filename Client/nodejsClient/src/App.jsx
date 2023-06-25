import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({name : ""});

  const fetchUserList=async()=>{
    const result=await fetch("http://localhost:3007/users")
    const list=await result.json();
    // console.log(list);
    setUsers(list);
    // console.log(user);
  }
  const userhandleChange=(event)=>{

    setUser(event.target.value);
    
    
  }
  
  
  const AddUser=async()=>{
    console.log("clicked");
    console.log(user);

    const response=await axios.post("http://localhost:3007/Adduser",user)
    console.log(response.data);
    fetchUserList();
    

  }

  useEffect(()=>{
    fetchUserList();
  },[])

  return (
    <>




      <h1>Users</h1>
      <ul className='uIstyle' >
        {users.map((result,key)=>
        <li key={key}> <h3> {result.name}</h3>
        
        </li>
        )}
      </ul>
       <input placeholder='Enter User Name' onChange={userhandleChange}/>       
      <button onClick={AddUser}>Add New User</button>
    </>
  )
}

export default App
