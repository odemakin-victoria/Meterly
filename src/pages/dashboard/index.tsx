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
	X,
	Share,
	 ChevronDown,
  BarChart3,
  TrendingUp,
  RefreshCw
	
} from "lucide-react";
import Image from "next/image";
import LogoImage from "../../../public/assets/images/meterly-img-long.png";
import ArrowBack from "../../../public/assets/images/ic_round-arrow-back.svg";
import Clock from "@/components/Clock/Clock";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import usuageIcon from "../../../public/assets/images/bx_trip.svg";

interface LayoutProps {
	children: ReactNode;
	showSidebar?: boolean;
}
const MeterlyApp = () => {
	const [currentPage, setCurrentPage] = useState("dashboard");
	const [selectedAmount, setSelectedAmount] = useState("");
	const [customAmount, setCustomAmount] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedUsagePeriod, setSelectedUsagePeriod] = useState("Today");
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [showChart, setShowChart] = useState(true);

	const handleAmountSelect = (amount: any) => {
		setSelectedAmount(amount);
		setCustomAmount("");
	};





	const DashboardPage = () => {
		const [dropdownOpen, setDropdownOpen] = useState(false);
		const [showBalance, setShowBalance] = useState(true);

		return (
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
								<p className="text-xs text-blue-200">
									Last Recharge: 05/04/2024
								</p>
							</div>
							<Zap className="w-6 h-6 text-blue-200" />
						</div>

						<div className="flex items-center space-x-2 mb-4">
							<span className="text-3xl font-bold">
								{showBalance ? "₦ 5,350.00" : "₦ *****"}
							</span>
							<button
								onClick={() => setShowBalance((prev) => !prev)}
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
						<h3 className="font-semibold text-[#1679E8] text-left mb-2">
							Recharge Meter
						</h3>
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
						<h3 className="font-semibold text-left text-[#545454] mb-2">
							View Usage
						</h3>
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
						<h3 className="font-semibold text-left text-gray-900 mb-2">
							History
						</h3>
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
		);
	};

	const RechargePage = () => (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<div className="flex items-center px-6 py-4 border-b border-gray-100">
				<button
					onClick={() => setCurrentPage("dashboard")}
					className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<img
						src={ArrowBack.src}
						alt="Logo"
						className="w-6 h-6 object-contain rounded-lg"
					/>
				</button>
				<h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
					Recharge Meter
				</h1>
				<button className="p-2">
					<Image
						src={LogoImage}
						alt="Meterly Illustration"
						className="w-28  object-contain rounded-lg"
					/>{" "}
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
					Proceed
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
// Usage Page Component
  const UsagePage = () => {
		 const [selectedUsagePeriod, setSelectedUsagePeriod] = useState("Today");
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [showChart, setShowChart] = useState(true);

    const currentData = mockUsageData[selectedUsagePeriod.toLowerCase()] || mockUsageData.daily;
    	// Mock data
const mockHistoryData = [
  { date: "May 5, 2025", amount: "₦5,000", type: "Recharged" },
  { date: "April 3, 2025", amount: "₦5,000", type: "Recharged" },
  { date: "March 3, 2025", amount: "₦5,000", type: "Recharged" },
  { date: "February 3, 2025", amount: "₦5,000", type: "Recharged" },
  { date: "January, 2025", amount: "₦5,000", type: "Recharged" },
];

const mockUsageData = {
  daily: { current: 35.2, average: 6.2, thisWeek: 58.2, remaining: 120.5, estimatedDays: 8 },
  weekly: { current: 246.4, average: 43.4, thisWeek: 58.2, remaining: 120.5, estimatedDays: 8 },
  monthly: { current: 375.8, average: 93.95, thisWeek: 58.2, remaining: 120.5, estimatedDays: 8 },
};

const chartData = [
  { name: 'Dec', value: 250 },
  { name: 'Jan', value: 350, active: true },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 300 },
  { name: 'Apr', value: 150 },
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
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Total Power Consumption</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
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
                        strokeDasharray={`${(currentData.current / 100) * 251.2} 251.2`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{currentData.current} kw</span>
                      <span className="text-sm text-gray-500">Total Usage</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{currentData.remaining} kWh</div>
                    <div className="text-sm text-gray-500">Remaining Units</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">≈ {currentData.estimatedDays} days</div>
                    <div className="text-sm text-gray-500">Estimated Days Left</div>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Today</div>
                    <div className="text-xl font-bold text-gray-900">{currentData.current} Kwh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Average Daily Use</div>
                    <div className="text-xl font-bold text-gray-900">{currentData.average} Kwh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">This week</div>
                    <div className="text-xl font-bold text-gray-900">{currentData.thisWeek} Kwh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">2- 5 pm</div>
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
                    <div className="text-2xl font-bold text-gray-900">{currentData.current}KW</div>
                    <div className="text-sm text-gray-500">{selectedMonth} Month</div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {showChart && (
                <div className="bg-white rounded-2xl p-6">
                  <div className="mb-6">
                    <div className="flex items-end space-x-2 h-64">
                      {chartData.map((item, index) => (
                        <div key={item.name} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              item.active ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            style={{ height: `${(item.value / 400) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2">{item.name}</div>
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
                    <div className="text-xl font-bold text-gray-900">{currentData.thisWeek} Kwh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">2- 5 pm</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Weekly view - similar to monthly but with different data
            <div className="bg-white rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{currentData.current} kWh</div>
                <div className="text-gray-500 mb-6">Weekly Usage</div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">This week</div>
                    <div className="text-xl font-bold text-gray-900">{currentData.thisWeek} Kwh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                    <div className="text-xl font-bold text-gray-900">2- 5 pm</div>
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
  const HistoryPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">History</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <RefreshCw className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Transaction History</h2>
        
        <div className="space-y-4">
          {mockHistoryData.map((transaction, index) => (
            <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{transaction.date}</div>
                <div className="text-sm text-gray-500">{transaction.type}</div>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
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

  // Education and Tips Page Component
  const EducationPage = () => {
    const tips = [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Switch Off Appliances",
        description: "Unplug devices when not in use. Even on standby, appliances can consume power.",
        color: "bg-blue-100 text-blue-600"
      },
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Use Energy-Efficient Bulbs",
        description: "Switch to LED lighting. LEDs use up to 80% less power than incandescent bulbs.",
        color: "bg-yellow-100 text-yellow-600"
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Track Your Usage Regularly",
        description: "Check your daily consumption. Monitoring usage can help reveal waste.",
        color: "bg-green-100 text-green-600"
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: "Recharge Before Balance Runs Out",
        description: "Avoid disconnection by topping up early. Set low balance alerts to stay informed.",
        color: "bg-purple-100 text-purple-600"
      }
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
          <h1 className="text-lg font-semibold text-gray-900">Education and Tips</h1>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-green-600" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tip.color}`}>
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
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

	const renderCurrentPage = () => {
		switch (currentPage) {
	
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
				case "useage":
				return <UsagePage />;
			case "history":
				return <HistoryPage />;
			case "education":
				return <EducationPage />;
		
		}
	};

	return <div>{renderCurrentPage()}</div>;
};

export default MeterlyApp;
