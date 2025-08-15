import { useState } from 'react';
import {  MessageCircle, FileText, Search, ThumbsUp, X, ArrowLeft, Send, ArrowDown, ChevronDown } from 'lucide-react';
import { useRouter } from "next/router";
     import {  Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

import {

Home, Zap, HelpCircle,
} from "lucide-react";
import BottomNavigation from '@/components/Navigation/BottomNavigation';
export default function HelpPage() {
  const [activePanel, setActivePanel] = useState(null);
			const router = useRouter();
	
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    feedback: ''
  });
  const [trackingId, setTrackingId] = useState('');

  const faqData = [
    {
      question: "How do I read my electricity meter?",
      answer: "To read your meter: 1) Locate your meter (usually outside your home), 2) Write down the numbers from left to right, 3) Ignore any red numbers or numbers after the decimal point, 4) The difference between this reading and your last reading is your usage."
    },
    {
      question: "How can I buy electricity units/light?",
      answer: "You can purchase electricity through: 1) Our mobile app, 2) Online portal, 3) Authorized vendors, 4) Bank transfers, 5) USSD codes. Simply enter your meter number and desired amount."
    },
    {
      question: "Why is my prepaid meter not accepting tokens?",
      answer: "This could be due to: 1) Incorrect meter number entered during purchase, 2) Meter tampered with, 3) Token already used, 4) System maintenance. Contact customer service if the issue persists."
    },
    {
      question: "How do I check my electricity balance?",
      answer: "Press '07' followed by the blue button on your meter to check your remaining units. You can also check through our mobile app or SMS service."
    },
    {
      question: "What should I do if my meter is faulty?",
      answer: "Report faulty meters immediately through our complaint system. Our technical team will inspect and replace faulty meters at no cost to you within 48 hours."
    }
  ];

  const openPanel = (panelName:any) => {
    setActivePanel(panelName);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  const handleComplaintSubmit = (e:any) => {
    e.preventDefault();
    // Generate random complaint ID
    const complaintId = 'CMP' + Math.random().toString(36).substr(2, 9).toUpperCase();
    alert(`Complaint submitted successfully! Your complaint ID is: ${complaintId}`);
    setComplaintForm({ name: '', email: '', phone: '', category: '', description: '' });
    closePanel();
  };

  const handleFeedbackSubmit = (e:any) => {
    e.preventDefault();
    alert('Thank you for your feedback! We appreciate your input.');
    setFeedbackForm({ name: '', email: '', rating: 5, feedback: '' });
    closePanel();
  };

  const trackComplaint = () => {
    if (trackingId.trim()) {
      // Simulate tracking result
      const statuses = ['Received', 'In Progress', 'Under Review', 'Resolved'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      alert(`Complaint ${trackingId} status: ${randomStatus}`);
    } else {
      alert('Please enter a valid complaint ID');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-8 text-center">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-bold">?</span>
        </div>
        <h1 className="text-xl font-normal mb-2">Hello, John</h1>
        <p className="text-blue-100 text-sm">How may we help you ?</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 -mt-5 relative z-10">
        <div className="bg-white rounded-t-3xl min-h-full mx-auto max-w-md">
          {/* Help Options */}
          <div className="pt-6">
            {/* Contact Us */}
            <div 
              className="flex items-center px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openPanel('contact')}
            >
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Contact Us</h3>
                <p className="text-sm text-gray-600">Get in touch with us</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* FAQ */}
            <div 
              className="flex items-center px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openPanel('faq')}
            >
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Get quick answers to all your questions</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* Complaints */}
            <div 
              className="flex items-center px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openPanel('complaints')}
            >
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Complaints</h3>
                <p className="text-sm text-gray-600">Submit your complaints here</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* Track Complaints */}
            <div 
              className="flex items-center px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openPanel('track')}
            >
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Track Complaints</h3>
                <p className="text-sm text-gray-600">Check status of your complaints</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* Feedback */}
            <div 
              className="flex items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openPanel('feedback')}
            >
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-4">
                <ThumbsUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 ">Feedback</h3>
                <p className="text-sm text-gray-600">Share your experience with us</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}

 <BottomNavigation 
        router={router}
        isExternalPage={true}
      />

      {/* Panels */}
      {/* Contact Us Panel */}

