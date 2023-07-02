import './DoctorProfileCard.css'
import { useState } from 'react';
import React from 'react';
import AdminLandingPage from './Landingpage';
import { useLocation ,Link, useNavigate} from 'react-router-dom';

import emailicon from "../Images/email.png"
import phoneicon from "../Images/phone.png"

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
    <div className="card-doctor">
      <div className="card-content">
        <h3 className="card-title">{props.c.name}</h3>
        <p className="small">Specialization: {props.c.specialization}<br/>Experience :{props.c.experience}<br/><img class="phoneicon"src={phoneicon}></img> {props.c.phoneNumber}</p>
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
         
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
    </div>
  );
};

export default Card;



