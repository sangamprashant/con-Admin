import React from "react";

function Login() {
  return (
    <section class="text-white body-font bg-gray-900 h-full min-h-screen py-24">
      <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
            Admin Login
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Login to see the message and do post on social media.
          </p>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <label for="email" class="leading-7 text-sm ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div class="container px-5  mx-auto">
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <label for="password" class="leading-7 text-sm ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div class="container px-5 py-8 mx-auto">
        <div class="flex justify-center lg:w-2/3 w-full  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
          <button class="text-white  bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
