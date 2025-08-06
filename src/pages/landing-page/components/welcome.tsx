import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Lightbulb, Users, Shield, Zap, Home, History, HelpCircle, User, Bell, Copy, Fingerprint, X, Share } from 'lucide-react';
import Image from "next/image";
import meterlyImage from "../../../../public/assets/images/rafiki.svg";

const WelcomePage = () => {
	const [currentPage, setCurrentPage] = useState('welcome');
	return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center pt-12 pb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Meterly</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="w-full max-w-sm mx-auto text-center">
            {/* Illustration */}
            <div className="bg-white px-4 py-16 md:px-16 text-[#2B3F44]"
      style={{
        backgroundImage: "url('/assets/images/rafiki.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
             
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Meterly
            </h1>
            <p className="text-gray-600 mb-12 text-center text-lg leading-relaxed">
              Easily recharge your prepaid meter anytime, anywhere at your convenience.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setCurrentPage('register')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center pb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
  );
};

export default WelcomePage;
