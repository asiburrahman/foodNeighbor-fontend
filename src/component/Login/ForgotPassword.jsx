import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPassword = () => {
    const { email: initialEmail } = useParams();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(initialEmail || '');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Optimistic transition or fast response handling
            await axios.post(`${baseUrl}/send-otp-reset`, { email });
            toast.success("OTP sent successfully!");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP.");
            toast.error(err.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Call verify-otp with persist: true so we can use it in the next step
            await axios.post(`${baseUrl}/verify-otp`, { email, otp, persist: true });
            toast.success("OTP Verified! Now set your new password.");
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP.");
            toast.error(err.response?.data?.message || "Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        // Password validation
        const passwordCheker = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordCheker.test(newPassword)) {
            setError("Password must have one lowercase, one uppercase, one digit and 6 characters or longer");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${baseUrl}/reset-password`, {
                email: email.trim().toLowerCase(),
                otp,
                newPassword
            });
            toast.success("Password reset successfully! Please login.");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password.");
            toast.error(err.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 mt-20 w-full mx-auto max-w-sm shrink-0 shadow-2xl premium-shadow">
            <ToastContainer />
            <div className="card-body">
                <h1 className="text-2xl font-bold text-center text-gradient">Reset Password</h1>
                
                {/* Step Progress Indicator */}
                <div className="flex justify-between mb-6 px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                    <div className={`flex-1 h-0.5 mt-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                    <div className={`flex-1 h-0.5 mt-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label className="label">Email Address</label>
                            <input
                                required
                                type="email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button disabled={loading} className="btn btn-primary text-white premium-shadow">
                            {loading ? <span className="loading loading-spinner"></span> : "Send Reset OTP"}
                        </button>
                        <p className="text-center text-sm">
                            Back to <NavLink to="/login" className="text-primary font-bold">Login</NavLink>
                        </p>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
                        <p className="text-xs text-gray-500 mb-2">Code sent to: <span className="font-semibold">{email}</span></p>
                        <div className="form-control">
                            <label className="label">Enter 6-Digit OTP</label>
                            <input
                                required
                                type="text"
                                className="input input-bordered w-full text-center text-xl tracking-widest"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                maxLength={6}
                            />
                        </div>
                        <button disabled={loading} className="btn btn-primary text-white premium-shadow">
                            {loading ? <span className="loading loading-spinner"></span> : "Verify OTP"}
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="btn btn-ghost btn-sm">Back</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label className="label">New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-xs absolute top-3 right-4 opacity-70"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">Confirm New Password</label>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repeat Password"
                            />
                        </div>

                        <button disabled={loading} className="btn btn-primary text-white premium-shadow">
                            {loading ? <span className="loading loading-spinner"></span> : "Update Password"}
                        </button>
                        
                        <button type="button" onClick={() => setStep(2)} className="btn btn-ghost btn-sm">
                            Back
                        </button>
                    </form>
                )}

                {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
