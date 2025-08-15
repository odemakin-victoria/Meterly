import React, { ReactNode, useEffect, useRef, useState } from "react";
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
  X,
  Share,
  ChevronDown,
  BarChart3,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  BatteryCharging,
  Leaf,
  Sun,
  AlertTriangle,
	XCircle,
	CheckCircle,
	ExternalLink,
} from "lucide-react";
import Image from "next/image";
import LogoImage from "../../../public/assets/images/meterly-img-long.png";
import ArrowBack from "../../../public/assets/images/ic_round-arrow-back.svg";
import Clock from "@/components/Clock/Clock";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import usuageIcon from "../../../public/assets/images/bx_trip.svg";
import { FetchUserProfile } from "@/redux/thunk/auth";
import {
  ElectricityMeter,
  ErrorResponse,
  ProfileUserResponse,
  RegisterInResponse,
} from "@/redux/types/auth";
import { useAppDispatch } from "@/redux/hooks/hook";
import { useRouter } from "next/router";
import AlertModal from "@/components/Loader/Loader";
import cardBalanceImage from "../../../public/assets/images/Vector.png";
import { FetchTransactionHistory, RechargeUserMeter } from "@/redux/thunk/meterMeter";
import { FetchTransactionHistoryResponse, RechargeMeterResponse } from "@/redux/types/meter-management";
import BottomNavigation from "@/components/Navigation/BottomNavigation";

