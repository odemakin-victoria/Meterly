import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Zap, 
  HelpCircle, 
  User, 
  Bell, 
  Eye, 
  EyeOff, 

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
import pictureImage from "../../../public/assets/images/Rectangle 49.png";
import CurvrBack from "../../../public/assets/images/Rectangle 6.png";
// Mock user profile data
const mockUserProfile = {
  fullName: "John Paul",
  email: "youremail@domain.com",
  phone: "+234 56547 89",
  electricityMeters: [
    {
      id: 1,
      meterNumber: "34566775643",
      meterName: "Primary Meter",
      disco: "Ikeja Electric",
      meterAddress: "Unilag, Akoka road, Lagos Nigeria"
    }
  ]
};

const AccountDashboard = () => {
  const [currentPage, setCurrentPage] = useState('account');
  const [activeTab, setActiveTab] = useState('home');

  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  
  // Meter management states
  const [meterAction, setMeterAction] = useState(''); // 'add' or 'remove'
  const [selectedMeter, setSelectedMeter] = useState('');
  const [newMeterNumber, setNewMeterNumber] = useState('');
  const [selectedDisco, setSelectedDisco] = useState('Ikeja Electric');
  const [showMeterConfirmation, setShowMeterConfirmation] = useState(false);
  const [meterConfirmationData, setMeterConfirmationData] = useState(null);
  
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

  const discos = ['Ikeja Electric', 'Eko Electric', 'Abuja Electric', 'Port Harcourt Electric'];

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
      const confirmationData = {
        meterNumber: newMeterNumber,
        disco: selectedDisco,
        name: "John Paul", // This would come from actual verification
        address: "Unilag, Akoka road, Lagos Nigeria",
        phone: "*****3647",
        houseNumber: "12"
      };
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

  // Account Screen Component
  const AccountScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
    <div
  className="px-4 py-6  relative"
  style={{
    backgroundImage: `url(${pictureImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "200px" // ensures it's tall enough to show the image
  }}
>
  {/* Optional overlay for readability */}
  <div className="absolute inset-0 rounded-b-[130px] bg-[#1679E8]/20"></div>

  <div className="flex items-center justify-center relative z-10">
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <Image
          src={CurvrBack}
          alt="Meterly Illustration"
          className="w-20 object-contain rounded-lg"
        />
      </div>
      <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
        <Edit3 className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>

  <div className="text-center mt-4 relative z-10">
    <h2 className="text-xl font-bold text-gray-900">{userProfile.fullName}</h2>
    <p className="text-sm text-gray-600">
      {userProfile.email} | {userProfile.phone}
    </p>
  </div>
</div>


      {/* Menu Items */}
      <div className="px-4 py-6 space-y-4">
        <button
          onClick={() => setCurrentPage('manageMeter')}
          className="w-full bg-white rounded-2xl p-4 flex items-center space-x-4 border-2 border-blue-200 hover:border-blue-300 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-[#1679E8]">Manage Meter</h3>
            <p className="text-sm text-gray-600">Add or remove meter details from your account</p>
          </div>
        </button>
      {/* First block - 5 items */}
      <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
        {/* Edit profile information */}
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0">
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
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0"
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
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0"
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
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0"
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
        <button className="w-full p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Manage Saved Cards</span>
          </div>
        </button>
      </div>

      {/* Second block - 3 items */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <button className="w-full p-4 flex items-center space-x-4 border-b border-gray-100 last:border-b-0">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">Help & Support</span>
        </button>

        <button className="w-full p-4 flex items-center space-x-4 border-b border-gray-100 last:border-b-0">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">Contact us</span>
        </button>

        <button className="w-full p-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">Privacy policy</span>
        </button>
      </div>
    
      </div>
    </div>
  );

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

  // Add Meter Screen
  const AddMeterScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setCurrentPage('manageMeter')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Add Meter Details</h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Distribution Company:
          </label>
          <div className="relative">
            <select 
              value={selectedDisco}
              onChange={(e) => setSelectedDisco(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {discos.map(disco => (
                <option key={disco} value={disco}>{disco}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Meter Number:
          </label>
          <input
            type="text"
            value={newMeterNumber}
            onChange={(e) => setNewMeterNumber(e.target.value)}
            placeholder="34566775643"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleMeterSubmit}
          disabled={!newMeterNumber}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed
        </button>
      </div>
    </div>
  );

  // Remove Meter Screen
  const RemoveMeterScreen = () => (
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
          onClick={() => {
            // Remove meter logic
            setUserProfile(prev => ({
              ...prev,
              electricityMeters: prev.electricityMeters.filter(m => m.id !== selectedMeter)
            }));
            setSelectedMeter('');
            setCurrentPage('account');
          }}
          disabled={!selectedMeter}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Remove Selected Meter
        </button>
      </div>
    </div>
  );

  // Meter Confirmation Screen
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
          Please double-check the information and appropriate information.
        </p>
        
        {/* Modal-like confirmation card */}
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
              <span className="text-gray-600">Phone Number:</span>
              <span className="font-semibold">{meterConfirmationData?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">House Number:</span>
              <span className="font-semibold">{meterConfirmationData?.houseNumber}</span>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <button
              onClick={proceedWithMeter}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // OTP Verification Screen
  const OtpVerificationScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-6 border-b flex items-center">
        <button onClick={() => setShowOtpVerification(false)} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-blue-600">Verify Phone Number</h1>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-8">
          <p className="text-gray-700 mb-2">
            A Code has been sent to your phone
          </p>
          <p className="text-gray-700">
            <span className="font-bold">*******647.</span> Enter the code to verify your account.
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
            <button className="text-blue-600 font-semibold">Resend Code</button>
          )}
        </div>
        
        <button
          onClick={verifyOtp}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
        >
          Verify
        </button>
      </div>
    </div>
  );

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
    if (showMeterConfirmation) return <MeterConfirmationScreen />;
    if (showOtpVerification) return <OtpVerificationScreen />;
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
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderScreen()}
      
      {/* Bottom Navigation - Only show on main screens */}
      {!showMeterConfirmation && !showOtpVerification && !showPasswordReset && 
       !['manageMeter', 'addMeter', 'removeMeter', 'changePassword'].includes(currentPage) && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex flex-col items-center space-y-1"
            >
              <Home className={`w-6 h-6 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <Zap className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Recharge</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <HelpCircle className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Help</span>
            </button>
            <button 
              onClick={() => handleNavigation('account')}
              className="flex flex-col items-center space-y-1"
            >
              <User className={`w-6 h-6 ${activeTab === 'account' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${activeTab === 'account' ? 'text-blue-600' : 'text-gray-400'}`}>Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;