import React, { ReactNode, useEffect, useState } from "react";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Lightbulb,
  Users,
  Shield,
  Zap,
  Home,
  History,
  HelpCircle,
  User,
  Bell,
  Copy,
  Fingerprint,
  X,
  Share,
} from "lucide-react";
import Image from "next/image";
import meterlyImage from "../../../public/assets/images/rafiki.svg";
import LogoImage from "../../../public/assets/images/meterly-img-long.png";
import ArrowBack from "../../../public/assets/images/ic_round-arrow-back.svg";
import keyIcon from "../../../public/assets/images/keyIcon2.svg";
import Clock from "@/components/Clock/Clock";
import {  FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import usuageIcon from "../../../public/assets/images/bx_trip.svg";




interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}
const MeterlyApp = () => {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nin: "",
    distributionCompany: "",
    meterNumber: "",
    verificationCode: ["", "", "", "", "", ""],
  });
	 const updateFormData = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
 


  const handleAmountSelect = (amount:any) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  // Check if we're on desktop
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

const Layout = ({ children, showSidebar = false }: LayoutProps) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white   flex flex-col md:flex-row">
      {/* Left Side - Illustration (Hidden on mobile) */}
      <div className="hidden md:flex  bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500flex-1 items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="relative">
            <div className="w-96 h-96 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center relative overflow-hidden border border-white/20">
              <div className="absolute top-8 right-12">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
                  <Lightbulb className="w-10 h-10 text-yellow-800" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="absolute -top-1 left-10 w-3 h-3 bg-yellow-300 rounded-full animate-pulse delay-100"></div>
                <div className="absolute top-2 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-pulse delay-200"></div>
              </div>

              <div className="absolute bottom-20 left-16">
                <Users className="w-24 h-24 text-white" />
              </div>

              <div className="absolute bottom-12 right-12 w-12 h-12 bg-green-400 rounded-lg transform rotate-45 animate-bounce"></div>
              <div className="absolute top-24 left-16 w-8 h-8 bg-blue-400 rounded-lg animate-pulse delay-300"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Power at Your Fingertips
            </h2>
            <p className="text-white/80 text-lg">
              Manage your electricity with ease and convenience
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1  shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );

  const WelcomePage = () => (
    <Layout>
      <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-white flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 relative">
          {/* Logo Image - centered and layered over */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              src={LogoImage.src}
              alt="Logo"
              className="w-32 h-72 object-contain rounded-lg"
            />
          </div>

          {/* Illustration and Text */}
          <div className="w-full max-w-sm mx-auto text-center mt-16">
            <div className="mb-4 relative">
              <img
                src={meterlyImage.src}
                alt="Meterly Illustration"
                className="max-w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            <h1 className="text-xl font-bold text-[#1779E8] mb-2">
              Welcome to Meterly
            </h1>
            <p className="text-gray-600 mb-3 text-base leading-relaxed">
              Easily recharge your prepaid meter anytime, anywhere at your
              convenience.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setCurrentPage("register")}
                className="w-full bg-blue-600 hover:bg-white text-white  hover:text-blue hover:border-2 hover:border-blue-600 font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentPage("login")}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </Layout>
  );

  const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      nin: "",
      distributionCompany: "",
      meterNumber: "",
      verificationCode: "",
    });

    const updateFormData = (field:any, value:any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <Layout>
        <div className="h-screen bg-white flex flex-col">
          {/* Header */}
         

          {/* Content */}
          <div className="flex-1 px-6 py-8 overflow-y-auto">
						 <div >
            <button
              onClick={() => setCurrentPage("welcome")}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
							 <img
              src={ArrowBack.src}
              alt="Logo"
              className="w-6 h-6 object-contain rounded-lg"
            />
						            </button>
          </div>
            <div className="max-w-sm mx-auto">
              <h1 className="text-2xl font-bold text-[#1679E8] mb-2">
                Let's get started
              </h1>
              <p className="text-[#545454] text-sm mb-8">
                Please provide the correct and appropriate information.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateFormData("confirmPassword", e.target.value)
                      }
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <button
                onClick={() => setCurrentPage("verify-email")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg"
              >
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-6">
                <span className="text-gray-600">Already Have Account? </span>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

	 const VerifyEmailPage = () => {
	  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nin: "",
    distributionCompany: "",
    meterNumber: "",
    verificationCode: ["", "", "", "", "", ""],
  });
	 const updateFormData = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
 const handleVerificationCode = (index: number, value: string) => {
  if (value.length <= 1) {
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    updateFormData("verificationCode", newCode);

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      ) as HTMLInputElement | null;

      nextInput?.focus();
    }
  }
};
const [resendTimer, setResendTimer] = useState(600);
const [canResend, setCanResend] = useState(false);

