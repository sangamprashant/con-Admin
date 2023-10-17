import React, { useState } from "react";
import axios from "axios";

function Login({setIsLogged}) {

  const [errorMessage ,setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loginForm,setLoginForm] = useState({
    email:"",
    password:""
  })

  const handelInput = (e) => {
    setLoginForm({
      ...loginForm,[e.target.name]:e.target.value
    })
  }

  const handelFormData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/do/login",loginForm)
      if(response.status==200){
        setErrorMessage("")
        setSuccessMessage(response.data.message)
        // localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("token",response.data.token)
        setIsLogged(true)
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setSuccessMessage("")
    }
  }

  return (
    <form className="text-white body-font bg-gray-900 h-full min-h-screen py-24" onSubmit={handelFormData}>
      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
            Admin Login
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Login to see the message and do post on social media.
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label for="email" className="leading-7 text-sm ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handelInput}
              value={loginForm.email}
              required
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="container px-5  mx-auto">
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label for="password" className="leading-7 text-sm ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handelInput}
              value={loginForm.password}
              required
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex justify-center lg:w-2/3 w-full  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
          <button type="submit" className="text-white  bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </div>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex justify-center lg:w-2/3 w-full  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
        <p className="text-green-500 p-0">{successMessage}</p>
        <p className="text-red-500 p-0">{errorMessage}</p>
        </div>
      </div>
     
    </form>
  );
}

export default Login;
