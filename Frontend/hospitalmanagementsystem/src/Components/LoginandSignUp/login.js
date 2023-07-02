import React,{useState} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import registerbg from '../Images/registerbg.jpg'

const Login=()=>{ 
    const navigate = useNavigate();
    const [details,setDetails]=useState({
        "userId": 0,
        "email": "",
        "password": "",
        "role": "",
        "token": ""
    })

    var changeUserId = (event)=>{
        setDetails({...details,"email":event.target.value})
    }

    var changeUserPassword = (event)=>{
        setDetails({...details,"password":event.target.value})
    }


	// const submitThis=()=>{

    //     axios.post('http://localhost:5188/api/Registration/Login',{
    //         userId: details.userId,
    //         password: details.password,
    //         role: details.role,
    //         token: details.token,
    //         email:details.email
    //       })
    //       .then(res => {
    //         sessionStorage.setItem('token', res.data.token);
    //         sessionStorage.setItem('Email', res.data.EmailId);
    //         sessionStorage.setItem('userId',res.data.userId);
    //         sessionStorage.setItem('role',res.data.role);

    //       })
    //       .catch(error => console.error(error));
	// }
    var submitThis = ()=>{
        
        fetch('https://localhost:7132/api/Registration/Login/Login',{
          "method":"POST",
          headers:{
              "accept": "text/plain",
              "Content-Type": 'application/json'
          },
          "body":JSON.stringify({...details,"details":{} })})
     .then(async (data)=>{
              var myData = await data.json();
              {if(myData.role.toLowerCase()=="admin"){
                navigate("/landingPage")
              } }
              {if(myData.role.toLowerCase()=="patient"){
                navigate("/patientlandingpage")
              } 
            }
            {if(myData.role.toLowerCase()=="doctor"){
                localStorage.setItem('userId',myData.userId)

                navigate("/doctorprofile")
                
              } 
            }
              sessionStorage.setItem('role',myData.role)
              
              console.log(myData)
        }).catch((err)=>{
          console.log(err.error)
        })
      }
	return(
	<div className='container'>
            <div className='con2'>
                <h1>Welcome To LifeLine Hospitals</h1>
                <p>
                    Welcome to LifeLine Hospitals, Please log in to access your account
                    If you don't have account yet, You can register below
                </p>

            </div>
            <div className='con'>
 
            <center><h2>Login</h2></center>
            <div className='fld'> 

            <label For="email">User Id or Email</label>
            <input type="text" name="email" id="email" placeholder='user id' onChange={changeUserId}/>

            </div> 
			<div className='fld' style={{marginTop:"10px"}}> 
				<label for="passw">Password</label>
			    <input type="text" name="passw" id="passw" placeholder='password' onChange={changeUserPassword}/> 
            </div>  
			<button type="submit" onClick={submitThis}>Login</button>

            <div className='registeras'>
            <p>  Dont have an account?</p><br>
            </br>
            <Link to="/register" className="link" onClick={()=>{localStorage.setItem("role","doctor")}}>Register as a doctor </Link> or
            <Link to="/register" className="link"  onClick={()=>{localStorage.setItem("role","patient")}}> Patient </Link>
                </div>


            </div>
        </div>
)} 

export default Login;
