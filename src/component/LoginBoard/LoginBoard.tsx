"use client";

import React, { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";

const LoginBoard = () => {
    const [isSign, setIsSign] = useState(false);
    const handleSignInClick = () => setIsSign(true);
    const handleSignUpClick = () => setIsSign(false);

    return (
        <div className="flex w-full h-screen">
            <div
                className="hidden sm:block basis-2/5 bg-cover bg-top bg-no-repeat bg-gradient-to-r from-custom-blue-left to-custom-blue-right overflow-auto"
                style={{ backgroundImage: 'url(/login/log-bg.png)' }}
            >   
            </div>
            <div className="w-full sm:basis-3/5 h-full bg-opacity-50 p-8 lg:px-[150px] flex flex-col justify-start overflow-auto relative " >
                <div className="-top-4 left-0 absolute ">
                    <img src="login/app-logo.png" alt="App Logo " className="w-[30%]" />
                </div>
                {isSign ? <SignUp /> : <Login />}
                <div className="text-center mt-4 mb-4 text-[#51A1FF] font-medium">
                    Don&apos;t have an account?{' '}
                    {isSign ? (
                        <span
                            className="text-[#51A1FF] cursor-pointer"
                            onClick={handleSignUpClick}
                        >
                            Sign In
                        </span>
                    ) : (
                        <span
                            className="text-[#51A1FF] cursor-pointer"
                            onClick={handleSignInClick}
                        >
                            Sign Up
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginBoard;


