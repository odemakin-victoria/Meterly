import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Zap, 
  HelpCircle, 
  User, 
  Bell, 
  Eye, 
  EyeOff, 
LogOut,
  ArrowLeft,
  Settings,
  CreditCard,
  Shield,
  Moon,
  Sun,
  MessageSquare,
  Lock,
  Edit3,
  Plus,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { useRouter } from "next/router";
import Image from "next/image";
import { returnCookie } from "@/utils";

import pictureImage from "../../../public/assets/images/Rectangle 49.png";
import CurvrBack from "../../../public/assets/images/Rectangle 6.png";
import AlertModal from '@/components/Loader/Loader';
import { FetchUserProfile, ResendOtp, ValidateOtp } from '@/redux/thunk/auth';
import { ElectricityMeter, ErrorResponse, ProfileUserResponse } from '@/redux/types/auth';
import { useAppDispatch } from '@/redux/hooks/hook';
import { AddMeter, RemoveUserMeter } from '@/redux/thunk/meterMeter';
import { AddUserMeterAttribute, AddUserMeterResponse, RemoveUserMeterResponse } from '@/redux/types/meter-management';
import BottomNavigation from '@/components/Navigation/BottomNavigation';


const AccountDashboard = () => {
  const [currentPage, setCurrentPage] = useState('account');
  const [activeTab, setActiveTab] = useState('home');
			const router = useRouter();

  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
   const [selectedMeter, setSelectedMeter] = useState<ElectricityMeter | null>(
    null
  );
  // Meter management states
  const [meterAction, setMeterAction] = useState(''); // 'add' or 'remove'
  const [newMeterNumber, setNewMeterNumber] = useState('');
  const [selectedDisco, setSelectedDisco] = useState('Ikeja Electric');
  const [showMeterConfirmation, setShowMeterConfirmation] = useState(false);
  const [meterConfirmationData, setMeterConfirmationData] = useState(null);
  const [userProfile, setUserProfile] = useState({
		fullName: "",
		email: "",
		phone:"",
		electricityMeters: [] as ElectricityMeter[],
		loading: true,
	});
  // OTP and verification states
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(59);
  
  // Change password states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [emailForReset, setEmailForReset] = useState(userProfile.email);
  const [resetCode, setResetCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);


	

  // Timer for resend code
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if ((showOtpVerification || showPasswordReset) && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, showOtpVerification, showPasswordReset]);

  // Password validation
  const validatePassword = (password:string) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter');
    if (!/\d/.test(password)) errors.push('At least one number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('At least one special character');
    return errors;
  };

  useEffect(() => {
    setPasswordErrors(validatePassword(newPassword));
  }, [newPassword]);

  const handleOtpChange = (index:any, value:any, isReset = false) => {
    if (value.length <= 1) {
      const newOtp = isReset ? [...resetCode] : [...otpCode];
      newOtp[index] = value;
      
      if (isReset) {
        setResetCode(newOtp);
      } else {
        setOtpCode(newOtp);
      }
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`${isReset ? 'reset-' : ''}otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleMeterAction = (action:any) => {
    setMeterAction(action);
    if (action === 'add') {
      setCurrentPage('addMeter');
    } else {
      setCurrentPage('removeMeter');
    }
  };

  const handleMeterSubmit = () => {
    if (meterAction === 'add' && newMeterNumber) {
    
      setMeterConfirmationData(confirmationData);
      setShowMeterConfirmation(true);
    }
  };

  const proceedWithMeter = () => {
    setShowMeterConfirmation(false);
    setShowOtpVerification(true);
    setResendTimer(59);
  };

  const verifyOtp = () => {
    const code = otpCode.join('');
    if (code.length === 4) {
      // Handle OTP verification
      if (meterAction === 'add') {
        // Add meter to profile
        const newMeter = {
          id: Date.now(),
          meterNumber: newMeterNumber,
          meterName: `Meter ${userProfile.electricityMeters.length + 1}`,
          disco: selectedDisco,
          meterAddress: "New meter address"
        };
        setUserProfile(prev => ({
          ...prev,
          electricityMeters: [...prev.electricityMeters, newMeter]
        }));
      }
      // Reset states
      setShowOtpVerification(false);
      setMeterAction('');
      setNewMeterNumber('');
      setOtpCode(['', '', '', '']);
      setCurrentPage('account');
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setCurrentPage('changePassword');
  };

  const handlePasswordResetRequest = () => {
    setShowChangePassword(false);
    setShowPasswordReset(true);
    setResendTimer(59);
  };

  const handlePasswordReset = () => {
    const code = resetCode.join('');
    if (code.length === 4 && newPassword && confirmPassword) {
      if (newPassword === confirmPassword && passwordErrors.length === 0) {
        // Handle password reset
        alert('Password changed successfully!');
        setShowPasswordReset(false);
        setResetCode(['', '', '', '']);
        setNewPassword('');
        setConfirmPassword('');
        setCurrentPage('account');
      } else if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
      }
    }
  };

  const handleNavigation = (page: React.SetStateAction<string>) => {
    setActiveTab(page);
    if (page === 'account') {
      setCurrentPage('account');
    } 
  };

const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };



const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  			const router = useRouter();

  
	
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
		 


  // Fetch user profile when component mounts
 useEffect(() => {
		 const fetchProfile = async () => {
				 try {
						 setAlertState((prev) => ({
								 ...prev,
								 show: true,
								 loading: true,
						 }));
						 const result = await dispatch(FetchUserProfile());
						 const { meta, payload } = result;
						 
						 if (meta.requestStatus === "fulfilled") {
								 const profileData = payload as ProfileUserResponse;
								 console.log(profileData, "this is a profile");
								 const meters = profileData.electricityMeters || [];
 
								 setUserProfile({
										 fullName: profileData.fullName || "User",
										 email: profileData.email || "",
										 phone:profileData.phone|| "",
										 electricityMeters: profileData.electricityMeters || [],
										 loading: false,
								 });
 
								 // Set the selected meter at the parent level
								 if (meters.length > 0) {
										 setSelectedMeter(meters[0]); // This sets it in the parent MeterlyApp component
								 }
 
								 setAlertState((prev) => ({
										 ...prev,
										 show: false,
										 loading: false,
								 }));
						 }
						 
						 if (meta.requestStatus === "rejected") {
								 const errorObj = payload as ErrorResponse;
								 const storedName = localStorage.getItem("fullName") || "User";
								 setUserProfile({
										 fullName: storedName,
										 email: "",
										 phone:"",
										 electricityMeters: [],
										 loading: false,
								 });
								 setAlertState((prev) => ({
										 ...prev,
										 show: true,
										 loading: false,
										 title: errorObj?.errorMsg || "Registration Failed",
										 icon: "error",
								 }));
								 console.error("Failed to fetch user profile:", payload);
						 }
				 } catch (error) {
						 const storedName = localStorage.getItem("fullName") || "User";
						 setUserProfile({
								 fullName: storedName,
								 email: "",
								 phone:"",
								 electricityMeters: [],
								 loading: false,
						 });
						 console.error("Error fetching user profile:", error);
				 }
		 };
 
		 // Only fetch if we haven't loaded the profile yet
		 if (userProfile.loading) {
				 fetchProfile();
		 }
 }, [dispatch]); 
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleChangePassword = () => {
    // Add your change password logic here
    console.log('Change password clicked');
  };



  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header with Curved Background */}
      <div className="relative">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
     
        />
        
        {/* Blue Curved Overlay */}
        <div 
          className="relative bg-gradient-to-br from-blue-400 to-blue-600 px-4 lg:px-8 xl:px-16 2xl:px-32 py-6 pb-16"
          style={{
            clipPath: 'ellipse(100% 100% at 50% 0%)',
            minHeight: '280px',
          }}
        >
          <div className="flex items-center justify-center relative z-10 pt-8">
            <div className="relative">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Image
                  src={CurvrBack}
                  alt="Profile Avatar"
                  className="w-20 lg:w-24 object-contain rounded-lg"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
					 <div className="text-center mt-4 relative z-10">
            <h2 className="text-xl lg:text-3xl font-bold text-white drop-shadow-lg">
              {userProfile.fullName}
            </h2>
            <p className="text-sm lg:text-base text-white/90 drop-shadow">
              {userProfile.email} {userProfile.phone && `| ${userProfile.phone}`}
            </p>
				
          </div>

         
        </div>
      </div>

        {/* Content Area */}
        <div className="px-4 lg:px-8 xl:px-16 2xl:px-32 mt-10 relative z-20 space-y-4 pb-20 lg:pb-6">
          {/* Manage Meter Button */}
          <button
          onClick={() => setCurrentPage('manageMeter')}
             className="w-full bg-white rounded-2xl p-4 lg:p-6 flex items-center space-x-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-[#1679E8]">Manage Meter</h3>
              <p className="text-sm text-gray-600">
                Add or remove meter details from your account
                {userProfile.electricityMeters.length > 0 && (
                  <span className="text-blue-600 font-medium">
                    {` (${userProfile.electricityMeters.length} meter${userProfile.electricityMeters.length > 1 ? 's' : ''})`}
                  </span>
                )}
              </p>
            </div>
          </button>

          {/* First block - 5 items */}
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden w-full">
            {/* Edit profile information */}
            <button className="w-full p-4 lg:p-6 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Edit profile information</span>
              </div>
            </button>

            {/* Notifications */}
            <button 
              onClick={toggleNotifications}
              className="w-full p-4 lg:p-6 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${notifications ? 'text-blue-600' : 'text-gray-400'}`}>
                  {notifications ? 'ON' : 'OFF'}
                </span>
                <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                  notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                    notifications ? 'right-0.5 transform translate-x-0' : 'left-0.5'
                  }`}></div>
                </div>
              </div>
            </button>

            {/* Change Password */}
            <button
              onClick={handleChangePassword}
              className="w-full p-4 lg:p-6 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Change Password</span>
              </div>
            </button>

            {/* Theme */}
            <button 
              onClick={toggleTheme}
              className="w-full p-4 lg:p-6 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  {theme === 'light' ? (
                    <Sun className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Moon className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <span className="font-medium text-gray-900">Theme</span>
              </div>
              <span className="text-sm text-blue-600 font-medium">
                {theme === 'light' ? 'Light mode' : 'Dark mode'}
              </span>
            </button>

            {/* Manage Saved Cards */}
            <button className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Manage Saved Cards</span>
              </div>
            </button>
          </div>

          {/* Second block - 3 items */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full">
            <button className="w-full p-4 lg:p-6 flex items-center space-x-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Help & Support</span>
            </button>

            <button className="w-full p-4 lg:p-6 flex items-center space-x-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Contact us</span>
            </button>

            <button className="w-full p-4 lg:p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Privacy policy</span>
            </button>
					<button
  onClick={() => router.push("/landing-page")}
  className="w-full p-4 lg:p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
>
  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
    <LogOut className="w-6 h-6 text-blue-600" />
  </div>
  <span className="font-medium text-gray-900">Log Out</span>
</button>

          </div>
        </div>

        <AlertModal
          title={alertState.title}
          show={alertState.show}
          icon={alertState.icon}
          loading={alertState.loading}
          onConfirm={alertState.onConfirm}
          message={alertState.message}
        />
      </div>
									)}

  // Manage Meter Screen
  const ManageMeterScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setCurrentPage('account')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Manage Meter</h1>
      </div>
      
      <div className="p-6">
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={() => handleMeterAction('add')}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold"
          >
            Add Meter details
          </button>
          <button 
            onClick={() => handleMeterAction('remove')}
            className="flex-1 bg-white border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-semibold"
          >
            Remove Meter Details
          </button>
        </div>
        
        <p className="text-gray-600 text-center">
          Please provide the correct and appropriate information.
        </p>
      </div>
    </div>
  );

const AddMeterScreen = () => {
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

  const [formData, setFormData] = useState({
    meterName: "",
    meterAddress: "",
    meterType: "",
    distributionCompany: "",
    meterNumber: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({
    meterName: "",
    meterAddress: "",
    distributionCompany: "",
    meterType: "",
    meterNumber: "",
  });

  const [touched, setTouched] = useState({
    meterName: false,
    meterAddress: false,
    distributionCompany: false,
    meterType: false,
    meterNumber: false,
  });

  // States for confirmation and OTP flow
  const [meterConfirmationData, setMeterConfirmationData] = useState(null);
  const [showMeterConfirmation, setShowMeterConfirmation] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']); // 6 digits
  const [resendTimer, setResendTimer] = useState(0);
  const [requestId, setRequestId] = useState(''); // Store requestId from OTP API
  const [isVerifying, setIsVerifying] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "meterName":
        if (!value.trim()) {
          error = "Meter name is required";
        } else if (value.trim().length < 2) {
          error = "Meter name must be at least 2 characters";
        }
        break;

      case "meterAddress":
        if (!value.trim()) {
          error = "Meter Address is required";
        } else if (value.trim().length < 10) {
          error = "Please enter a complete address";
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

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const isFormValid = () => {
    const requiredFields = [
      "meterName",
      "meterAddress",
      "distributionCompany",
      "meterType",
      "meterNumber",
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    const noErrors = Object.values(errors).every((error) => error === "");

    return allFieldsFilled && noErrors;
  };

  const handleProceed = () => {
    // Validate all fields before showing confirmation
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
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

    // Set confirmation data and show confirmation screen
    const confirmationData = {
      meterNumber: formData.meterNumber,
      name: formData.meterName,
      address: formData.meterAddress,
      phone: "User's phone from context/cookie", // You'll need to get this from your app state
      houseNumber: "Extract from address or add field", // You might need to add this field
    };

    setMeterConfirmationData(confirmationData);
    setShowMeterConfirmation(true);
  };

  // Function to generate GUID
  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Function to proceed from confirmation to OTP
  // const proceedWithMeter = async () => {
  //   try {
  //     setShowMeterConfirmation(false);
     
  //     // Show loading alert
  //     setAlertState((prev) => ({
  //       ...prev,
  //       show: true,
  //       loading: true,
  //       title: "Sending verification code...",
  //     }));

  //     // Get email from cookie (you'll need to implement this)
  //     const userEmail = (await returnCookie("MET_EMAIL")) || "";
  //     const generatedRequestId = generateGUID();

  //     // Call ResendOtp API
  //     const otpPayload = {
  //       email: userEmail,
  //       requestId: generatedRequestId
  //     };

  //     const result = await dispatch(ResendOtp(otpPayload));
      
  //     if (result.meta.requestStatus === "fulfilled") {
  //       // Store requestId for later use
  //       setRequestId(generatedRequestId);
        
  //       // Hide loading alert
  //       setAlertState((prev) => ({
  //         ...prev,
  //         show: false,
  //       }));
        
  //       // Show OTP verification screen
  //       setShowOtpVerification(true);
  //       setResendTimer(59);
  //     } else {
  //       // Handle error
  //       const errorObj = result.payload;
  //       setAlertState((prev) => ({
  //         ...prev,
  //         show: true,
  //         loading: false,
  //         title: errorObj?.errorMsg || "Failed to send verification code",
  //         icon: "error",
  //       }));
  //     }
  //   } catch (error) {
  //     setAlertState((prev) => ({
  //       ...prev,
  //       show: true,
  //       loading: false,
  //       title: "Something went wrong. Please try again",
  //       icon: "error",
  //     }));
  //   }
  // };

  // Timer effect for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    // Check if OTP is complete
    const otpString = otpCode.join('');
    if (otpString.length !== 6) {
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
          requestId: requestId,
          otp: otpString,
        })
      );

      const { meta, payload } = result;
      if (meta.requestStatus === "fulfilled") {
        // Hide loading alert
        setAlertState((prev) => ({
          ...prev,
          show: false,
        }));

        // Call AddUserMeter after successful OTP verification
        await AddUserMeter();
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "OTP verification failed",
          icon: "error",
        }));
        
        // Clear the OTP fields on error
        setOtpCode(['', '', '', '', '', '']);
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

  // Function to add meter after OTP verification
  const AddUserMeter = async () => {
    try {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Adding meter...",
      }));

      // Now proceed with adding the meter after OTP verification
      const onboardPayload = {
        meterNumber: formData.meterNumber.trim(),
        meterName: formData.meterName.trim(),
        meterAddress: formData.meterAddress.trim(),
        meterType: formData.meterType,
        disco: formData.distributionCompany,
      };

      const result = await dispatch(AddMeter(onboardPayload));

      if (result.meta.requestStatus === "fulfilled") {
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: "Meter added successfully!",
          icon: "success",
          onConfirm: () => {
            setAlertState((prevState) => ({
              ...prevState,
              show: false,
            }));
            // Navigate to success page
            setCurrentPage("registration-success");
          },
        }));

        // Reset form data
        setFormData({
          meterName: "",
          meterAddress: "",
          meterType: "",
          distributionCompany: "",
          meterNumber: "",
        });
        
        // Reset other states
        setShowOtpVerification(false);
        setOtpCode(['', '', '', '', '', '']);
        setRequestId('');
      } else {
        const errorObj = result.payload;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to add meter",
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

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return; // Prevent resend if timer is active

    try {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Resending verification code...",
      }));

      const userEmail = (await returnCookie("MET_EMAIL")) || "";
      const newRequestId = generateGUID();

      const otpPayload = {
        email: userEmail,
        requestId: newRequestId
      };

      const result = await dispatch(ResendOtp(otpPayload));
      
      if (result.meta.requestStatus === "fulfilled") {
        setRequestId(newRequestId);
        setAlertState((prev) => ({
          ...prev,
          show: false,
        }));
        setResendTimer(59);
        // Clear previous OTP
        setOtpCode(['', '', '', '', '', '']);
      } else {
        const errorObj = result.payload;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to resend verification code",
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

  // Render OTP Verification Screen
  const OtpVerificationScreen = () => {
    return(
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white px-4 py-6 border-b flex items-center">
          <button onClick={() => setShowOtpVerification(false)} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </button>
          <h1 className="text-xl font-bold text-blue-600">Verify Email</h1>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-8">
            <p className="text-gray-700 mb-2">
              A Code has been sent to your email
            </p>
            <p className="text-gray-700">
              Enter the 6-digit code to verify your account.
            </p>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-4">
              Enter Code
            </label>
            <div className="flex space-x-3 justify-center">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-16 h-16 border-2 border-gray-200 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Didn't Receive Code?</p>
            {resendTimer > 0 ? (
              <p className="text-gray-500">Resend code in 00:{resendTimer.toString().padStart(2, '0')}</p>
            ) : (
              <button 
                onClick={handleResendOtp}
                className="text-blue-600 font-semibold"
              >
                Resend Code
              </button>
            )}
          </div>
          
          <button
            onClick={handleVerifyOtp}
            disabled={isVerifying}
            className={`w-full py-4 rounded-xl font-semibold ${
              isVerifying 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </div>
        <AlertModal
          title={alertState.title}
          show={alertState.show}
          icon={alertState.icon}
          loading={alertState.loading}
          onConfirm={alertState.onConfirm}
          message={alertState.message}
        />
      </div>
    )
  };

  // Render Meter Confirmation Screen
  const MeterConfirmationScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setShowMeterConfirmation(false)} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Complete your profile</h1>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6">
          Please double-check the information and confirm if it's appropriate.
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-lg font-semibold">Meter Information</h2>
            <p className="text-sm text-blue-100">
              Please click proceed, if you have your appropriate information displayed
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Meter Number:</span>
              <span className="font-semibold">{meterConfirmationData?.meterNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold">{meterConfirmationData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-semibold text-right flex-1 ml-4">
                {meterConfirmationData?.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meter Type:</span>
              <span className="font-semibold">{formData.meterType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distribution Company:</span>
              <span className="font-semibold">{formData.distributionCompany}</span>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <button
              onClick={AddUserMeter}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
            >
              Proceed
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
        message={alertState.message}
      />
    </div>
  );

  // Show OTP verification if active
  if (showOtpVerification) {
    return <OtpVerificationScreen />;
  }

  // Show confirmation if active
  if (showMeterConfirmation) {
    return <MeterConfirmationScreen />;
  }

  // Main form render
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setCurrentPage('manageMeter')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Add Meter Details</h1>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Meter Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Meter Name
            </label>
            <input
              type="text"
              placeholder="Enter your meter name"
              value={formData.meterName}
              onChange={(e) => updateFormData("meterName", e.target.value)}
              onBlur={() => handleBlur("meterName")}
              className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                touched.meterName && errors.meterName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {touched.meterName && errors.meterName && (
              <p className="text-red-500 text-sm mt-1">{errors.meterName}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your Meter Address"
              value={formData.meterAddress}
              onChange={(e) => updateFormData("meterAddress", e.target.value)}
              onBlur={() => handleBlur("meterAddress")}
              className={`w-full text-sm px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                touched.meterAddress && errors.meterAddress
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {touched.meterAddress && errors.meterAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.meterAddress}</p>
            )}
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
              <option value="IE">Ikeja Electric Plc (IE)</option>
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

      {/* Alert Modal */}
      <AlertModal
        title={alertState.title}
        show={alertState.show}
        icon={alertState.icon}
        loading={alertState.loading}
        onConfirm={alertState.onConfirm}
        message={alertState.message}
      />
    </div>
  );
};

  // Remove Meter Screen
const RemoveMeterScreen = () => {
  const dispatch = useAppDispatch();
  const [selectedMeter, setSelectedMeter] = useState('');

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

  const RemoveSingleMeter = async () => {
    if (!selectedMeter) {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Please select a meter to remove",
        icon: "warning",
      }));
      return;
    }

    try {
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Removing meter...",
        icon: "loading",
      }));

      const result = await dispatch(
        RemoveUserMeter({
          meterId: selectedMeter, // Fixed: Added the selectedMeter value
        })
      );

      const { meta, payload } = result;
      
      if (meta.requestStatus === "fulfilled") {
        let res = payload as RemoveUserMeterResponse;
        console.log(res, "Meter removed successfully");

        // Update local state to remove the meter from UI
        setUserProfile(prev => ({
          ...prev,
          electricityMeters: prev.electricityMeters.filter(m => m.id !== selectedMeter)
        }));

        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: "Meter removed successfully!",
          icon: "success",
          onConfirm: () => {
            setAlertState((prevState) => ({
              ...prevState,
              show: false,
            }));
            handleNavigation("/account"); // Navigate after success
          },
        }));

        setSelectedMeter(''); // Clear selection
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to remove meter",
          icon: "error",
        }));
      }
    } catch (error) {
      console.error("Error removing meter:", error);
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setCurrentPage('manageMeter')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Remove Meter Details</h1>
      </div>
      
      <div className="p-6 space-y-6">
        <p className="text-gray-600">Select a meter to remove:</p>
        
        <div className="space-y-3">
          {userProfile.electricityMeters.map((meter) => (
            <div 
              key={meter.id}
              className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                selectedMeter === meter.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMeter(meter.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{meter.meterName}</p>
                  <p className="text-sm text-gray-600">{meter.meterNumber}</p>
                  <p className="text-xs text-gray-500">{meter.disco}</p>
                </div>
                {selectedMeter === meter.id && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={RemoveSingleMeter} // Fixed: Call the API function instead of inline logic
          disabled={!selectedMeter || alertState.loading}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {alertState.loading ? "Removing..." : "Remove Selected Meter"}
        </button>
      </div>

      {/* Alert/Modal component would go here */}
      {alertState.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4">
            <div className="text-center">
              {alertState.loading && <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>}
              <h3 className="text-lg font-semibold mb-2">{alertState.title}</h3>
              {!alertState.loading && (
                <button
                  onClick={alertState.onConfirm}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  // Meter Confirmation Screen
  // const MeterConfirmationScreen = () => (
  //   <div className="min-h-screen bg-gray-50 pb-20">
  //     <div className="bg-white px-4 py-6 border-b flex items-center">
  //       <button onClick={() => setShowMeterConfirmation(false)} className="mr-4">
  //         <ArrowLeft className="w-6 h-6 text-blue-600" />
  //       </button>
  //       <h1 className="text-xl font-bold text-blue-600">Complete your profile</h1>
  //     </div>
      
  //     <div className="p-6">
  //       <p className="text-gray-600 mb-6">
  //         Please double-check the information and appropriate information.
  //       </p>
        
  //       {/* Modal-like confirmation card */}
  //       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
  //         <div className="bg-blue-600 text-white px-6 py-4">
  //           <h2 className="text-lg font-semibold">Meter Information</h2>
  //           <p className="text-sm text-blue-100">
  //             Please click proceed, if you have your appropriate information displayed
  //           </p>
  //         </div>
          
  //         <div className="p-6 space-y-4">
  //           <div className="flex justify-between">
  //             <span className="text-gray-600">Meter Number:</span>
  //             <span className="font-semibold">{meterConfirmationData?.meterNumber}</span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span className="text-gray-600">Name:</span>
  //             <span className="font-semibold">{meterConfirmationData?.name}</span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span className="text-gray-600">Address:</span>
  //             <span className="font-semibold text-right flex-1 ml-4">
  //               {meterConfirmationData?.address}
  //             </span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span className="text-gray-600">Phone Number:</span>
  //             <span className="font-semibold">{meterConfirmationData?.phone}</span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span className="text-gray-600">House Number:</span>
  //             <span className="font-semibold">{meterConfirmationData?.houseNumber}</span>
  //           </div>
  //         </div>
          
  //         <div className="px-6 pb-6">
  //           <button
  //             onClick={proceedWithMeter}
  //             className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
  //           >
  //             Proceed
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // OTP Verification Screen
  // const OtpVerificationScreen = () => (
  //   <div className="min-h-screen bg-gray-50 pb-20">
  //     <div className="bg-white px-4 py-6 border-b flex items-center">
  //       <button onClick={() => setShowOtpVerification(false)} className="mr-4">
  //         <ArrowLeft className="w-6 h-6 text-blue-600" />
  //       </button>
  //       <h1 className="text-xl font-bold text-blue-600">Verify Phone Number</h1>
  //     </div>
      
  //     <div className="p-6">
  //       <div className="text-center mb-8">
  //         <p className="text-gray-700 mb-2">
  //           A Code has been sent to your phone
  //         </p>
  //         <p className="text-gray-700">
  //           <span className="font-bold">*******647.</span> Enter the code to verify your account.
  //         </p>
  //       </div>
        
  //       <div className="mb-8">
  //         <label className="block text-gray-700 text-sm font-medium mb-4">
  //           Enter Code
  //         </label>
  //         <div className="flex space-x-3 justify-center">
  //           {otpCode.map((digit, index) => (
  //             <input
  //               key={index}
  //               id={`otp-${index}`}
  //               type="text"
  //               maxLength="1"
  //               value={digit}
  //               onChange={(e) => handleOtpChange(index, e.target.value)}
  //               className="w-16 h-16 border-2 border-gray-200 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             />
  //           ))}
  //         </div>
  //       </div>
        
  //       <div className="text-center mb-8">
  //         <p className="text-gray-600 mb-2">Didn't Receive Code?</p>
  //         {resendTimer > 0 ? (
  //           <p className="text-gray-500">Resend code in 00:{resendTimer.toString().padStart(2, '0')}</p>
  //         ) : (
  //           <button className="text-blue-600 font-semibold">Resend Code</button>
  //         )}
  //       </div>
        
  //       <button
  //         onClick={verifyOtp}
  //         className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
  //       >
  //         Verify
  //       </button>
  //     </div>
  //   </div>
  // );

  // Change Password Screen
  const ChangePasswordScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setCurrentPage('account')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Change Password</h1>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={emailForReset}
            disabled
            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>
        
        <button
          onClick={handlePasswordResetRequest}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
        >
          Send Verification Code
        </button>
      </div>
    </div>
  );

  // Password Reset Screen
  const PasswordResetScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setShowPasswordReset(false)} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Reset Password</h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            A verification code has been sent to
          </p>
          <p className="text-gray-700 font-semibold">{emailForReset}</p>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-4">
            Enter Verification Code
          </label>
          <div className="flex space-x-3 justify-center mb-4">
            {resetCode.map((digit, index) => (
              <input
                key={index}
                id={`reset-otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value, true)}
                className="w-16 h-16 border-2 border-gray-200 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ))}
          </div>
          
          <div className="text-center mb-6">
            {resendTimer > 0 ? (
              <p className="text-gray-500 text-sm">Resend code in 00:{resendTimer.toString().padStart(2, '0')}</p>
            ) : (
              <button className="text-blue-600 font-semibold text-sm">Resend Code</button>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-4"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Password Requirements */}
          {newPassword && (
            <div className="mt-2 space-y-1">
              {passwordErrors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-600">{error}</span>
                </div>
              ))}
              {passwordErrors.length === 0 && (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600">Password meets all requirements</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {confirmPassword && (
            <div className="mt-2">
              {newPassword === confirmPassword ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600">Passwords match</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-600">Passwords do not match</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <button
          onClick={handlePasswordReset}
          disabled={passwordErrors.length > 0 || newPassword !== confirmPassword || resetCode.join('').length !== 4}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset Password
        </button>
      </div>
    </div>
  );

  // Render different screens based on currentPage
  const renderScreen = () => {
    // if (showMeterConfirmation) return <MeterConfirmationScreen />;
    // if (showOtpVerification) return <OtpVerificationScreen />;
    if (showPasswordReset) return <PasswordResetScreen />;
    
    switch (currentPage) {
      case 'account':
        return <AccountScreen />;
      case 'manageMeter':
        return <ManageMeterScreen />;
      case 'addMeter':
        return <AddMeterScreen />;
      case 'removeMeter':
        return <RemoveMeterScreen />;
      case 'changePassword':
        return <ChangePasswordScreen />;
      default:
        return < AccountScreen/>;
    }
  };

  return (
    <div className="max-w-full bg-white min-h-screen relative">
      {renderScreen()}
      
      {/* Bottom Navigation - Only show on main screens */}
      {/* {!showMeterConfirmation  && !showPasswordReset && 
       !['manageMeter', 'addMeter', 'removeMeter', 'changePassword'].includes(currentPage) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
								 <div className="flex justify-between">
									 <button
										 className="flex flex-col items-center space-y-1"
										 onClick={() => router.push("/dashboard")}
									 >
										 <Home className="w-6 h-6 text-blue-600" />
										 <span className="text-xs text-blue-600 font-medium">Home</span>
									 </button>
									 <button
										 className="flex flex-col items-center space-y-1"
										 onClick={() => setCurrentPage("recharge")}
									 >
										 <Zap className="w-6 h-6 text-gray-400" />
										 <span className="text-xs text-gray-400">Recharge</span>
									 </button>
									 <button
										 onClick={() => router.push("/help")}
										 className="flex flex-col items-center space-y-1"
									 >
										 <HelpCircle className="w-6 h-6 text-gray-400" />
										 <span className="text-xs text-gray-400">Help</span>
									 </button>
									 <button
										 onClick={() => router.push("/account")}
										 className="flex flex-col items-center space-y-1"
									 >
										 <User className="w-6 h-6 text-gray-400" />
										 <span className="text-xs text-gray-400">Account</span>
									 </button>
								 </div>
							 </div>
      )} */}
			 <BottomNavigation 
        router={router}
        isExternalPage={true}
      />
    </div>
  );
};

export default AccountDashboard;
