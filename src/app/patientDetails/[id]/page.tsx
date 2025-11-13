"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middleware/withAuth";
import { useParams, useRouter } from "next/navigation";

const PatientDetailsPage = () => {
    const route = useRouter()
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");

    // Mock patient data
    const patient = {
        id: 1,
        name: "John Doe",
        country: "Dubai",
        age: 45,
        gender: "Male",
        email: "john.doe@example.com",
        phone: "+971 50 123 4567",
        symptoms: "Back pain",
        detailedComplaints: "Patient reports chronic lower back pain for the past 3 months. Pain intensifies during morning hours and after prolonged sitting. No previous history of back injuries.",
        status: "pending",
        urgency: "medium",
        requestDate: "2024-11-10",
        documents: [
            { id: 1, type: "X-ray", name: "Lower Back X-ray", file: "xray_back.png", uploadDate: "2024-11-08", size: "2.4 MB" },
            { id: 2, type: "MRI Report", name: "Spine MRI", file: "mri_spine.pdf", uploadDate: "2024-11-05", size: "5.1 MB" },
            { id: 3, type: "Blood Test", name: "Complete Blood Count", file: "blood_test.pdf", uploadDate: "2024-11-01", size: "1.2 MB" }
        ],
        medicalHistory: [
            { condition: "Hypertension", diagnosedYear: "2018", status: "Controlled" },
            { condition: "Type 2 Diabetes", diagnosedYear: "2020", status: "Managed" }
        ],
        allergies: ["Penicillin", "Latex"],
        currentMedications: [
            "Metformin 500mg - Twice daily",
            "Lisinopril 10mg - Once daily"
        ]
    };

    const getInitials = (name: string) => {
        return name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
    };

    const getDocumentIcon = (type: string) => {
        if (type.toLowerCase().includes("x-ray") || type.toLowerCase().includes("mri")) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            );
        }
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    };

    return (
        <Layout title="Patient Details" subtitle="Pre-Treatment Screening">
            {/* Back Button */}
            <div className="mb-6">
                <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Patient List
                </button>
            </div>

            {/* Patient Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                            {getInitials(patient.name)}
                        </div>
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{patient.name}</h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {patient.age} years • {patient.gender}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {patient.country}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Request Date: {patient.requestDate}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold">
                                    Pending Review
                                </span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-semibold">
                                    Medium Priority
                                </span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-900 dark:text-white">{patient.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-900 dark:text-white">{patient.phone}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md"
                                onClick={() => { route.push(`/patientDetails/${id}/screening`) }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                <span>Start Screening</span>
                            </button>
                            <button
                                className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center space-x-2"
                                onClick={() => { route.push(`/patientDetails/${id}/surgeryCare`) }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Surgery Care</span>
                            </button>
                            <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "overview"
                                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("documents")}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "documents"
                                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                }`}
                        >
                            Documents ({patient.documents.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "history"
                                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                }`}
                        >
                            Medical History
                        </button>
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Symptoms & Complaints */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Chief Complaint
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Symptom</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{patient.symptoms}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Detailed Description</label>
                                    <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{patient.detailedComplaints}</p>
                                </div>
                            </div>
                        </div>

                        {/* Educational Resources */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Patient Education Resources
                            </h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Understanding Lower Back Pain</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">Common causes, prevention, and treatment options</p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Pre-Diagnosis Checklist</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">What to expect during your screening process</p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Exercise & Physical Therapy Guide</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">Safe exercises for back pain management</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Allergies */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Allergies</h3>
                            <div className="space-y-2">
                                {patient.allergies.map((allergy, index) => (
                                    <div key={index} className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span className="text-sm font-medium text-red-900 dark:text-red-300">{allergy}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current Medications */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Current Medications</h3>
                            <div className="space-y-3">
                                {patient.currentMedications.map((medication, index) => (
                                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">{medication}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Documents</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">{patient.documents.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Medical Conditions</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">{patient.medicalHistory.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Known Allergies</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">{patient.allergies.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "documents" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Uploaded Documents</h3>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Upload New</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {patient.documents.map((doc) => (
                            <div key={doc.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        {getDocumentIcon(doc.type)}
                                    </div>
                                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{doc.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{doc.type}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>{doc.uploadDate}</span>
                                    <span>{doc.size}</span>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors">
                                        View
                                    </button>
                                    <button className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 text-sm py-2 px-3 rounded-lg transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "history" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Medical History</h3>
                        <div className="space-y-4">
                            {patient.medicalHistory.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-blue-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.condition}</h4>
                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Diagnosed: {item.diagnosedYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Timeline</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                                    <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-semibold text-gray-900 dark:text-white">Request Submitted</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{patient.requestDate}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Patient submitted initial screening request</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                    <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-semibold text-gray-900 dark:text-white">Pending Review</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Awaiting doctor's initial assessment</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-500 dark:text-gray-400">Screening & Consultation</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500">Upcoming</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default withAuth(PatientDetailsPage)