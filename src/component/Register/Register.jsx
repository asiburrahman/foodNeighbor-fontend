import React, { use, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { imageUpload } from '../../utils/imageUpload';

const Register = () => {
  const userInfo = use(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { googleSignin, createUser, updateUserProfile, setUser, } = userInfo
  
  // OTP Verification States
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const handleRegisterInitial = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const photoFile = e.target.photo.files[0]
    const email = e.target.mail.value
    const password = e.target.password.value

    setErrorMessage('')

    const passwordCheker = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (passwordCheker.test(password) === false) {
      setErrorMessage("Password must have one lowercase, one uppercase, one digit and 6 characters or longer")
      return;
    }

    setLoading(true);
    const startTime = Date.now();

    try {
      // 1. Upload photo to ImgBB
      const photoUrl = await imageUpload(photoFile);
      
      setRegistrationData({ name, photoUrl, email, password });

      // 2. Send OTP
      await axios.post('http://localhost:3000/send-otp', { email });
      
      // 3. Ensure at least 3 seconds of loading as requested
      const elapsedTime = Date.now() - startTime;
      const waitTime = Math.max(0, 3000 - elapsedTime);
      await new Promise(resolve => setTimeout(resolve, waitTime));

      toast.success("Photo uploaded and OTP sent to your email!");
      setStep(2); // Move to OTP input step
    } catch (error) {
      setErrorMessage(error.message || "Failed to process registration. Please check your connection and API keys.");
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyOTPAndRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // 1. Verify OTP
      await axios.post('http://localhost:3000/verify-otp', {
        email: registrationData.email,
        otp: otp
      });

      // 2. If OTP valid, Register via Firebase
      const result = await createUser(registrationData.email, registrationData.password);
      const userinfo = result.user;
      
      await updateUserProfile(registrationData.name, registrationData.photoUrl);
      // Ensure we use the exact field names (photoURL) that Firebase uses
      setUser({ ...userinfo, displayName: registrationData.name, photoURL: registrationData.photoUrl });
      
      toast.success("Registration Successful!");
      setStep(1); 
      navigate('/availableFood') 
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignin = () => {
    setErrorMessage('')
    googleSignin().then((result) => {
      const user = result.user;
      setUser(user)
      toast.success("User Login Successfully By Google");
    }).catch((error) => {
      setErrorMessage(error.message);
    });
  }

  return (
    <div className="card bg-base-100 mt-20 w-full mx-auto max-w-sm shrink-0 shadow-2xl premium-shadow">
      <ToastContainer /> 
      <div className="card-body">
        <h1 className="text-2xl font-bold text-center text-gradient">Register</h1>
        
        {step === 1 ? (
          <>
            <form onSubmit={handleRegisterInitial} className="flex flex-col gap-2">
              <label className="label py-1">User Name</label>
              <input required type="text" className="input input-bordered w-full" name='name' placeholder="User Name" />
              
              <label className="label py-1">User Profile Photo</label>
              <input required type="file" className="file-input file-input-bordered w-full" name='photo' accept="image/*" />
              
              <label className="label py-1">Email</label>
              <input required type="email" className="input input-bordered w-full" name='mail' placeholder="Email" />
              
              <label className="label py-1">Password</label>
              <div className='relative'>
                <input required type={showPassword ? "text" : "password"} className="input input-bordered w-full" name='password' placeholder="Password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className='btn btn-ghost btn-xs absolute top-3 right-4 opacity-70'>
                  {showPassword ? <FaEye /> : <FaEyeSlash />} 
                </button>
              </div>
              
              <button disabled={loading} className="btn btn-primary text-white mt-6 premium-shadow hover:-translate-y-1">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </span>
                ) : (
                  "Send Verification OTP"
                )}
              </button>
            </form>

            <div className="divider">OR</div>
            <button onClick={handleGoogleSignin} className="btn btn-outline hover:bg-emerald-50 mt-1 w-full text-emerald-600 border-emerald-300">
              Continue with Google
            </button>
            <p className="mt-4 text-sm text-center">Already have an account? <NavLink className='text-primary font-semibold' to='/login'>Login</NavLink></p>
          </>
        ) : (
          <>
            <form onSubmit={handleVerifyOTPAndRegister} className="fieldset">
              <label className="label">Enter 6-Digit OTP</label>
              <p className="text-xs text-gray-500 mb-2">Code sent to: <span className="font-semibold">{registrationData?.email}</span></p>
              <input required type="text" className="input text-center text-xl tracking-widest" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" maxLength={6} />
              
              <button disabled={loading} className="btn btn-primary text-white mt-4 premium-shadow hover:-translate-y-1">
                {loading ? "Verifying..." : "Verify & Register"}
              </button>
              
              <button type="button" onClick={() => setStep(1)} className="btn btn-ghost mt-2 opacity-60">Back</button>
            </form>
          </>
        )}

        {errorMessage && <p className='text-red-600 font-bold text-sm text-center pt-2'>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;