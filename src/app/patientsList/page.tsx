"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import withAuth from "@/middleware/withAuth";


const PatientListPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const route = useRouter()
    // Mock patient data
    const patients = [
        {
            id: 1,
            name: "John Doe",
            country: "Dubai",
            symptoms: "Back pain",
            status: "pending",
            age: 45,
            urgency: "medium",
            requestDate: "2024-11-10"
        },
        {
            id: 2,
            name: "Mary Ann",
            country: "Abu Dhabi",
            symptoms: "Knee discomfort",
            status: "pending",
            age: 38,
            urgency: "low",
            requestDate: "2024-11-11"
        },
        {
            id: 3,
            name: "Ahmed Al-Said",
            country: "Dubai",
            symptoms: "Shoulder injury from sports",
            status: "screening",
            age: 32,
            urgency: "high",
            requestDate: "2024-11-09"
        },
        {
            id: 4,
            name: "Sarah Johnson",
            country: "Sharjah",
            symptoms: "Chronic hip pain",
            status: "pending",
            age: 52,
            urgency: "medium",
            requestDate: "2024-11-12"
        }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || patient.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
            screening: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
            reviewed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
        };
        return styles[status] || styles.pending;
    };

    const getUrgencyBadge = (urgency: string) => {
        const styles: Record<string, string> = {
            high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
            medium: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
            low: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        };
        return styles[urgency] || styles.low;
    };

    const getInitials = (name: string) => {
        return name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
    };

    return (
        <Layout title="Patient Screening" subtitle="Pre-Treatment Dashboard">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{patients.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Patients</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {patients.filter(p => p.status === "pending").length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Pending Review</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {patients.filter(p => p.status === "screening").length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">In Screening</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {patients.filter(p => p.urgency === "high").length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">High Priority</div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search patients by name or symptoms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === "pending"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilterStatus("screening")}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === "screening"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            Screening
                        </button>
                    </div>
                </div>
            </div>

            {/* Patient List */}
            <div className="space-y-4">
                {filteredPatients.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-400">No patients found matching your criteria</p>
                    </div>
                ) : (
                    filteredPatients.map((patient) => (
                        <div
                            key={patient.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
                        >
                            <div className="flex items-start gap-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {getInitials(patient.name)}
                                    </div>
                                </div>

                                {/* Patient Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {patient.name}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {patient.country}
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Age {patient.age}
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {patient.requestDate}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBadge(patient.status)}`}>
                                                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getUrgencyBadge(patient.urgency)}`}>
                                                {patient.urgency.charAt(0).toUpperCase() + patient.urgency.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Symptoms */}
                                    <div className="mb-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reported Symptoms</div>
                                                <p className="text-sm text-gray-900 dark:text-white">{patient.symptoms}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                            onClick={() => { route.push(`patientDetails/${patient.id}`) }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>View Details</span>
                                        </button>
                                        <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>Call</span>
                                        </button>
                                        <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}

export default withAuth(PatientListPage)