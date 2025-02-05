import React, {useEffect, useState} from 'react';
import UserStore from "../../store/UserStore.js";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate();
    const { token, UserLoginRequest, isLoading, error } = UserStore((state) => ({
        token: state.token,
        UserLoginRequest: state.UserLoginRequest,
        isLoading: state.isLoading,
        error: state.error,
    }));





    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log("submit");

        const success = await UserLoginRequest(email, password);
        console.log("success", success);
        if (success) {
            console.log("Navigating to home...");
            navigate("/", { replace: true });  // Add replace:true
        } else {
            console.log("Login failed, not navigating.");
        }


    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={isLoading}  // Disable button while loading
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </button>
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
