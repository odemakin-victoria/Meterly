import React, { ReactNode, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Lightbulb,
  Users,
 
  Fingerprint,
  X,
  Share,
} from "lucide-react";
import Image from "next/image";
import meterlyImage from "../../../public/assets/images/rafiki.svg";
import LogoImage from "../../../public/assets/images/meterly-img-long.png";
import ArrowBack from "../../../public/assets/images/ic_round-arrow-back.svg";
import keyIcon from "../../../public/assets/images/keyIcon2.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks/hook";
import { ErrorResponse, LogUserInResponse, OnboardUserAttribute, OnboardUserResponse, RegisterInResponse } from "@/redux/types/auth";
import { ForgetPassword, LoginUserIn, OnboardingUser, RegisterUserIn, ResendOtp, ValidateOtp } from "@/redux/thunk/auth";
import AlertModal from "@/components/Loader/Loader";
import { storeCookie } from "@/utils";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}
const MeterlyApp = () => {
			const router = useRouter();

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
  const updateFormData = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountSelect = (amount: any) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

	const handleNavigation = (path:string) => {
  router.push(path);
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
      <div className="flex-1  shadow-2xl overflow-hidden">{children}</div>
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
	
interface RegistrationData {
  email: string;
  requestId: string;
}
  const dispatch = useAppDispatch();
  const [alertState, setAlertState] = useState({
    loading: false,
    show: false,
    onConfirm: () => {
      setAlertState((prevState) => ({
        ...prevState,
        show: false,
      }));
    },
    onCancel: () => {},
    title: "",
    message: "",
    icon: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;

    return {
      hasCapital,
      hasNumber,
      hasSpecial,
      minLength,
      isValid: hasCapital && hasNumber && hasSpecial && minLength,
    };
  };

  // Update form data and validate
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate the field
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else {
          const validation = validatePassword(value);
          const missing = [];
          
          if (!validation.minLength) missing.push("at least 8 characters");
          if (!validation.hasCapital) missing.push("one capital letter");
          if (!validation.hasNumber) missing.push("one number");
          if (!validation.hasSpecial) missing.push("one special character");
          
          if (missing.length > 0) {
            error = `Password must contain ${missing.join(", ")}`;
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password).isValid;
    const confirmPasswordValid = formData.confirmPassword === formData.password && formData.confirmPassword !== "";
    
    return emailValid && passwordValid && confirmPasswordValid && 
           formData.email !== "" && formData.password !== "" && formData.confirmPassword !== "";
  };

  // Handle field blur to show validation
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

const RegisterAccount = async () => {
  // Validate all fields before submission
  Object.keys(formData).forEach(field => {
    validateField(field, formData[field as keyof typeof formData]);
    setTouched(prev => ({ ...prev, [field]: true }));
  });

  if (!isFormValid()) {
    setAlertState((prev) => ({
      ...prev,
      show: true,
      loading: false,
      title: "Please fix the errors before submitting",
      icon: "error",
    }));
    return;
  }

  try {
    setAlertState((prev) => ({
      ...prev,
      show: true,
      loading: true,
    }));

    const result = await dispatch(
      RegisterUserIn({
        email: formData.email,
        password: formData.password,
      })
    );

    const { meta, payload } = result;
    if (meta.requestStatus === "fulfilled") {
      let res = payload as RegisterInResponse;
      console.log(res, "This is a registration success");
      
      // Store the registration data for the verification page
      const registrationData: RegistrationData = {
        email: res.email,
        requestId: res.requestId
      };
      
      // You can pass this data via props, context, or localStorage
      // For now, I'll use localStorage as a simple solution
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      // Hide loading state
      setAlertState((prev) => ({
        ...prev,
        show: false,
        loading: false,
      }));
      
      setCurrentPage("verify-email");
    }

    if (meta.requestStatus === "rejected") {
      const errorObj = payload as ErrorResponse;
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: errorObj?.errorMsg || "Registration Failed",
        icon: "error",
      }));
      return;
    }
  } catch (error) {
    setAlertState((prev) => ({
      ...prev,
      show: true,
      loading: false,
      title: "Something went wrong. Please try again",
      icon: "error",
    }));
    throw error;
  }
};

  return (
    <Layout>
      <div className="h-screen bg-white flex flex-col">
        {/* Header */}

        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div>
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
                  onBlur={() => handleBlur("email")}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                    onChange={(e) => updateFormData("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent pr-12 transition-colors ${
                      touched.password && errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(() => {
                        const validation = validatePassword(formData.password);
                        return (
                          <>
                            <span className={validation.minLength ? "text-green-600" : "text-red-500"}>
                              ✓ 8+ characters
                            </span>
                            <span className={validation.hasCapital ? "text-green-600" : "text-red-500"}>
                              ✓ Capital letter
                            </span>
                            <span className={validation.hasNumber ? "text-green-600" : "text-red-500"}>
                              ✓ Number
                            </span>
                            <span className={validation.hasSpecial ? "text-green-600" : "text-red-500"}>
                              ✓ Special character
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
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
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent pr-12 transition-colors ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={RegisterAccount}
              disabled={!isFormValid()}
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg ${
                isFormValid()
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
      <AlertModal
        title={alertState.title}
        show={alertState.show}
        icon={alertState.icon}
        loading={alertState.loading}
        onConfirm={alertState.onConfirm}
      />
    </Layout>
  );
};

  const VerifyEmailPage = () => {
  const dispatch = useAppDispatch();
  
  // Get registration data from localStorage or props
  const [registrationData, setRegistrationData] = useState<{
    email: string;
    requestId: string;
  } | null>(null);

  const [alertState, setAlertState] = useState({
    loading: false,
    show: false,
    onConfirm: () => {
      setAlertState((prevState) => ({
        ...prevState,
        show: false,
      }));
    },
    onCancel: () => {},
    title: "",
    message: "",
    icon: "",
  });

  const [formData, setFormData] = useState({
    verificationCode: ["", "", "", "", "", ""],
  });

  const [resendTimer, setResendTimer] = useState(60); // Changed from 600 to 60 (1 minute)
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load registration data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    		console.log(storedData, "thsi verify is the data store in local storag eemail")

		if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setRegistrationData(parsed);
      } catch (error) {
        console.error('Error parsing registration data:', error);
        // Redirect back to registration if no valid data
        setCurrentPage("register");
      }
    } else {
      // Redirect back to registration if no data found
      setCurrentPage("register");
    }
  }, []);

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

  const updateFormData = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVerificationCode = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

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

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formData.verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-index="${index - 1}"]`
      ) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  const handleResend = async () => {
    if (!registrationData) {
      setAlertState({
        ...alertState,
        show: true,
        title: "Registration data not found",
        icon: "error",
        loading: false,
      });
      return;
    }

    try {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Resending OTP...",
      }));

      const result = await dispatch(
        ResendOtp({
          email: registrationData.email,
          requestId: registrationData.requestId,
        })
      );

      const { meta, payload } = result;
      if (meta.requestStatus === "fulfilled") {
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: "OTP sent successfully",
          icon: "success",
        }));
        
        setResendTimer(60); // Reset to 1 minute
        setCanResend(false);
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to resend OTP",
          icon: "error",
        }));
      }
    } catch (error) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!registrationData) {
      setAlertState({
        ...alertState,
        show: true,
        title: "Registration data not found",
        icon: "error",
        loading: false,
      });
      return;
    }

    // Check if all OTP fields are filled
    const otpCode = formData.verificationCode.join("");
    if (otpCode.length !== 6) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Please enter the complete 6-digit OTP",
        icon: "error",
      }));
      return;
    }

    try {
      setIsVerifying(true);
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Verifying OTP...",
      }));

      const result = await dispatch(
        ValidateOtp({
          requestId: registrationData.requestId,
          otp: otpCode,
        })
      );

      const { meta, payload } = result;
      if (meta.requestStatus === "fulfilled") {
        // Clear stored registration data
        
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: "Email verified successfully!",
          icon: "success",
        }));

        // Redirect to complete profile or next step
        setTimeout(() => {
          setCurrentPage("complete-profile");
        }, 1500);
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "OTP verification failed",
          icon: "error",
        }));
        
        // Clear the OTP fields on error
        updateFormData("verificationCode", ["", "", "", "", "", ""]);
      }
    } catch (error) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.slice(0, 2) + '*'.repeat(Math.max(localPart.length - 2, 1));
    const [domainName, tld] = domain.split('.');
    const maskedDomain = '*'.repeat(Math.max(domainName.length, 3));
    return `${maskedLocal}@${maskedDomain}.${tld}`;
  };

  // Check if OTP is complete
  const isOtpComplete = formData.verificationCode.every(digit => digit !== "");

  if (!registrationData) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div>
            <button
              onClick={() => setCurrentPage("register")}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img
                src={ArrowBack.src}
                alt="Back"
                className="w-6 h-6 object-contain rounded-lg"
              />
            </button>
          </div>
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-[#1679E8] mb-2">
              Verify Email
            </h1>

            <div className="flex flex-col items-center px-4 sm:px-2">
              <Image
                src={keyIcon}
                className="object-center object-contain my-4"
                alt="otp icon"
                width={50}
                height={50}
              />

              <p className="my-5 text-[#475569] text-center font-medium text-sm sm:text-base">
                A one-time password has been sent to your registered email
                address
                <span className="block text-[#000] font-semibold mt-1">
                  {maskEmail(registrationData.email)}
                </span>
              </p>

              <p className="text-[#00143D] font-medium mb-4 text-sm sm:text-base">
                Please enter the 6-digit code here:
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {formData.verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    data-index={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleVerificationCode(index, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 sm:w-14 h-12 sm:h-14 text-center text-lg font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200 transform focus:scale-105 bg-white"
                  />
                ))}
              </div>

              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                  Didn't receive an OTP?
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

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={!isOtpComplete || isVerifying}
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg ${
                isOtpComplete && !isVerifying
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        title={alertState.title}
        show={alertState.show}
        icon={alertState.icon}
        loading={alertState.loading}
        onConfirm={alertState.onConfirm}
      />
    </Layout>
  );
};
 const CompleteProfilePage = () => {
  const dispatch = useAppDispatch();
    // Get registration data from localStorage or props
  const [registrationData, setRegistrationData] = useState<{
    email: string;
    requestId: string;
  } | null>(null);
	 // Load registration data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
		console.log(storedData, "thsi is the data store in local storag eemail")
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setRegistrationData(parsed);
      } catch (error) {
        console.error('Error parsing registration data:', error);
        // Redirect back to registration if no valid data
        setCurrentPage("complete-profile");
      }
    } else {
      // Redirect back to registration if no data found
      setCurrentPage("complete-profile");
    }
  }, []);

  const [alertState, setAlertState] = useState({
    loading: false,
    show: false,
    onConfirm: () => {
      setAlertState((prevState) => ({
        ...prevState,
        show: false,
      }));
    },
    onCancel: () => {},
    title: "",
    message: "",
    icon: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    meterType: "",
    nin: "",
    distributionCompany: "",
    meterNumber: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    address: "",
    nin: "",
    distributionCompany: "",
    meterType: "",
    meterNumber: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    address: false,
    nin: false,
    distributionCompany: false,
    meterType: false,
    meterNumber: false,
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Full name must be at least 2 characters";
        }
        break;

      case "phone":
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!value) {
          error = "Phone number is required";
        } else if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          error = "Please enter a valid 10-11 digit phone number";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.trim().length < 10) {
          error = "Please enter a complete address";
        }
        break;

      case "nin":
        const ninRegex = /^[0-9]{11}$/;
        if (!value) {
          error = "NIN is required";
        } else if (!ninRegex.test(value)) {
          error = "NIN must be exactly 11 digits";
        }
        break;

      case "distributionCompany":
        if (!value) {
          error = "Please select a distribution company";
        }
        break;

      case "meterType":
        if (!value) {
          error = "Please select a meter type";
        }
        break;

      case "meterNumber":
        if (!value) {
          error = "Meter number is required";
        } else if (value.length < 8) {
          error = "Meter number must be at least 8 digits";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const isFormValid = () => {
    const requiredFields = [
      "fullName",
      "phone",
      "address",
      "nin",
      "distributionCompany",
      "meterType",
      "meterNumber",
    ];

    // Check if all fields are filled and have no errors
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field as keyof typeof formData].trim() !== ""
    );

    const noErrors = Object.values(errors).every((error) => error === "");

    return allFieldsFilled && noErrors;
  };

  const handleProceed = () => {
    // Validate all fields before showing confirmation
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    if (!isFormValid()) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Please fix the errors before proceeding",
        icon: "error",
      }));
      return;
    }

    setShowConfirmation(true);
  };

 const handleConfirmOnboarding = async () => {
  try {
    setShowConfirmation(false);
    setAlertState((prev) => ({
      ...prev,
      show: true,
      loading: true,
      title: "Completing your profile...",
    }));

    // Debug: Check if registrationData exists and has email
    console.log("Registration data:", registrationData);
    
    if (!registrationData?.email) {
      throw new Error("No email found in registration data");
    }

    // Prepare the payload according to the API interface
    const onboardPayload: OnboardUserAttribute = {
      token: btoa(registrationData.email), // Convert email to base64 string
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      nin: formData.nin.trim(),
      address: formData.address.trim(),
      meter: {
        meterNumber: formData.meterNumber.trim(),
        meterName: formData.fullName.trim(),
        meterAddress: formData.address.trim(),
        meterType: formData.meterType,
        disco: formData.distributionCompany,
      },
    };

    // Debug: Log the token being sent
    // console.log("Token being sent:", onboardPayload.token);
    console.log("Original email:", registrationData.email);
    console.log("Base64 token:", btoa(registrationData.email));

    const result = await dispatch(OnboardingUser(onboardPayload));

    const { meta, payload } = result;
    if (meta.requestStatus === "fulfilled") {
      const res = payload as OnboardUserResponse;
      console.log(res, "Onboarding successful");
        localStorage.removeItem('registrationData');

      // Store access token and user info
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("fullName", res.user.fullName || formData.fullName);
      
      // Clear registration data as user is now fully onboarded
      localStorage.removeItem("registrationData");

      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Profile completed successfully!",
        icon: "success",
      }));

      // Redirect to success page
      setTimeout(() => {
        setCurrentPage("registration-success");
      }, 2000);
    }

    if (meta.requestStatus === "rejected") {
      const errorObj = payload as ErrorResponse;
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: errorObj?.errorMsg || "Failed to complete profile",
        icon: "error",
      }));
    }
  } catch (error) {
    console.error("Error in handleConfirmOnboarding:", error);
    setAlertState((prev) => ({
      ...prev,
      show: true,
      loading: false,
      title: "Something went wrong. Please try again",
      icon: "error",
    }));
  }
};

  const getDistributionCompanyName = (value: string) => {
    const companies = {
      aedc: "Abuja Electricity Distribution Company (AEDC)",
      eko: "Eko Electricity Distribution Company (EKEDC)",
      ibadan: "Ibadan Electricity Distribution Company (IBEDC)",
      ikeja: "Ikeja Electric Plc (IKEDC)",
    };
    return companies[value as keyof typeof companies] || value;
  };

  const getMeterTypeName = (value: string) => {
    const types = {
      prepaid: "Prepaid",
      postpaid: "Postpaid",
      smart: "Smart Meter",
    };
    return types[value as keyof typeof types] || value;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <button
            onClick={() => setCurrentPage("verify-email")}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img
              src={ArrowBack.src}
              alt="Back"
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
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    touched.fullName && errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

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
                    onBlur={() => handleBlur("phone")}
                    className={`flex-1 text-sm px-4 py-3 bg-gray-50 border rounded-r-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                      touched.phone && errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your Address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    touched.address && errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
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
                  onBlur={() => handleBlur("nin")}
                  maxLength={11}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    touched.nin && errors.nin
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {touched.nin && errors.nin && (
                  <p className="text-red-500 text-sm mt-1">{errors.nin}</p>
                )}
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
                  onChange={(e) => updateFormData("distributionCompany", e.target.value)}
                  onBlur={() => handleBlur("distributionCompany")}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent appearance-none transition-colors ${
                    touched.distributionCompany && errors.distributionCompany
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="AEDC">
                    Abuja Electricity Distribution Company (AEDC)
                  </option>
                  <option value="EKEDC">
                    Eko Electricity Distribution Company (EKEDC)
                  </option>
                  <option value="IBEDC">
                    Ibadan Electricity Distribution Company (IBEDC)
                  </option>
                  <option value="IKEDC">Ikeja Electric Plc (IKEDC)</option>
                </select>
                {touched.distributionCompany && errors.distributionCompany && (
                  <p className="text-red-500 text-sm mt-1">{errors.distributionCompany}</p>
                )}
              </div>

              {/* Meter Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Meter Type:
                </label>
                <select
                  value={formData.meterType}
                  onChange={(e) => updateFormData("meterType", e.target.value)}
                  onBlur={() => handleBlur("meterType")}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent appearance-none transition-colors ${
                    touched.meterType && errors.meterType
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                  <option value="smart">Smart Meter</option>
                </select>
                {touched.meterType && errors.meterType && (
                  <p className="text-red-500 text-sm mt-1">{errors.meterType}</p>
                )}
              </div>

              {/* Meter Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Meter Number:
                </label>
                <input
                  type="text"
                  placeholder="Enter your Meter number"
                  value={formData.meterNumber}
                  onChange={(e) => updateFormData("meterNumber", e.target.value)}
                  onBlur={() => handleBlur("meterNumber")}
                  className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    touched.meterNumber && errors.meterNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                />
                {touched.meterNumber && errors.meterNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.meterNumber}</p>
                )}
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
              disabled={!isFormValid()}
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors mt-12 shadow-lg ${
                isFormValid()
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1679E8] mb-4 text-center">
                Meter Information
              </h2>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Please click proceed, if you have your appropriate information displayed
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Meter Number:</span>
                  <span className="text-gray-900">{formData.meterNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Name:</span>
                  <span className="text-gray-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-900 text-right text-sm">
                    {formData.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">House Number:</span>
                  <span className="text-gray-900">--</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-900">+234{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Meter Type:</span>
                  <span className="text-gray-900">{getMeterTypeName(formData.meterType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">DISCO:</span>
                  <span className="text-gray-900 text-right text-xs">
                    {getDistributionCompanyName(formData.distributionCompany)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOnboarding}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        title={alertState.title}
        show={alertState.show}
        icon={alertState.icon}
        loading={alertState.loading}
        onConfirm={alertState.onConfirm}
      />
    </Layout>
  );
};

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

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [alertState, setAlertState] = useState({
    loading: false,
    show: false,
    onConfirm: () => {
      setAlertState((prevState) => ({
        ...prevState,
        show: false,
      }));
    },
    onCancel: () => {},
    title: "",
    message: "",
    icon: "",
  });

  // New state for forgot password modal
  const [forgotPasswordState, setForgotPasswordState] = useState({
    show: false,
    email: "",
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateFormData = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle forgot password modal
  const handleForgotPasswordClick = () => {
    setForgotPasswordState((prev) => ({
      ...prev,
      show: true,
      email: formData.email, // Pre-fill with login email if available
    }));
  };

  const handleForgotPasswordSubmit = async () => {
    if (!forgotPasswordState.email.trim()) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Please enter your email address",
        icon: "error",
      }));
      return;
    }

    try {
      setForgotPasswordState((prev) => ({ ...prev, loading: true }));

      const result = await dispatch(
        ForgetPassword({
          email: forgotPasswordState.email,
        })
      );

      const { meta, payload } = result;
      
      if (meta.requestStatus === "fulfilled") {
        // Close forgot password modal
        setForgotPasswordState({
          show: false,
          email: "",
          loading: false,
        });
        
        // Show success alert
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: "Password reset email sent successfully!",
          message: "Please check your email for password reset instructions.",
          icon: "success",
        }));
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setForgotPasswordState((prev) => ({ ...prev, loading: false }));
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to send reset email",
          icon: "error",
        }));
      }
    } catch (error) {
      setForgotPasswordState((prev) => ({ ...prev, loading: false }));
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
    }
  };

  const closeForgotPasswordModal = () => {
    setForgotPasswordState({
      show: false,
      email: "",
      loading: false,
    });
  };

  const LoginUserAccount = async () => {
    try {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
      }));

      const result = await dispatch(
        LoginUserIn({
          email: formData.email,
          password: formData.password,
          deviceType: "WEB",
        })
      );

      const { meta, payload } = result;
      if (meta.requestStatus === "fulfilled") {
        let res = payload as LogUserInResponse;
        console.log(res, "This is a login");
	
        				storeCookie("MET_AT", res.accessToken);
				storeCookie("MET_RT", res.refreshToken);
				storeCookie("MET_FN", res.user.fullName);
								storeCookie("MET_EMAIL", res.user.email);


        handleNavigation("/dashboard");
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Login Failed",
          icon: "error",
        }));
      }
    } catch (error) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
      throw error;
    }
  };

  // ✅ You must return JSX here
  return (
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
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      updateFormData("password", e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16"
                  />
                  <button
                    type="button"
                    className="absolute right-12 top-1/2 transform -translate-y-1/2"
                  >
                    <Fingerprint className="w-6 h-6 text-blue-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button 
                    onClick={handleForgotPasswordClick}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Forgot your Password?
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={LoginUserAccount}
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

      {/* Forgot Password Modal */}
      {forgotPasswordState.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Reset Password
              </h2>
              <button
                onClick={closeForgotPasswordModal}
                className="text-gray-400 hover:text-gray-600"
                disabled={forgotPasswordState.loading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address:
              </label>
              <input
                type="email"
                value={forgotPasswordState.email}
                onChange={(e) => setForgotPasswordState(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={forgotPasswordState.loading}
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={closeForgotPasswordModal}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                disabled={forgotPasswordState.loading}
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPasswordSubmit}
                disabled={forgotPasswordState.loading}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {forgotPasswordState.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Reset Email'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        title={alertState.title}
        show={alertState.show}
        icon={alertState.icon}
        loading={alertState.loading}
        onConfirm={alertState.onConfirm}
        message={alertState.message}
      />
    </Layout>
  );
};

 


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
  
      case "login":
        return <LoginPage />;
    
      default:
        return <WelcomePage />;
    }
  };

  return <div>{renderCurrentPage()}</div>;
};

export default MeterlyApp;
