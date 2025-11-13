"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import { doctors } from "@/data/doctors";
import { useRouter } from "next/navigation";


export default function DoctorsListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const specialties = ["All", "Orthopedics", "Physical Therapy", "Neurology", "Cardiology", "Internal Medicine"];
    const locations = ["All", "Dubai", "Abu Dhabi", "Sharjah"];
    const router = useRouter()
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (doctor.subSpecialty?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
        const matchesLocation = selectedLocation === "All" || doctor.location === selectedLocation;
        return matchesSearch && matchesSpecialty && matchesLocation;
    });

    const getInitials = (name: string) => {
        return name.split(" ").filter(n => n.startsWith("Dr.") === false).map(n => n[0]).join("").toUpperCase();
    };

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case "Available":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            case "Busy":
                return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
            case "Off Duty":
                return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
        }
    };

    return (
        <Layout title="Doctors Directory" subtitle="Find Healthcare Professionals">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{doctors.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Doctors</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {doctors.filter(d => d.availability === "Available").length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Available Now</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {specialties.length - 1}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Specialties</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        4.8
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex flex-col gap-4">
                    {/* Search and View Toggle */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search doctors by name or specialty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                            />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === "grid"
                                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === "list"
                                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        >
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>
                                    {specialty === "All" ? "All Specialties" : specialty}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        >
                            {locations.map(location => (
                                <option key={location} value={location}>
                                    {location === "All" ? "All Locations" : location}
                                </option>
                            ))}
                        </select>

                        <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span>More Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredDoctors.length}</span> doctors
                </p>
            </div>

            {/* Doctors Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                            {/* Doctor Header */}
                            <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600">
                                <div className="absolute -bottom-12 left-6">
                                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl shadow-lg">
                                        {getInitials(doctor.name)}
                                    </div>
                                </div>
                                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(doctor.availability)}`}>
                                    {doctor.availability}
                                </span>
                            </div>

                            {/* Doctor Info */}
                            <div className="pt-16 px-6 pb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{doctor.specialty}</p>
                                {doctor.subSpecialty && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{doctor.subSpecialty}</p>
                                )}

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.rating}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({doctor.reviews})</span>
                                </div>

                                {/* Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {doctor.experience} years experience
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {doctor.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        AED {doctor.consultationFee}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                                        onClick={() => { router.push(`doctors/${doctor.id}`) }}
                                    >
                                        View Profile
                                    </button>
                                    <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                            <div className="flex items-start gap-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                        {getInitials(doctor.name)}
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{doctor.specialty}</p>
                                            {doctor.subSpecialty && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.subSpecialty}</p>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getAvailabilityColor(doctor.availability)}`}>
                                            {doctor.availability}
                                        </span>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400">Experience</label>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.experience} years</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400">Rating</label>
                                            <div className="flex items-center">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white mr-1">{doctor.rating}</span>
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({doctor.reviews})</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400">Location</label>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.location}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400">Fee</label>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">AED {doctor.consultationFee}</p>
                                        </div>
                                    </div>

                                    {/* Hospital & Languages */}
                                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {doctor.hospital}
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            {doctor.languages.join(", ")}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
                                            View Profile
                                        </button>
                                        <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
                                            Book Appointment
                                        </button>
                                        <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {filteredDoctors.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">No doctors found matching your criteria</p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedSpecialty("All");
                            setSelectedLocation("All");
                        }}
                        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </Layout>
    );
}