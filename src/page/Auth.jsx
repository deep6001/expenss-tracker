import React from 'react'
import {signInWithPopup} from 'firebase/auth'
import { auth,provider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import backImg from '../assets/back_img.png'
import backimg from '../assets/back_img.svg'





function Auth() {

    const navigate = useNavigate();
   const signInwithGoogle = async () => {
       const result = await signInWithPopup(auth,provider);
       console.log(result);
       const userInfo={
        uid:result.user.uid,
        name:result.user.displayName,
        email:result.user.email,
        picture:result.user.photoURL,
        isAuth:true
       }
       navigate('/expenss');
       localStorage.setItem('userInfo',JSON.stringify(userInfo));
       

   } 
  return (
   <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter  scale-105"
        style={{ backgroundImage: `url(${backimg})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 bg-white bg-opacity-80 shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Sign in with Google
        </h1>
        <button
          onClick={signInwithGoogle}
          className="flex items-center gap-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          {/* Google icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.4-1.6-34.2-4.7-50.4H272v95.3h146.9c-6.3 34-25.2 62.8-53.7 82l86.6 67c50.6-46.6 81.7-115.4 81.7-194z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c72.4 0 133-24 177.3-65.1l-86.6-67c-24.1 16.2-55 25.8-90.7 25.8-69.8 0-129.1-47.1-150.3-110.3l-89.6 69c41.2 82.1 126.8 137.6 229.9 137.6z"
            />
            <path
              fill="#FBBC04"
              d="M121.7 327.7c-10.3-30.3-10.3-62.8 0-93.1l-89.6-69C4.3 211.2-7.1 244.3-7.1 278s11.4 66.8 32.2 112.4l89.6-69z"
            />
            <path
              fill="#EA4335"
              d="M272 109.1c38.7 0 73.5 13.3 101 39.3l75.6-75.6C387.5 24.6 329.9 0 272 0 169 0 83.3 55.5 42.1 137.6l89.6 69C142.9 156.2 202.2 109.1 272 109.1z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>

  )
}

export default Auth