interface PaymentData {
    meterNumber: string;
    amount: string;
    paymentMethod: string;
}
interface PaymentFlowPageProps {
    paymentData: PaymentData | null;
    setCurrentPage: (page: string) => void;
}
interface PaymentSummaryPageProps {
    selectedMeter: any;
    customAmount: string;
    selectedPaymentMethod: string;
    setSelectedPaymentMethod: (method: string) => void;
    setCurrentPage: (page: string) => void;
    setPaymentData: (data: PaymentData) => void;
}
const MeterlyApp = () => {
  const router = useRouter();
const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("online");
  const [selectedUsagePeriod, setSelectedUsagePeriod] = useState("Today");
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [showChart, setShowChart] = useState(true);

  // Add selectedMeter state at the top level
  const [selectedMeter, setSelectedMeter] = useState<ElectricityMeter | null>(
    null
  );
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    electricityMeters: [] as ElectricityMeter[],
    loading: true,
  });

  const handleAmountSelect = (amount: any) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const DashboardPage = () => {
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [currentMeterIndex, setCurrentMeterIndex] = useState(0);

 // Fix for the useEffect in DashboardPage component
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
    // Handle meter card navigation
    const handlePrevMeter = () => {
      if (userProfile.electricityMeters.length > 0) {
        setCurrentMeterIndex((prev) =>
          prev === 0 ? userProfile.electricityMeters.length - 1 : prev - 1
        );
      }
    };

    const handleNextMeter = () => {
      if (userProfile.electricityMeters.length > 0) {
        setCurrentMeterIndex((prev) =>
          prev === userProfile.electricityMeters.length - 1 ? 0 : prev + 1
        );
      }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
      if (!dateString) return "N/A";
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return "N/A";
      }
    };

    // Format balance for display
    const formatBalance = (balance: string | number) => {
      if (!balance) return "₦0.00";
      const numBalance =
        typeof balance === "string" ? parseFloat(balance) : balance;
      return `₦${numBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    // Get current meter data
    const currentMeter = userProfile.electricityMeters[currentMeterIndex];

    return (
      <div className="min-h-screen bg-gray-50 overflow-y-scroll pb-20">
        {/* Header */}
        <div className="flex items-center justify-between h-full mt-8 px-4">
          <div className="flex items-center">
            <span className="sm:inline text-[#1801CD] font-semibold truncate max-w-[520px]">
              {userProfile.loading ? (
                <span className="flex items-center">
                  <span className="animate-pulse bg-gray-300 h-4 w-20 rounded"></span>
                </span>
              ) : (
                `Hello, ${userProfile.fullName || "User"}`
              )}
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
            <div className="relative">
              <button
                className="flex items-center gap-2"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="w-8 h-8 rounded-full bg-[#1801CD] flex items-center justify-center">
                  <FaUserCircle className="text-white" size={18} />
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 w-40 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-[#1801CD] hover:bg-blue-50"
                    onClick={() => router.push("/account")}
                  >
                    Change Password
                  </button>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#1801CD] hover:bg-blue-50"
                    onClick={() => router.push("/landing-page")}
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
          {userProfile.loading ? (
            <div className="bg-gray-200 animate-pulse rounded-2xl p-6 h-40"></div>
          ) : userProfile.electricityMeters.length === 0 ? (
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl p-6 text-white">
              <div className="text-center">
                <Zap className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Meter Connected
                </h3>
                <p className="text-gray-200">
                  Please add an electricity meter to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Card with image + blue overlay - now with touch/swipe support */}
              <div
                className="relative rounded-2xl overflow-hidden text-white p-6 cursor-pointer touch-pan-x"
                style={{
                  backgroundImage: `url(${cardBalanceImage.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => {
                  // Optional: Add click to cycle through meters
                  if (userProfile.electricityMeters.length > 1) {
                    handleNextMeter();
                  }
                }}
              >
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-[#1679E8] bg-opacity-90"></div>

                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm">Meter Balance</p>
                      <p className="text-xs text-blue-200">
                        {currentMeter?.meterName || "Primary Meter"}
                      </p>
                      <p className="text-xs text-blue-200">
                        Last Recharge: {formatDate(currentMeter?.lastRecharge)}
                      </p>
                    </div>
                    <Zap className="w-6 h-6 text-blue-200" />
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold">
                      {showBalance
                        ? formatBalance(currentMeter?.meterBalance)
                        : "₦ *****"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        setShowBalance((prev) => !prev);
                      }}
                      className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      {showBalance ? (
                        <Eye className="w-4 h-4 text-white" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-300 text-sm font-medium">
                        Meter Number
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono">
                          {currentMeter?.meterNumber || "N/A"}
                        </span>
                        <button
                          className="hover:bg-white/10 p-1 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Copy to clipboard logic here
                            navigator.clipboard.writeText(
                              currentMeter?.meterNumber || ""
                            );
                          }}
                        >
                          <Copy className="w-4 h-4 text-blue-200" />
                        </button>
                      </div>
                      {currentMeter?.disco && (
                        <p className="text-xs text-blue-200 mt-1">
                          {currentMeter.disco}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-orange-300 text-sm font-medium">
                        Units
                      </p>
                      <p className="text-white text-lg font-semibold">
                        {currentMeter?.units || 0} kWh
                      </p>
                      {currentMeter?.meterAddress && (
                        <p className="text-xs text-blue-200 mt-1">
                          {currentMeter.meterAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Indicators - Show only if multiple meters - Now as circles under the card */}
        {userProfile.electricityMeters.length > 1 && (
          <div className="flex justify-center pb-4">
            <div className="flex space-x-2">
              {userProfile.electricityMeters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMeterIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentMeterIndex
                      ? "bg-[#1679E8] scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentPage("recharge")}
            className="bg-blue-100 p-6 rounded-2xl"
            disabled={userProfile.electricityMeters.length === 0}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Zap className="w-8 h-8 text-[#1679E8]" />
            </div>
            <h3 className="font-semibold text-[#1679E8] text-left mb-2">
              Recharge Meter
            </h3>
            <p className="text-sm text-gray-600 text-left">
              Recharge your meter instantly. No queues, No stress, just power.
            </p>
          </button>

          <button
            onClick={() => setCurrentPage("useage")}
            className="bg-orange-100 p-6 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Image
                src={usuageIcon}
                alt="Usage Icon"
                className="w-20 object-contain rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-left text-[#545454] mb-2">
              View Usage
            </h3>
            <p className="text-sm text-left text-gray-600">
              Track your electricity consumption in real time. Be informed
            </p>
          </button>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentPage("history")}
            className="bg-gray-200 p-6 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <History className="w-12 h-12 text-[#545454]" />
            </div>
            <h3 className="font-semibold text-left text-gray-900 mb-2">
              History
            </h3>
            <p className="text-sm text-left text-gray-600">
              See your recent unit purchases and meter top-ups.
            </p>
          </button>

          <button
            onClick={() => setCurrentPage("education")}
            className="bg-green-100 p-6 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
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
        {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between">
            <button
              className="flex flex-col items-center space-y-1"
              onClick={() => setCurrentPage("dashboard")}
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
        </div> */}

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
  const RechargePage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    // Handle amount selection from preset buttons
    const handleAmountSelect = (amount: string) => {
      // Remove ₦ and commas to get clean number
      const cleanAmount = amount.replace("₦", "").replace(/,/g, "");
      setCustomAmount(cleanAmount);
      setSelectedAmount(amount);
    };

    // Handle meter selection
    const handleMeterSelect = (meter: ElectricityMeter) => {
      setSelectedMeter(meter);
      setShowDropdown(false);
    };

    // Calculate estimated units (assuming ₦100 = 1 kWh, adjust as needed)
    const calculateEstimatedUnits = () => {
      const amount = parseFloat(customAmount) || 0;
      const ratePerUnit = 209.5; // ₦100 per kWh - adjust this based on your actual rate
      return (amount / ratePerUnit).toFixed(2);
    };

    // Handle custom amount input
    const handleCustomAmountChange = (value: string) => {
      // Only allow numbers and decimal point
      const cleanValue = value.replace(/[^0-9.]/g, "");
      setCustomAmount(cleanValue);
      setSelectedAmount(""); // Clear preset selection when typing custom amount
    };

    // Format balance for display
    const formatBalance = (balance: string | number) => {
      if (!balance) return "₦0.00";
      const numBalance = typeof balance === "string" ? parseFloat(balance) : balance;
      return `₦${numBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    return (
      <div className="min-h-screen mb-16 overflow-y-scroll bg-white">
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
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Meter Number Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Meter
            </label>

            {userProfile.loading ? (
              <div className="bg-gray-200 animate-pulse rounded-lg p-4 h-14"></div>
            ) : userProfile.electricityMeters.length === 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <span className="text-red-600">No meters available</span>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <div className="text-left">
                    <span className="text-blue-800 font-mono text-lg block">
                      {selectedMeter?.meterNumber || "Select a meter"}
                    </span>
                    {selectedMeter && (
                      <div className="text-blue-600 text-sm">
                        <div>{selectedMeter.meterName} • {selectedMeter.disco}</div>
                        <div>Balance: {formatBalance(selectedMeter.meterBalance)} • {selectedMeter.units} kWh</div>
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {userProfile.electricityMeters.map((meter) => (
                      <button
                        key={meter.id}
                        onClick={() => handleMeterSelect(meter)}
                        className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                          selectedMeter?.id === meter.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-gray-900 block font-medium">
                              {meter.meterNumber}
                            </span>
                            <span className="text-sm text-gray-600">
                              {meter.meterName} • {meter.disco}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              <span>Balance: {formatBalance(meter.meterBalance)}</span>
                              <span className="ml-3">Units: {meter.units} kWh</span>
                            </div>
                            {meter.meterAddress && (
                              <span className="text-xs text-gray-400 block">
                                {meter.meterAddress}
                              </span>
                            )}
                          </div>
                          {selectedMeter?.id === meter.id && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-4">
              Amount:
            </label>

            {/* Custom Amount Input */}
            <div className="relative mb-4">
              <span className="absolute left-3 top-3 text-gray-500 text-lg">₦</span>
              <input
                type="text"
                placeholder="Enter  Amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-3">
              {[
                "₦1,000",
                "₦2,000", 
                "₦5,000",
                "₦10,000",
                "₦20,000",
                "₦50,000",
              ].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg border font-medium transition-colors ${
                    selectedAmount === amount
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Unit */}
          {customAmount && parseFloat(customAmount) > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Estimated Units:
              </label>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <span className="text-green-800 font-semibold text-lg">
                  {calculateEstimatedUnits()} kWh
                </span>
                <span className="text-green-600 text-sm ml-2">
                  (Rate: ₦209.5/kWh)
                </span>
              </div>
            </div>
          )}

          {/* Selected Meter Info */}
          {selectedMeter && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-3">
                Selected Meter Details:
              </h3>
              <div className="text-sm text-blue-700 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Meter Number:</span>
                  <span className="font-mono">{selectedMeter.meterNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{selectedMeter.meterName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">DISCO:</span>
                  <span>{selectedMeter.disco}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Current Balance:</span>
                  <span className="font-semibold">{formatBalance(selectedMeter.meterBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Current Units:</span>
                  <span className="font-semibold">{selectedMeter.units} kWh</span>
                </div>
                {selectedMeter.meterAddress && (
                  <div className="pt-2 border-t border-blue-200">
                    <span className="font-medium">Address:</span>
                    <div className="text-blue-600 mt-1">{selectedMeter.meterAddress}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => setCurrentPage("payment-summary")}
            disabled={
              !selectedMeter || !customAmount || parseFloat(customAmount) <= 0
            }
            className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors ${
              !selectedMeter || !customAmount || parseFloat(customAmount) <= 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {!selectedMeter ? "Select a meter first" : 
             !customAmount || parseFloat(customAmount) <= 0 ? "Enter amount" :
             "Proceed to Payment"}
          </button>
        </div>

        {/* Click outside to close dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  };
 const PaymentSummaryPage = ({
    selectedMeter,
    customAmount,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    setCurrentPage,
    setPaymentData
}: PaymentSummaryPageProps) => {
	  const formatBalance = (balance: string | number) => {
      if (!balance) return "₦0.00";
      const numBalance = typeof balance === "string" ? parseFloat(balance) : balance;
      return `₦${numBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    const calculateEstimatedUnits = () => {
      const amount = parseFloat(customAmount) || 0;
      const ratePerUnit = 209.5;
      return (amount / ratePerUnit).toFixed(2);
    };

    const calculateNewBalance = () => {
      const currentBalance = parseFloat(selectedMeter?.meterBalance || "0");
      const rechargeAmount = parseFloat(customAmount) || 0;
      return currentBalance + rechargeAmount;
    };

    // Handler for proceeding to payment
    const handleProceedToPayment = () => {
      if (selectedPaymentMethod === "online") {
        // Pass meter number and amount to payment flow page
        setPaymentData({
          meterNumber: selectedMeter?.meterNumber,
          amount: customAmount,
          paymentMethod: selectedPaymentMethod
        });
        setCurrentPage("payment-flow");
      }
    };

			

    return (
      <div className="min-h-screen mb-16 overflow-y-scroll bg-white">
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
          <div className="w-8"></div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-blue-900">Meter Recharge</h2>
                <p className="text-blue-700">Review your payment details</p>
              </div>
            </div>
          </div>

          {/* Meter Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meter Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Meter Number</span>
                <span className="font-mono font-semibold">{selectedMeter?.meterNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Meter Name</span>
                <span className="font-semibold">{selectedMeter?.meterName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">DISCO</span>
                <span className="font-semibold">{selectedMeter?.disco}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Current Balance</span>
                <span className="font-semibold">{formatBalance(selectedMeter?.meterBalance)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Current Units</span>
                <span className="font-semibold">{selectedMeter?.units} kWh</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Recharge Amount</span>
                <span className="font-bold text-green-600 text-lg">
                  {formatBalance(customAmount)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Estimated Units</span>
                <span className="font-semibold text-green-600">
                  +{calculateEstimatedUnits()} kWh
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-semibold">₦0.00</span>
              </div>
              <div className="flex justify-between py-3 bg-gray-50 px-4 rounded-lg">
                <span className="text-gray-900 font-semibold">Total Amount</span>
                <span className="font-bold text-blue-600 text-xl">
                  {formatBalance(customAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* After Recharge Preview */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">After Recharge</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-green-700">New Balance</span>
                <span className="font-bold text-green-800 text-lg">
                  {formatBalance(calculateNewBalance())}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-green-700">Estimated Total Units</span>
                <span className="font-bold text-green-800">
                  ~{(parseFloat(selectedMeter?.units || "0") + parseFloat(calculateEstimatedUnits())).toFixed(2)} kWh
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              {/* Online Payment - Enabled */}
              <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="online" 
                  checked={selectedPaymentMethod === "online"}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Online Payment</div>
                  <div className="text-sm text-gray-500">Pay securely online</div>
                </div>
              </label>

              {/* Card Payment - Disabled */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed opacity-60">
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  disabled
                  className="w-4 h-4 text-gray-400"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-500">POS</div>
                  <div className="text-sm text-gray-400">Pay via POS  (Coming Soon)</div>
                </div>
              </label>

              {/* Bank Transfer - Disabled */}
              {/* <label className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed opacity-60">
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  disabled
                  className="w-4 h-4 text-gray-400"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-500">Bank Transfer</div>
                  <div className="text-sm text-gray-400">Pay via bank transfer (Coming Soon)</div>
                </div>
              </label> */}
            </div>
          </div>

          {/* Action Buttons */}
              <div className="space-y-3">
            <button
              onClick={handleProceedToPayment}
              disabled={selectedPaymentMethod !== "online"}
              className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all ${
                selectedPaymentMethod === "online"
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {selectedPaymentMethod === "online" ? "Proceed to Payment" : "Select Payment Method"}
            </button>
            
            <button
              onClick={() => setCurrentPage("recharge")}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Edit
            </button>
          </div>
        </div>
			
      </div>
    );
  };

const PaymentFlowPage = ({ paymentData, setCurrentPage }: PaymentFlowPageProps) => {    const dispatch = useAppDispatch();
    const [paymentLink, setPaymentLink] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<"processing" | "link_ready" | "error">("processing");
    
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

    const RechargeUserAccount = async () => {
        try {
            setAlertState((prev) => ({
                ...prev,
                show: true,
                loading: true,
                title: "Processing Payment",
                message: "Please wait while we prepare your payment...",
                icon: "loading"
            }));

            const result = await dispatch(
                RechargeUserMeter({
                    meterNumber: paymentData?.meterNumber,
                    amount: paymentData?.amount,
                })
            );

            const { meta, payload } = result;
            
           if (meta.requestStatus === "fulfilled") {
    let res = payload as RechargeMeterResponse;
    console.log(res, "Recharge response");

  if (res) {
    setPaymentLink(res);
    setPaymentStatus("link_ready"); // <-- THIS hides the loader

    setAlertState((prev) => ({
        ...prev,
        show: false,
        loading: false,
        title: "",
        message: "",
        icon: ""
    }));
}

}

            if (meta.requestStatus === "rejected") {
                const errorObj = payload as ErrorResponse;
                setPaymentStatus("error");
                setAlertState((prev) => ({
                    ...prev,
                    show: true,
                    loading: false,
                    title: errorObj?.errorMsg || "Payment Failed",
                    message: "Unable to process your payment. Please try again.",
                    icon: "error",
                }));
            }
        } catch (error) {
            setPaymentStatus("error");
            setAlertState((prev) => ({
                ...prev,
                show: true,
                loading: false,
                title: "Something went wrong",
                message: "Please try again later.",
                icon: "error",
            }));
            throw error;
        }
    };

    // Auto-initiate payment when component mounts
  const didRun = useRef(false);

useEffect(() => {
    if (!didRun.current && paymentData?.meterNumber && paymentData?.amount) {
        didRun.current = true;
        RechargeUserAccount();
    }
}, [paymentData?.meterNumber, paymentData?.amount]);


    const handleOpenPaymentLink = () => {
        if (paymentLink) {
            window.open(paymentLink, '_blank');
        }
    };

    const formatBalance = (balance: string | number) => {
        if (!balance) return "₦0.00";
        const numBalance = typeof balance === "string" ? parseFloat(balance) : balance;
        return `₦${numBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    return (
        <div className="min-h-screen mb-16 overflow-y-scroll bg-white">
            {/* Header */}
            <div className="flex items-center px-6 py-4 border-b border-gray-100">
                <button
                    onClick={() => setCurrentPage("payment-summary")}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="flex-1 text-left text-lg font-semibold text-gray-900 ml-4">
                    Complete Payment
                </h1>
            </div>

            <div className="px-6 py-6">
                {/* Payment Processing State */}
                {paymentStatus === "processing" && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h2>
                        <p className="text-gray-600 text-center">
                            Please wait while we prepare your payment link...
                        </p>
                    </div>
                )}

                {/* Payment Link Ready State */}
                {paymentStatus === "link_ready" && paymentLink && (
                    <div className="space-y-6">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>

                        {/* Payment Details Summary */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Ready</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-blue-700">Meter Number:</span>
                                    <span className="font-mono font-semibold text-blue-900">
                                        {paymentData?.meterNumber}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-700">Amount:</span>
                                    <span className="font-bold text-blue-900">
                                        {formatBalance(paymentData?.amount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                <li>Click the "Complete Payment" button below</li>
                                <li>You'll be redirected to a secure payment page</li>
                                <li>Complete your payment using your preferred method</li>
                                <li>Your meter will be recharged automatically</li>
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleOpenPaymentLink}
                                className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                Complete Payment
                            </button>
                            
                            <button
                                onClick={() => setCurrentPage("dashboard")}
                                className="w-full bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                                <div>
                                    <p className="text-sm text-yellow-800">
                                        <span className="font-semibold">Secure Payment:</span> You'll be redirected to a secure payment gateway. 
                                        Never share your payment details outside of official payment pages.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {paymentStatus === "error" && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 text-center mb-8">
                            Unable to process your payment. Please try again.
                        </p>
                        <div className="space-y-3 w-full max-w-sm">
                            <button
                                onClick={RechargeUserAccount}
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => setCurrentPage("payment-summary")}
                                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Back to Payment Summary
                            </button>
                        </div>
                    </div>
                )}
            </div>

         
        </div>
    );
};


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
  // Usage Page Component
  const UsagePage = () => {
    const [selectedUsagePeriod, setSelectedUsagePeriod] = useState("Today");
    const [selectedYear, setSelectedYear] = useState("2020");
    const [selectedMonth, setSelectedMonth] = useState("Jan");
    const [showChart, setShowChart] = useState(true);

    const mockUsageData = {
      daily: {
        current: 35.2,
        average: 6.2,
        thisWeek: 58.2,
        remaining: 120.5,
        estimatedDays: 8,
      },
      weekly: {
        current: 246.4,
        average: 43.4,
        thisWeek: 58.2,
        remaining: 120.5,
        estimatedDays: 8,
      },
      monthly: {
        current: 375.8,
        average: 93.95,
        thisWeek: 58.2,
        remaining: 120.5,
        estimatedDays: 8,
      },
    };

    const chartData = [
      { name: "Dec", value: 250 },
      { name: "Jan", value: 350, active: true },
      { name: "Feb", value: 200 },
      { name: "Mar", value: 300 },
      { name: "Apr", value: 150 },
    ];
    const currentData =
      mockUsageData[selectedUsagePeriod.toLowerCase()] || mockUsageData.daily;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Usage</h1>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Period Tabs */}
        <div className="px-6 py-4 bg-white">
          <div className="flex space-x-2">
            {["Today", "Weekly", "Monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedUsagePeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedUsagePeriod === period
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Year and Month Selectors (for Monthly view) */}
        {selectedUsagePeriod === "Monthly" && (
          <div className="px-6 py-2 bg-white border-t border-gray-100">
            <div className="flex space-x-3">
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-sm font-medium text-gray-700"
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-sm font-medium text-gray-700"
                >
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        )}

        {/* Chart/Table Toggle */}
        {selectedUsagePeriod === "Monthly" && (
          <div className="px-6 py-3 bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              <button
                onClick={() => setShowChart(false)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  !showChart ? "bg-gray-200 text-gray-900" : "text-gray-600"
                }`}
              >
                TABLE
              </button>
              <button
                onClick={() => setShowChart(true)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  showChart ? "bg-blue-600 text-white" : "text-gray-600"
                }`}
              >
                Chart
              </button>
            </div>
          </div>
        )}

        <div className="px-6 py-6 space-y-6">
          {selectedUsagePeriod === "Today" ? (
            <>
              {/* Total Power Consumption Circle */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Total Power Consumption
                </h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${
                          (currentData.current / 100) * 251.2
                        } 251.2`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        {currentData.current} kw
                      </span>
                      <span className="text-sm text-gray-500">Total Usage</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.remaining} kWh
                    </div>
                    <div className="text-sm text-gray-500">Remaining Units</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      ≈ {currentData.estimatedDays} days
                    </div>
                    <div className="text-sm text-gray-500">
                      Estimated Days Left
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Today</div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.current} Kwh
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Average Daily Use
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.average} Kwh
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">This week</div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.thisWeek} Kwh
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">
                      2- 5 pm
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedUsagePeriod === "Monthly" ? (
            <>
              {/* Monthly Usage Display */}
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentData.current}KW
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedMonth} Month
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {showChart && (
                <div className="bg-white rounded-2xl p-6">
                  <div className="mb-6">
                    <div className="flex items-end space-x-2 h-64">
                      {chartData.map((item, index) => (
                        <div
                          key={item.name}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              item.active ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            style={{ height: `${(item.value / 400) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>0</span>
                      <span>100</span>
                      <span>200</span>
                      <span>300</span>
                      <span>400</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">This week</div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.thisWeek} Kwh
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">
                      2- 5 pm
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Weekly view - similar to monthly but with different data
            <div className="bg-white rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {currentData.current} kWh
                </div>
                <div className="text-gray-500 mb-6">Weekly Usage</div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">This week</div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentData.thisWeek} Kwh
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">
                      2- 5 pm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="flex flex-col items-center space-y-1"
            >
              <Home className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Home</span>
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
    );
  };

  // History Page Component
 const HistoryPage = () => {
  const dispatch = useAppDispatch();
  
  // State for transaction history
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: true,
        title: "Fetching Transaction History...",
        icon: "loading",
      }));

      const result = await dispatch(FetchTransactionHistory());
      const { meta, payload } = result;
      
      if (meta.requestStatus === "fulfilled") {
        const res = payload as FetchTransactionHistoryResponse;
        console.log(res, "Transaction history fetched successfully");
        
        // Set the transaction history data
        setTransactionHistory(res.transactions || res.data || []);
        
        setAlertState((prev) => ({
          ...prev,
          show: false,
          loading: false,
        }));
      }

      if (meta.requestStatus === "rejected") {
        const errorObj = payload as ErrorResponse;
        setAlertState((prev) => ({
          ...prev,
          show: true,
          loading: false,
          title: errorObj?.errorMsg || "Failed to fetch transaction history",
          icon: "error",
        }));
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      setAlertState((prev) => ({
        ...prev,
        show: true,
        loading: false,
        title: "Something went wrong. Please try again",
        icon: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Fetch history when component mounts
  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  // Format amount for display
  const formatAmount = (amount: string | number) => {
    if (!amount) return "₦0.00";
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₦${numAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "recharge":
      case "top-up":
        return <Zap className="w-5 h-5 text-green-600" />;
      case "payment":
        return <BatteryCharging className="w-5 h-5 text-blue-600" />;
      case "refund":
        return <RefreshCw className="w-5 h-5 text-orange-600" />;
      default:
        return <History className="w-5 h-5 text-gray-600" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Transaction History</h1>
        <button 
          onClick={fetchTransactionHistory}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Filter/Summary Section */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <p className="text-sm text-gray-500">
                {transactionHistory.length} transaction(s) found
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-lg font-semibold text-green-600">
                {/* You can calculate total for this month */}
                {formatAmount(
                  transactionHistory
                    .filter(t => t.status?.toLowerCase() === 'success')
                    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {loading && transactionHistory.length === 0 ? (
            // Loading skeleton
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </>
          ) : transactionHistory.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-lg p-8 text-center">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Transactions Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Your transaction history will appear here once you make your first recharge.
              </p>
              <button
                onClick={() => setCurrentPage("recharge")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Make Your First Recharge
              </button>
            </div>
          ) : (
            // Transaction items
            transactionHistory.map((transaction, index) => (
              <div
                key={transaction.id || index}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type || transaction.transactionType)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {transaction.type || transaction.transactionType || "Transaction"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(transaction.date || transaction.createdAt || transaction.timestamp)}
                      </div>
                      {transaction.meterNumber && (
                        <div className="text-xs text-gray-400 font-mono">
                          {transaction.meterNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatAmount(transaction.amount)}
                    </div>
                    {transaction.status && (
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    )}
                    {transaction.units && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{transaction.units} kWh
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional details - expandable section */}
                {transaction.reference && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Reference:</span>
                      <span className="font-mono">{transaction.reference}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Load More Button - if you have pagination */}
        {transactionHistory.length > 0 && transactionHistory.length % 10 === 0 && (
          <div className="text-center mt-6">
            <button 
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => {
                // Implement load more functionality if needed
                console.log("Load more transactions");
              }}
            >
              Load More Transactions
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="flex flex-col items-center space-y-1"
          >
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button 
            onClick={() => setCurrentPage("recharge")}
            className="flex flex-col items-center space-y-1"
          >
            <Zap className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Recharge</span>
          </button>
          <button 
            onClick={() => setCurrentPage("help")}
            className="flex flex-col items-center space-y-1"
          >
            <HelpCircle className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Help</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <History className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">History</span>
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
  );
};

  // Education and Tips Page Component
  const EducationPage = () => {
    const tips = [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Switch Off Appliances",
        description:
          "Unplug devices when not in use. Even on standby, appliances can consume power.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Use Energy-Efficient Bulbs",
        description:
          "Switch to LED lighting. LEDs use up to 80% less power than incandescent bulbs.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Track Your Usage Regularly",
        description:
          "Check your daily consumption. Monitoring usage can help reveal waste.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <BatteryCharging className="w-6 h-6" />,
        title: "Recharge Before Balance Runs Out",
        description:
          "Avoid disconnection by topping up early. Set low balance alerts to stay informed.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <Leaf className="w-6 h-6" />,
        title: "Go Green",
        description:
          "Consider renewable energy sources like solar panels to reduce long-term costs.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Protect Your Appliances",
        description:
          "Use surge protectors to prevent damage during power fluctuations.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <Sun className="w-6 h-6" />,
        title: "Maximize Daylight",
        description:
          "Open blinds and curtains to use natural light instead of electric lighting during the day.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <AlertTriangle className="w-6 h-6" />,
        title: "Report Faults Quickly",
        description:
          "Report any electricity supply issues to your provider immediately to avoid prolonged outages.",
        color: "bg-blue-100 text-blue-600",
      },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Education and Tips
          </h1>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <div className="px-2 py-6 space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${tip.color}`}
                >
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "recharge":
        return <RechargePage />;
        case "payment-summary":
        return <PaymentSummaryPage 
          selectedMeter={selectedMeter}
          customAmount={customAmount}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setCurrentPage={setCurrentPage}
          setPaymentData={setPaymentData}
        />;
      case "payment-flow":
        return <PaymentFlowPage 
          paymentData={paymentData}
          setCurrentPage={setCurrentPage}
        />;
      case "bank-transfer":
        return <BankTransferPage />;
      case "card-payment":
        return <CardPaymentPage />;
      case "receipt":
        return <ReceiptPage />;
      case "useage":
        return <UsagePage />;
      case "history":
        return <HistoryPage />;
      case "education":
        return <EducationPage />;
    }
  };

  return <div>{renderCurrentPage()}
	  <BottomNavigation 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      router={router}
    /></div>;
};

export default MeterlyApp;
