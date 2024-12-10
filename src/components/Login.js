import { useState } from "react"
import Header from "./Header"

const Login = () => {
  const [isSignInForm,SetSignInForm] = useState(true);

  const toggletheSignInform = ()=>{
    SetSignInForm(!isSignInForm)
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/158a0e2a-cca4-40f5-86b8-11ea2a281b06/web_tall_panel/IN-en-20241202-TRIFECTA-perspective_052fb757-35ce-4655-946e-3c9ffac95fd0_large.jpg"
        alt="bg-image" />
      </div>
      <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70">
      <h1 className="text-3xl font-bold">{isSignInForm ? "Sign In": "Sign Up"}</h1>
      {!isSignInForm && <input type="text" placeholder="Enter Your Full Name" className="p-4 my-4 w-full bg-gray-700" />}
        <input type="text" placeholder="Enter Your Email" className="p-4 my-4 w-full bg-gray-700"/>
        <input type="password" placeholder="Enter your Password" className="p-4 my-4 w-full  bg-gray-700"/>
        <button type="submit" className="p-4 my-4 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In": "Sign Up"}</button>
        <p onClick={toggletheSignInform} className="py-4 cursor-pointer">{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered.Sign In now"}</p>
      </form>
    </div>
  )
}

export default Login
