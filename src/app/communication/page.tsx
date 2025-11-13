"use client";
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middleware/withAuth";

interface Message {
    id: number;
    from: "patient" | "doctor";
    text: string;
    timestamp: string;
    type?: "text" | "file" | "image";
    fileName?: string;
}

const CommunicationPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, from: "patient", text: "Hello doctor", timestamp: "10:30 AM", type: "text" },
        { id: 2, from: "doctor", text: "Hello John! I've reviewed your symptoms and medical history.", timestamp: "10:32 AM", type: "text" },
        { id: 3, from: "doctor", text: "I see you've been experiencing lower back pain for the past 3 months. Can you tell me more about when the pain is most intense?", timestamp: "10:33 AM", type: "text" },
        { id: 4, from: "patient", text: "It's usually worse in the morning when I wake up, and after sitting for long periods at work.", timestamp: "10:35 AM", type: "text" },
        { id: 5, from: "doctor", text: "I understand. Based on your X-rays and MRI results, it appears to be a lumbar strain. I'd recommend starting with physical therapy.", timestamp: "10:38 AM", type: "text" },
        { id: 6, from: "patient", text: "Should I be worried about the MRI findings?", timestamp: "10:40 AM", type: "text" },
        { id: 7, from: "doctor", text: "No need to worry. The findings are consistent with muscular strain, not structural damage. However, I'd like to schedule a video consultation to discuss your treatment plan in detail.", timestamp: "10:42 AM", type: "text" }
    ]);

    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [videoCallActive, setVideoCallActive] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: messages.length + 1,
                from: "patient",
                text: newMessage,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                type: "text"
            };
            setMessages([...messages, newMsg]);
            setNewMessage("");

            // Simulate doctor typing and response
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const doctorReply: Message = {
                    id: messages.length + 2,
                    from: "doctor",
                    text: "Thank you for the information. I'll review this and get back to you shortly.",
                    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    type: "text"
                };
                setMessages(prev => [...prev, doctorReply]);
            }, 2000);
        }
    };

    const handleStartVideoCall = () => {
        setVideoCallActive(true);
        setTimeout(() => {
            alert("Video call would start here in production. This is a mock demonstration.");
            setVideoCallActive(false);
        }, 1000);
    };

    const patientInfo = {
        name: "John Doe",
        age: 45,
        status: "online",
        lastSeen: "Active now"
    };

    return (
        <Layout title="Secure Messaging" subtitle="Patient Communication Portal">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
                {/* Chat Area */}
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        JD
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{patientInfo.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        {patientInfo.lastSeen}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Attach file">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Search messages">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleStartVideoCall}
                                    disabled={videoCallActive}
                                    className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-md ${videoCallActive
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>{videoCallActive ? "Connecting..." : "Start Video Call"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
                        {/* Date Divider */}
                        <div className="flex items-center justify-center my-4">
                            <div className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
                                Today
                            </div>
                        </div>

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.from === "doctor" ? "justify-start" : "justify-end"}`}
                            >
                                <div className={`flex items-end space-x-2 max-w-lg ${message.from === "patient" ? "flex-row-reverse space-x-reverse" : ""}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${message.from === "doctor"
                                        ? "bg-gradient-to-br from-purple-500 to-pink-600"
                                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                                        }`}>
                                        {message.from === "doctor" ? "DR" : "JD"}
                                    </div>

                                    {/* Message Bubble */}
                                    <div>
                                        <div className={`px-4 py-3 rounded-2xl ${message.from === "doctor"
                                            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none"
                                            : "bg-blue-600 text-white rounded-br-none"
                                            }`}>
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                        <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.from === "patient" ? "text-right" : "text-left"
                                            }`}>
                                            {message.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-end space-x-2 max-w-lg">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        DR
                                    </div>
                                    <div className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex items-end space-x-3">
                            {/* Emoji Button */}
                            <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {/* Input Field */}
                            <div className="flex-1 relative">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    rows={1}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-colors"
                                    style={{ minHeight: "48px", maxHeight: "120px" }}
                                />
                                {/* Attachment Button */}
                                <button className="absolute right-3 bottom-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                            </div>

                            {/* Send Button */}
                            <button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                                className={`p-3 rounded-lg transition-colors flex-shrink-0 ${newMessage.trim()
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center space-x-2 mt-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Quick actions:</span>
                            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                📋 Share Report
                            </button>
                            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                📅 Schedule Appointment
                            </button>
                            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                💊 Prescription
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Patient Info & Features */}
                <div className="space-y-6">
                    {/* Patient Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Patient Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{patientInfo.name}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Age</label>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{patientInfo.age} years</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</label>
                                <div className="flex items-center mt-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">Online</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium py-2 rounded-lg transition-colors">
                            View Full Profile
                        </button>
                    </div>

                    {/* Communication Features */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Communication Tools</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Video Call</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">HD quality</p>
                                </div>
                            </button>

                            <button className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Voice Call</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Audio only</p>
                                </div>
                            </button>

                            <button className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Share Files</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Documents & images</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl p-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-green-900 dark:text-green-300">Secure Chat</h4>
                                <p className="text-xs text-green-700 dark:text-green-400">End-to-end encrypted</p>
                            </div>
                        </div>
                        <p className="text-xs text-green-800 dark:text-green-300">
                            All messages are protected with military-grade encryption. Your privacy is our priority.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default withAuth(CommunicationPage)