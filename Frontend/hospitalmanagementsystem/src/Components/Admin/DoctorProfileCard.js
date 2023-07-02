import './DoctorProfileCard.css'
import { useState } from 'react';
import React from 'react';
import AdminLandingPage from './Landingpage';
import { useLocation ,Link, useNavigate} from 'react-router-dom';


const Card = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const showButtonOnLinks = ['/managedoctors'];
  const showButton = showButtonOnLinks.includes(location.pathname);
  const [doctorstatus,setdoctorStatus] = useState({
    "doctorId": 0,
    "status": ""
  });
  

  var changestatus = (doctorData)=>{
    
    fetch('https://localhost:7132/api/Doctor/UpdateDoctorStatus',{
      "method":"POST",

      headers:{
          "accept": "text/plain",
          "Content-Type": 'application/json'
      },
      "body": JSON.stringify(doctorData)
      
    })
 .then(async (data)=>{
          var myData = await data.json();
          console.log(JSON.stringify(doctorstatus))


          console.log(myData.doctorstatus)

    }).catch((err)=>{
      console.log(err.error)
    })
  }


  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{props.c.name}</h3>
        <p className="card-description">Specialization:{props.c.specialization}<br/>Experience :{props.c.experience}<br/>PhoneNUmber : {props.c.phoneNumber}</p>
        {showButton && (
   
<button id="approvebtn" onClick={()=>{
    
    var doctorData = {
      "doctorId": props.c.doctorId,
    "status":"approved"
    };
       console.log(doctorData);
       changestatus(doctorData);
       window.location.reload();
  }} 
  value="approved">Approve</button>       
      )}      </div>
    </div>
  );
};

export default Card;