<div
  className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
    activePanel === "contact" ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Header */}
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 flex items-center">
    <button onClick={closePanel} className="mr-4 p-2">
      <ArrowLeft className="w-5 h-5" />
    </button>
    <h2 className="text-lg font-medium">Contact Us</h2>
  </div>

  {/* Body */}
  <div className="p-6 space-y-6">
    {/* Customer Service */}
    <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
      <Phone className="w-5 h-5 text-blue-600 mt-1" />
      <div>
        <h3 className="font-medium text-blue-900 mb-2">Customer Service</h3>
        <p className="text-blue-700">+234-800-123-4567</p>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-blue-600" />
          <p className="text-blue-700">support@meterlyco.com</p>
        </div>
      </div>
    </div>

    {/* Emergency Line */}
    <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
      <AlertTriangle className="w-5 h-5 text-blue-500 mt-1" />
      <div>
        <h3 className="font-medium text-blue-900 mb-2">Emergency Line</h3>
        <p className="text-blue-700">+234-911-POWER</p>
        <p className="text-blue-700 text-sm">Available 24/7 for power outages</p>
      </div>
    </div>

    {/* Office Address */}
    <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
      <div>
        <h3 className="font-medium text-blue-900 mb-2">Office Address</h3>
        <p className="text-blue-700">123 Power Street, Lagos State</p>
        <p className="text-blue-700">Mon - Fri: 8AM - 5PM</p>
      </div>
    </div>
  </div>
</div>


      {/* FAQ Panel */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${
        activePanel === 'faq' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 flex items-center sticky top-0">
          <button onClick={closePanel} className="mr-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">FAQ</h2>
        </div>
        <div className="p-6 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="px-4 py-3 font-medium cursor-pointer hover:bg-gray-50 list-none">
                  <div className="flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-blue-400 group-open:rotate-180 transition-transform">            <ChevronDown className="w-5 h-5" />
</span>
                  </div>
                </summary>
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Complaints Panel */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${
        activePanel === 'complaints' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 flex items-center sticky top-0">
          <button onClick={closePanel} className="mr-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">File a Complaint</h2>
        </div>
        <form onSubmit={handleComplaintSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={complaintForm.name}
              onChange={(e) => setComplaintForm({...complaintForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={complaintForm.email}
              onChange={(e) => setComplaintForm({...complaintForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={complaintForm.phone}
              onChange={(e) => setComplaintForm({...complaintForm, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              required
              value={complaintForm.category}
              onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="billing">Billing Issues</option>
              <option value="outage">Power Outage</option>
              <option value="meter">Meter Problems</option>
              <option value="service">Poor Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={complaintForm.description}
              onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Please describe your complaint in detail..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Complaint
          </button>
        </form>
      </div>

      {/* Track Panel */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
        activePanel === 'track' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 flex items-center">
          <button onClick={closePanel} className="mr-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">Track Complaint</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Complaint ID</label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your complaint ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={trackComplaint}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Track Status
          </button>
          <div className="mt-6 bg-orange-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Sample Complaint ID:</h3>
            <p className="text-blue-700 font-mono">CMP123ABC456</p>
          </div>
        </div>
      </div>

      {/* Feedback Panel */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${
        activePanel === 'feedback' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 flex items-center sticky top-0">
          <button onClick={closePanel} className="mr-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">Feedback</h2>
        </div>
        <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={feedbackForm.name}
              onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={feedbackForm.email}
              onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                  className={`text-2xl ${star <= feedbackForm.rating ? 'text-yellow' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
            <textarea
              required
              rows={4}
              value={feedbackForm.feedback}
              onChange={(e) => setFeedbackForm({...feedbackForm, feedback: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about your experience..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}