import { useState,useRef } from "react"
import Header from "./Header"
import {checkValidData} from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addUser} from '../utils/userSlice'

const Login = () => {
  const [isSignInForm,SetSignInForm] = useState(true);
  const [errorMessage,SetErrorMessage] = useState(null);

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);

  const toggletheSignInform = ()=>{
    SetSignInForm(!isSignInForm)
  }

  const handleButtonClick = () =>{
    const message = checkValidData(email.current.value,password.current.value)
    SetErrorMessage(message);
    if(message) return;

    // Sign in Sign up logic
    if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/v2/D5635AQGQNQ0twnMfRA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1732149902733?e=1734678000&v=beta&t=F8T_t_fZXTaHYaCVoXhXFNn5vMsoCdsKhERIVWj_MQA"
            }).then(() => {
              // Profile updated!
              navigate("/browse")
              //update the store user slice 
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
              
            }).catch((error) => {
              // An error occurred
              SetErrorMessage(error.message)
            });
            console.log(user)
        })
      .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            SetErrorMessage(errorCode + " " + errorMessage)
      });

    }else{
      // Sign In logic
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          navigate("/browse")
          })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrorMessage(errorCode + " " + errorMessage)
        });
    }

  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/158a0e2a-cca4-40f5-86b8-11ea2a281b06/web_tall_panel/IN-en-20241202-TRIFECTA-perspective_052fb757-35ce-4655-946e-3c9ffac95fd0_large.jpg"
        alt="bg-image" />
      </div>
      <form onSubmit={(e)=>{e.preventDefault()}} className="absolute mx-auto right-0 left-0 bg-black w-3/12 my-36 text-white rounded-lg p-12 bg-opacity-80 ">
      <h1 className="text-3xl font-bold">{isSignInForm ? "Sign In": "Sign Up"}</h1>
      {!isSignInForm && <input ref={name} type="text" placeholder="Enter Your Full Name" className="p-4 my-4 w-full bg-gray-700" />}
        <input ref={email} type="text" placeholder="Enter Your Email" className="p-4 my-4 w-full bg-gray-700"/>
        <input ref={password} type="password" placeholder="Enter your Password" className="p-4 my-4 w-full  bg-gray-700"/>
        {errorMessage && <p className="py-2 text-red-500 font-bold text-sm">{errorMessage}</p>}
        <button type="submit" className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In": "Sign Up"}</button>
        <p onClick={toggletheSignInform} className="py-4 cursor-pointer">{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered.Sign In now"}</p>
      </form>
    </div>
  )
}

export default Login
