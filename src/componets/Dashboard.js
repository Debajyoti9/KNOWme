import React,{useState,useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';
import './Dashboard/Dashboard.css';
import{auth,db,logout} from '../firebase/firebase';
function Dashboard() {
    const [user,loading,error] = useAuthState(auth);
    const [name,setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () =>{
      try{
        const query = await db.collection("users").where("uid","==",user?.uid).get();
        const data = await query.docs[0].data();
        console.log(data);
        setName(data.name);
       }
     catch(err){
        console.error(err);
        alert("An error occured while fetching user data");
    }
    }
    useEffect(()=>{
        if(loading) return;
        if(!user) return navigate('/');
        fetchUserName();
    },[loading,user]);
    return (
        <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
}

export default Dashboard;
