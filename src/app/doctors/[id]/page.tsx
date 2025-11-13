"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { doctors } from '@/data/doctors';

interface Review {
    id: number;
    patientName: string;
    rating: number;
    date: string;
    comment: string;
}

interface TimeSlot {
    time: string;
    available: boolean;
}

interface DaySchedule {
    day: string;
    date: string;
    slots: TimeSlot[];
}

const DoctorDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<'overview' | 'availability' | 'reviews'>('overview');
    const [selectedDate, setSelectedDate] = useState(0);

    // Get doctor ID from params and find doctor
    const doctorId = parseInt(params.id as string);
    const doctor = doctors.find(d => d.id === doctorId);

    // Handle doctor not found
    if (!doctor) {
        return (
            <Layout title="Doctor Not Found" subtitle="">
                <div className="bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white mb-2">Doctor Not Found</h2>
                    <p className="text-gray-400 mb-6">The doctor you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push('/doctors')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Back to Doctors List
                    </button>
                </div>
            </Layout>
        );
    }

    const schedule: DaySchedule[] = [
        {
            day: "Mon",
            date: "Jan 15",
            slots: [
                { time: "09:00 AM", available: true },
                { time: "10:00 AM", available: true },
                { time: "11:00 AM", available: false },
                { time: "02:00 PM", available: true },
                { time: "03:00 PM", available: true },
                { time: "04:00 PM", available: false }
            ]
        },
        {
            day: "Tue",
            date: "Jan 16",
            slots: [
                { time: "09:00 AM", available: false },
                { time: "10:00 AM", available: true },
                { time: "11:00 AM", available: true },
                { time: "02:00 PM", available: true },
                { time: "03:00 PM", available: false },
                { time: "04:00 PM", available: true }
            ]
        },
        {
            day: "Wed",
            date: "Jan 17",
            slots: [
                { time: "09:00 AM", available: true },
                { time: "10:00 AM", available: true },
                { time: "11:00 AM", available: true },
                { time: "02:00 PM", available: false },
                { time: "03:00 PM", available: true },
                { time: "04:00 PM", available: true }
            ]
        }
    ];

    const reviewsList: Review[] = [
        {
            id: 1,
            patientName: "John D.",
            rating: 5,
            date: "2 days ago",
            comment: "Dr. Mitchell is exceptional! She took the time to explain my condition and treatment options. My recovery has been faster than expected."
        },
        {
            id: 2,
            patientName: "Maria S.",
            rating: 5,
            date: "1 week ago",
            comment: "Highly recommend! Very professional and caring. She helped me get back to playing tennis after my ACL surgery."
        },
        {
            id: 3,
            patientName: "Ahmed K.",
            rating: 4,
            date: "2 weeks ago",
            comment: "Great doctor with excellent expertise. The wait time was a bit long but the consultation was worth it."
        }
    ];

    const getInitials = (name: string) => {
        return name.split(" ").filter(n => n.startsWith("Dr.") === false).map(n => n[0]).join("").toUpperCase();
    };

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case "Available":
                return "bg-green-900/40 text-green-400 border border-green-600";
            case "Busy":
                return "bg-orange-900/40 text-orange-400 border border-orange-600";
            case "Off Duty":
                return "bg-gray-700 text-gray-300 border border-gray-600";
            default:
                return "bg-gray-700 text-gray-300 border border-gray-600";
        }
    };

    return (
        <Layout title={doctor.name} subtitle="Doctor Profile">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Back Button */}
                <button
                    onClick={() => router.push('/doctors')}
                    className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Doctors</span>
                </button>

                {/* Doctor Header Card */}
                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center text-blue-600 font-bold text-4xl shadow-lg">
                                {getInitials(doctor.name)}
                            </div>
                        </div>
                        <span className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold ${getAvailabilityColor(doctor.availability)}`}>
                            {doctor.availability}
                        </span>
                    </div>

                    <div className="pt-20 px-8 pb-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white mb-2">{doctor.name}</h1>
                                <p className="text-xl text-blue-400 font-semibold mb-2">{doctor.specialty}</p>
                                <p className="text-gray-400 mb-4">{doctor.subSpecialty}</p>

                                <div className="flex flex-wrap gap-4 mb-4">
                                    {/* Rating */}
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-600"}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white font-semibold">{doctor.rating}</span>
                                        <span className="text-gray-400 ml-1">({doctor.reviews} reviews)</span>
                                    </div>

                                    {/* Experience */}
                                    <div className="flex items-center text-gray-400">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {doctor.experience} years experience
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {doctor.hospital}
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {doctor.location}
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        {doctor.languages.join(", ")}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-col gap-3 lg:min-w-[250px]">
                                <div className="bg-gray-700 rounded-xl p-4 text-center border-2 border-blue-600">
                                    <p className="text-gray-400 text-sm mb-1">Consultation Fee</p>
                                    <p className="text-3xl font-bold text-white">AED {doctor.consultationFee}</p>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg">
                                    Book Appointment
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all border-2 border-gray-600 hover:border-blue-500">
                                    Message Doctor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedTab('overview')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${selectedTab === 'overview'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setSelectedTab('availability')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${selectedTab === 'availability'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            Availability
                        </button>
                        <button
                            onClick={() => setSelectedTab('reviews')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${selectedTab === 'reviews'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            Reviews
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {selectedTab === 'overview' && (
                    <div className="space-y-6">
                        {/* About */}
                        {doctor.about && (
                            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">About</h2>
                                <p className="text-gray-300 leading-relaxed">{doctor.about}</p>
                            </div>
                        )}

                        {/* Education & Certifications */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center mr-3">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Education</h2>
                                </div>
                                <p className="text-gray-300 font-medium">{doctor.education}</p>
                            </div>

                            {doctor.certifications && doctor.certifications.length > 0 && (
                                <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center mr-3">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-white">Certifications</h2>
                                    </div>
                                    <ul className="space-y-2">
                                        {doctor.certifications.map((cert, index) => (
                                            <li key={index} className="flex items-start text-gray-300">
                                                <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {cert}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Areas of Expertise */}
                        {doctor.expertise && doctor.expertise.length > 0 && (
                            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Areas of Expertise</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {doctor.expertise.map((item, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border-2 border-gray-600 hover:border-blue-500 transition-all"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === 'availability' && (
                    <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Available Time Slots</h2>

                        {/* Date Selector */}
                        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                            {schedule.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDate(index)}
                                    className={`flex-shrink-0 px-6 py-4 rounded-xl border-2 transition-all ${selectedDate === index
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-500'
                                        }`}
                                >
                                    <div className="text-sm font-medium">{day.day}</div>
                                    <div className="text-xs opacity-75">{day.date}</div>
                                </button>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {schedule[selectedDate].slots.map((slot, index) => (
                                <button
                                    key={index}
                                    disabled={!slot.available}
                                    className={`py-3 px-4 rounded-xl font-medium transition-all ${slot.available
                                        ? 'bg-gray-700 text-white border-2 border-gray-600 hover:border-blue-500 hover:bg-gray-600'
                                        : 'bg-gray-900 text-gray-600 border-2 border-gray-800 cursor-not-allowed'
                                        }`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-900/20 border-l-4 border-blue-600 rounded-lg">
                            <p className="text-sm text-blue-300">
                                <span className="font-bold">Note:</span> Appointments are subject to confirmation. You will receive a confirmation message after booking.
                            </p>
                        </div>
                    </div>
                )}

                {selectedTab === 'reviews' && (
                    <div className="space-y-4">
                        {reviewsList.map((review) => (
                            <div key={review.id} className="bg-gray-800 rounded-2xl shadow-xl p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            {review.patientName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{review.patientName}</h3>
                                            <p className="text-sm text-gray-400">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}

                        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all border-2 border-gray-600 hover:border-blue-500">
                            Load More Reviews
                        </button>
                    </div>
                )}

            </div>
        </Layout>
    );
};

export default DoctorDetailPage;