useEffect(() => {
  if (resendTimer > 0) {
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  } else {
    setCanResend(true);
  }
}, [resendTimer]);

const handleResend = () => {
  // Logic to resend OTP (API call, toast, etc.)
  setResendTimer(600);
  setCanResend(false);
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

    return (

    <Layout>
      <div className="min-h-screen bg-white flex flex-col">
       

        {/* Content */}
        <div className="flex-1 px-6 py-8">
						 <div >
            <button
              onClick={() => setCurrentPage("welcome")}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
							 <img
              src={ArrowBack.src}
              alt="Logo"
              className="w-6 h-6 object-contain rounded-lg"
            />
						            </button>
          </div>
          <div className="max-w-sm mx-auto">
              <h1 className="text-2xl font-bold text-[#1679E8] mb-2">
              Verify Email
            </h1>

          <div className="flex flex-col items-center px-4 sm:px-2 ">
          

            <Image
              src={keyIcon}
              className="object-center object-contain my-4"
              alt="otp icon"
              width={50}
              height={50}
            />

            <p className="my-5 text-[#475569] text-center font-medium text-sm sm:text-base ">
              A one-time password has been sent to your registered email address 
                <span className="block text-[#000] font-semibold mt-1">

***npaul@***.com</span>       
            
            </p>

            <p className="text-[#00143D] font-medium mb-4 text-sm sm:text-base">
              Please enter the code here:
            </p>

             <div className="flex flex-wrap justify-center gap-2 mb-6">
    {formData.verificationCode.map((digit, index) => (
      <input
        key={index}
        data-index={index}
        type="password" // 🔐 mask input as •
        maxLength={1}
        value={digit}
        onChange={(e) => handleVerificationCode(index, e.target.value)}
        className="w-12 sm:w-14 h-12 sm:h-14 text-center text-lg font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200 transform focus:scale-105 bg-white"
      />
    ))}
  </div>

	<div className="text-center mt-2">
  <p className="text-sm text-gray-600">
    Didn’t receive an OTP?
    <button
      onClick={handleResend}
      disabled={!canResend}
      className={`ml-1 font-semibold ${
        canResend
          ? "text-blue-600 hover:underline"
          : "text-gray-400 cursor-not-allowed"
      }`}
    >
      Resend
    </button>
  </p>
  {!canResend && (
    <p className="text-xs text-gray-400 mt-1">
      You can resend the code in {formatTime(resendTimer)}
    </p>
  )}
</div>

          </div>
            

            <div>
 

 
</div>


            {/* Verify Button */}
            <button
              onClick={() => setCurrentPage("complete-profile")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </Layout>
	 )};
  const CompleteProfilePage = () => {
		 const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nin: "",
    distributionCompany: "",
    meterNumber: "",
    verificationCode: ["", "", "", "", "", ""],
  });
	 const updateFormData = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
     return (

    <Layout>
      <div className="min-h-screen bg-white flex flex-col">
     

        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
					 <button
              onClick={() => setCurrentPage("welcome")}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
							 <img
              src={ArrowBack.src}
              alt="Logo"
              className="w-6 h-6 object-contain rounded-lg"
            />
						            </button>
          <div className="max-w-sm mx-auto">
              <h1 className="text-2xl font-bold text-[#1679E8] mb-2">
              Complete your profile
            </h1>
              <p className="text-[#545454] text-sm mb-8">
              Please provide the correct and appropriate information.
            </p>

            <div className="space-y-6">
              {/* Phone Number */}
              <div>
                <label className="block text-[#545454] text-base mb-2">
                  Phone Number:
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-gray-200 rounded-l-lg border-r-0">
                    <span className="text-gray-600 font-medium text-sm">+234</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="9057456384"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="flex-1 text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* National Identity Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  National Identity Number(NIN):
                </label>
                <input
                  type="text"
                  placeholder="Enter your NIN"
                  value={formData.nin}
                  onChange={(e) => updateFormData("nin", e.target.value)}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-green-600 mt-2">
                  Forgot NIN? Dial *346# to get NIN
                </p>
              </div>

              {/* Distribution Company */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Distribution Company:
                </label>
                <select
                  value={formData.distributionCompany}
                  onChange={(e) =>
                    updateFormData("distributionCompany", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Please select</option>
                  <option value="aedc">
                    Abuja Electricity Distribution Company (AEDC)
                  </option>
                  <option value="eko">
                    Eko Electricity Distribution Company (EKEDC)
                  </option>
                  <option value="ibadan">
                    Ibadan Electricity Distribution Company (IBEDC)
                  </option>
                  <option value="ikeja">Ikeja Electric Plc (IE)</option>
                </select>
              </div>

              {/* Meter Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Meter Number:
                </label>
                <input
                  type="number"
                  placeholder="Enter your Meter number"
                  value={formData.meterNumber}
                  onChange={(e) =>
                    updateFormData("meterNumber", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => setCurrentPage("registration-success")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </Layout>
	)};

 

  const RegistrationSuccessPage = () => (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Congratulations
          </h1>
          <p className="text-gray-600 mb-12 leading-relaxed">
            Welcome aboard! Your registration is complete and your information
            is securely stored.
          </p>

          <button
            onClick={() => setCurrentPage("login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </Layout>
  );

  const LoginPage = () => (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col">
     

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-sm mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-10 ">
              <Image
                src={LogoImage}
                alt="Meterly Illustration"
              className="w-28  object-contain rounded-lg"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back 👋
            </h1>
            <p className="text-gray-600 mb-8">
              Please sign in to your account.
            </p>

            <div className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16"
                  />
                  <button className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <Fingerprint className="w-6 h-6 text-blue-600" />
                  </button>
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button className="text-blue-600 text-sm hover:underline">
                    Forgot your Password?
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors mt-8 shadow-lg"
            >
              Login
            </button>

            {/* Register Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => setCurrentPage("register")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

const DashboardPage = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

		return(
    <div className="min-h-screen bg-gray-50 overflow-y-scroll pb-20">
      {/* Header */}
        <div className="flex items-center justify-between h-full mt-8 px-4">
       <div className="flex items-center">
            <span className=" sm:inline text-[#1801CD] font-semibold truncate max-w-[520px]">
                Hello, John
              </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:block">
            <Clock className="text-sm leading-tight text-[#1801CD]" />
          </div>
         
            <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">2</span>
          </div>
        </div>
          <div className="relative ">
              <button
              className="flex items-center gap-2"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {/* Hide text on very small screens */}
            
              <span className="w-8 h-8 rounded-full bg-[#1801CD] flex items-center justify-center">
                <FaUserCircle className="text-white" size={18} />
              </span>
            </button>
            

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-[#1801CD] hover:bg-blue-50"
                onClick={() => setCurrentPage("register")}
                >
                  Change Password
                </button>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#1801CD] hover:bg-blue-50"
                onClick={() => setCurrentPage("login")}
                >
                  Logout
                  <FaSignOutAlt className="ml-2" size={14} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Meter Balance</p>
              <p className="text-xs text-blue-200">Last Recharge: 05/04/2024</p>
            </div>
            <Zap className="w-6 h-6 text-blue-200" />
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-3xl font-bold">₦ 5,350.00</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm font-medium">
                Meter Number
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono">34566775643</span>
                <Copy className="w-4 h-4 text-blue-200" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-right">Unit: 400kwh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center py-2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setCurrentPage("recharge")}
          className="bg-blue-100 p-6 rounded-2xl"
        >
          <div className="w-12 h-12  flex items-center justify-center ">
            <Zap className="w-8 h-8 text-[#1679E8]" />
          </div>
          <h3 className="font-semibold text-[#1679E8] text-left mb-2">Recharge Meter</h3>
          <p className="text-sm text-gray-600 text-left">
            Recharge your meter instantly. No queues, No stress, just power.
          </p>
        </button>

        <button className="bg-orange-100 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Image
                src={usuageIcon}
                alt="Meterly Illustration"
              className="w-20  object-contain rounded-lg"
              />
          </div>
          <h3 className="font-semibold text-left text-[#545454] mb-2">View Usage</h3>
          <p className="text-sm text-left text-gray-600">
            Track your electricity consumption in real time. Be informed
          </p>
        </button>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
        <button className="bg-gray-200 p-6 rounded-2xl">
          <div className="w-12 h-12  rounded-xl flex items-center justify-center mb-4">
            <History className="w-12 h-12 text-[#545454]" />
          </div>
          <h3 className="font-semibold text-left text-gray-900 mb-2">History</h3>
          <p className="text-sm text-left text-gray-600">
            See your recent unit purchases and meter top-ups.
          </p>
        </button>

        <button className="bg-green-100 p-6 rounded-2xl">
          <div className="w-12 h-12  rounded-xl flex items-center justify-center mb-4">
            <Lightbulb className="w-14 h-14 text-[#0F9D59]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Education and tips
          </h3>
          <p className="text-sm text-gray-600">
            Practical tips to help you use electricity more efficiently.
          </p>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between">
          <button className="flex flex-col items-center space-y-1">
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Zap className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Recharge</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Help</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Account</span>
          </button>
        </div>
      </div>
    </div>
  ) };

  const RechargePage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
          Recharge Meter
        </h1>
        <button className="p-2">
          <Zap className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Meter Number */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Meter Number
          </label>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <span className="text-blue-800 font-mono text-lg">34566775643</span>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-4">
            Amount:
          </label>

          {/* Custom Amount Input */}
          <input
            type="text"
            placeholder="Enter Custom Amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount("");
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3">
            {["₦1,000", "₦2,000", "₦5,000", "₦10,000", "₦20,000"].map(
              (amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg border font-medium transition-colors ${
                    selectedAmount === amount
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {amount}
                </button>
              )
            )}
          </div>
        </div>

        {/* Estimated Unit */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Estimated Unit:
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <span className="text-gray-600">0</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setCurrentPage("payment-summary")}
          className="w-full bg-blue-100 text-blue-600 font-semibold py-4 px-6 rounded-xl transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );

  const PaymentSummaryPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setCurrentPage("recharge")}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
          Payment Summary
        </h1>
        <button className="p-2">
          <Zap className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Summary Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-600">Meter Number:</span>
            <span className="font-semibold">34566775643</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold">₦5,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Unit:</span>
            <span className="font-semibold">200 kwh</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Payment Method
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedPaymentMethod("card")}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                selectedPaymentMethod === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <div className="w-4 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="font-medium">Credit/Debit Card</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPaymentMethod === "card"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "card" && (
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedPaymentMethod("transfer")}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                selectedPaymentMethod === "transfer"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-2 bg-white rounded-full ml-1"></div>
                </div>
                <span className="font-medium">Bank Transfer</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPaymentMethod === "transfer"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "transfer" && (
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedPaymentMethod("ussd")}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                selectedPaymentMethod === "ussd"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <div className="text-white text-xs font-bold">#</div>
                </div>
                <span className="font-medium">USSD</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPaymentMethod === "ussd"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "ussd" && (
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedPaymentMethod("opay")}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                selectedPaymentMethod === "opay"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
                  <div className="text-white text-xs font-bold">O</div>
                </div>
                <span className="font-medium">Opay</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPaymentMethod === "opay"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "opay" && (
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setCurrentPage("payment-flow")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
          >
            Proceed
          </button>
          <button
            onClick={() => setCurrentPage("recharge")}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Security Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Your payment information is securely encrypted and protected.
        </p>
      </div>
    </div>
  );

  const PaymentFlowPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setCurrentPage("payment-summary")}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-left text-lg font-semibold text-gray-900 ml-4">
          Pay Online
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Payment Provider */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Meterly</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">odunugashola05@gmail.com</p>
            <p className="font-semibold text-gray-900">Pay NGN 6,400</p>
          </div>
        </div>

        {/* Payment Method Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-green-800">*#</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Choose your bank to start the payment
          </h2>
        </div>

        {/* Bank Selection */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => setCurrentPage("bank-transfer")}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <span className="font-medium text-gray-900">
              Guaranty Trust Bank
            </span>
            <span className="text-sm text-gray-500">*737#</span>
          </button>
        </div>

        {/* Cancel Payment */}
        <div className="text-center mb-6">
          <button
            onClick={() => setCurrentPage("payment-summary")}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            × Cancel Payment
          </button>
        </div>

        {/* Security Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by paystack</span>
          </div>
        </div>
      </div>
    </div>
  );

  const BankTransferPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setCurrentPage("payment-flow")}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-left text-lg font-semibold text-gray-900 ml-4">
          Pay Online
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Payment Provider */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-gray-900">Chowdeck</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">odunugashola05@gmail.com</p>
            <p className="font-semibold text-gray-900">Pay NGN 6,400</p>
          </div>
        </div>

        {/* Transfer Instructions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Transfer NGN 6,400 to Paystack Checkout
          </h2>
        </div>

        {/* Bank Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              BANK NAME
            </label>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Paystack-Titan
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ACCOUNT NUMBER
            </label>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold text-gray-900">
                9980795068
              </span>
              <Copy className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              AMOUNT
            </label>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">NGN 6,400</span>
              <Copy className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            This account is for this transaction only and expires in 29:56
          </p>
        </div>

        {/* Confirmation Button */}
        <button
          onClick={() => setCurrentPage("card-payment")}
          className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors hover:border-gray-400 mb-4"
        >
          I've sent the money
        </button>

        {/* Cancel Payment */}
        <div className="text-center mb-6">
          <button
            onClick={() => setCurrentPage("payment-summary")}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            × Cancel Payment
          </button>
        </div>

        {/* Security Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by paystack</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CardPaymentPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setCurrentPage("bank-transfer")}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-left text-lg font-semibold text-gray-900 ml-4">
          Pay Online
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Payment Provider */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-gray-900">Chowdeck</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">odunugashola05@gmail.com</p>
            <p className="font-semibold text-gray-900">Pay NGN 6,400</p>
          </div>
        </div>

        {/* Card Form */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Enter your card details to pay
          </h2>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                CARD NUMBER
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Card Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  CARD EXPIRY
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className=" text-sm font-medium text-gray-600 mb-2 flex items-center space-x-2">
                  <span>CVV</span>
                  <button className="text-blue-600 text-sm">HELP?</button>
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => setCurrentPage("receipt")}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg mb-4"
        >
          Pay NGN 6,400
        </button>

        {/* Cancel Payment */}
        <div className="text-center mb-6">
          <button
            onClick={() => setCurrentPage("payment-summary")}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            × Cancel Payment
          </button>
        </div>

        {/* Security Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by paystack</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ReceiptPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Receipt</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Share className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Receipt Content */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600">
              Your meter has been recharged successfully
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">TXN123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meter Number:</span>
              <span className="font-semibold">34566775643</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold">₦6,400</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Units Purchased:</span>
              <span className="font-semibold">320 kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-semibold">05/04/2024, 13:18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Token:</span>
              <span className="font-mono text-sm font-semibold">
                2547-8963-1025-4789
              </span>
            </div>
          </div>

          {/* New Balance */}
          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 font-medium">New Balance:</span>
              <span className="text-xl font-bold text-blue-800">
                ₦11,750.00
              </span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Available Units: 720 kWh
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-8">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
        >
          Done
        </button>
      </div>
    </div>
  );

  const UsageGlancePage = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm mx-auto text-center">
            {/* Illustration */}
            <div className="mb-12">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-8 left-8">
                  <div className="w-4 h-16 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>

                <div className="absolute top-6 right-8">
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-800"></div>
                </div>

                <div className="absolute bottom-16 left-12">
                  <Users className="w-20 h-20 text-blue-600" />
                </div>

                <div className="absolute top-12 right-16">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-800" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-300 rounded-full"></div>
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <div className="absolute top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <div className="absolute top-3 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-blue-600 mb-4">
              View Usage at Glance
            </h1>
            <p className="text-gray-600 mb-12 text-lg leading-relaxed">
              Monitor your electricity consumption and balance in real time.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setCurrentPage("welcome")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentPage("welcome")}
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
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "welcome":
        return <WelcomePage />;
      case "register":
        return <RegisterPage />;
      case "complete-profile":
        return <CompleteProfilePage />;
      case "verify-email":
        return <VerifyEmailPage />;
      case "registration-success":
        return <RegistrationSuccessPage />;
      case "usage-glance":
        return <UsageGlancePage />;
      case "login":
        return <LoginPage />;
      case "dashboard":
        return <DashboardPage />;
      case "recharge":
        return <RechargePage />;
      case "payment-summary":
        return <PaymentSummaryPage />;
      case "payment-flow":
        return <PaymentFlowPage />;
      case "bank-transfer":
        return <BankTransferPage />;
      case "card-payment":
        return <CardPaymentPage />;
      case "receipt":
        return <ReceiptPage />;
      default:
        return <WelcomePage />;
    }
  };

  return <div>{renderCurrentPage()}</div>;
};

export default MeterlyApp;
