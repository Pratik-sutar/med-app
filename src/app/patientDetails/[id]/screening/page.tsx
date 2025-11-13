"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middleware/withAuth";

interface Question {
    id: number;
    question: string;
    type: "rating" | "choice" | "text" | "multiChoice";
    options?: (string | number)[];
}

interface Answer {
    questionId: number;
    answer: string | number | string[];
}

const ScreeningToolPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Mock questionnaire data
    const questions: Question[] = [
        {
            id: 1,
            question: "Rate your pain level (1 = Mild, 5 = Severe)",
            type: "rating",
            options: [1, 2, 3, 4, 5]
        },
        {
            id: 2,
            question: "Where is the pain located?",
            type: "choice",
            options: ["Lower back", "Upper back", "Neck", "Shoulders"]
        },
        {
            id: 3,
            question: "How long have you been experiencing this pain?",
            type: "choice",
            options: ["Less than 1 week", "1-4 weeks", "1-3 months", "More than 3 months"]
        },
        {
            id: 4,
            question: "Does the pain worsen with any specific activities?",
            type: "multiChoice",
            options: ["Sitting", "Standing", "Walking", "Lifting", "Bending", "No specific activity"]
        },
        {
            id: 5,
            question: "Do you experience any of the following symptoms?",
            type: "multiChoice",
            options: ["Numbness", "Tingling", "Weakness", "Stiffness", "None of the above"]
        },
        {
            id: 6,
            question: "Have you had any previous injuries to this area?",
            type: "choice",
            options: ["Yes, within the past year", "Yes, more than a year ago", "No previous injuries"]
        },
        {
            id: 7,
            question: "Please describe any additional symptoms or concerns",
            type: "text"
        }
    ];

    const currentQuestion = questions[currentStep];

    // Mock AI result based on answers
    const generateResult = () => {
        const painLevel = answers.find(a => a.questionId === 1)?.answer as number || 3;
        const location = answers.find(a => a.questionId === 2)?.answer as string || "Lower back";
        const duration = answers.find(a => a.questionId === 3)?.answer as string || "1-4 weeks";

        let condition = "Lumbar strain";
        let department = "Orthopedics";
        let severity = "Moderate";
        let recommendations: string[] = [];

        if (location === "Lower back") {
            if (painLevel >= 4) {
                condition = "Severe lumbar strain or possible disc herniation";
                severity = "High";
                recommendations = [
                    "Immediate consultation with orthopedic specialist",
                    "Consider MRI scan",
                    "Pain management medication may be required"
                ];
            } else {
                condition = "Lumbar muscle strain";
                severity = "Moderate";
                recommendations = [
                    "Physical therapy recommended",
                    "Anti-inflammatory medication",
                    "Rest and ice therapy"
                ];
            }
        } else if (location === "Neck") {
            condition = "Cervical strain";
            department = "Neurology";
            recommendations = [
                "Neck exercises and stretching",
                "Ergonomic assessment",
                "Physical therapy"
            ];
        } else if (location === "Upper back") {
            condition = "Thoracic spine strain";
            department = "Orthopedics";
            recommendations = [
                "Posture correction",
                "Physical therapy",
                "Strengthening exercises"
            ];
        }

        return {
            possibleCondition: condition,
            recommendedDepartment: department,
            severity,
            confidence: 85,
            recommendations
        };
    };

    const handleAnswer = (answer: string | number | string[]) => {
        const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
        newAnswers.push({ questionId: currentQuestion.id, answer });
        setAnswers(newAnswers);
    };

    const getAnswer = () => {
        return answers.find(a => a.questionId === currentQuestion.id)?.answer;
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleMultiChoiceToggle = (option: string) => {
        const currentAnswer = (getAnswer() as string[]) || [];
        let newAnswer: string[];

        if (currentAnswer.includes(option)) {
            newAnswer = currentAnswer.filter(item => item !== option);
        } else {
            newAnswer = [...currentAnswer, option];
        }

        handleAnswer(newAnswer);
    };

    const isAnswered = () => {
        const answer = getAnswer();
        if (currentQuestion.type === "multiChoice") {
            return Array.isArray(answer) && answer.length > 0;
        }
        if (currentQuestion.type === "text") {
            return answer && (answer as string).trim().length > 0;
        }
        return answer !== undefined;
    };

    const result = generateResult();

    if (showResults) {
        return (
            <Layout title="Screening Results" subtitle="Pre-Diagnosis Analysis">
                <div className="max-w-4xl mx-auto">
                    {/* Success Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Screening Complete</h2>
                        <p className="text-gray-600 dark:text-gray-400">AI-powered analysis has been generated based on your responses</p>
                    </div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Possible Condition */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Possible Condition</h3>
                            </div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{result.possibleCondition}</p>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Confidence:</span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2">{result.confidence}%</span>
                            </div>
                        </div>

                        {/* Recommended Department */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recommended Department</h3>
                            </div>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{result.recommendedDepartment}</p>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${result.severity === "High" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                                    result.severity === "Moderate" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" :
                                        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                    }`}>
                                    {result.severity} Severity
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Recommendations
                        </h3>
                        <div className="space-y-3">
                            {result.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-900 dark:text-white">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Your Responses Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Responses</h3>
                        <div className="space-y-4">
                            {answers.map((answer) => {
                                const question = questions.find(q => q.id === answer.questionId);
                                return (
                                    <div key={answer.questionId} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{question?.question}</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">
                                            {Array.isArray(answer.answer) ? answer.answer.join(", ") : answer.answer}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-6">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-yellow-900 dark:text-yellow-300 mb-1">Important Notice</h4>
                                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                                    This screening tool provides preliminary insights based on your responses. It is not a substitute for professional medical diagnosis.
                                    Please consult with a qualified healthcare provider for accurate diagnosis and treatment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setShowResults(false);
                                setCurrentStep(0);
                                setAnswers([]);
                            }}
                            className="flex-1 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
                        >
                            Start New Screening
                        </button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Confirm Screening Complete</span>
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Pre-Diagnosis Screening" subtitle="Health Assessment Tool">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Screening Progress</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Question {currentStep + 1} of {questions.length}
                        </span>
                    </div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                            {questions.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${index < currentStep
                                        ? "bg-green-600 text-white"
                                        : index === currentStep
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {index < currentStep ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
                    <div className="mb-6">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 block">
                            QUESTION {currentStep + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {currentQuestion.question}
                        </h2>
                        {currentQuestion.type === "multiChoice" && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Select all that apply</p>
                        )}
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {currentQuestion.type === "rating" && (
                            <div className="flex justify-between gap-3">
                                {currentQuestion.options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        className={`flex-1 py-6 rounded-xl border-2 transition-all font-semibold text-lg ${getAnswer() === option
                                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === "choice" && (
                            <div className="space-y-3">
                                {currentQuestion.options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center ${getAnswer() === option
                                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${getAnswer() === option
                                            ? "border-blue-600 bg-blue-600"
                                            : "border-gray-400 dark:border-gray-500"
                                            }`}>
                                            {getAnswer() === option && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <span className={`font-medium ${getAnswer() === option
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-900 dark:text-white"
                                            }`}>
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === "multiChoice" && (
                            <div className="space-y-3">
                                {currentQuestion.options?.map((option) => {
                                    const currentAnswer = (getAnswer() as string[]) || [];
                                    const isSelected = currentAnswer.includes(option as string);
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleMultiChoiceToggle(option as string)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center ${isSelected
                                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                                : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${isSelected
                                                ? "border-blue-600 bg-blue-600"
                                                : "border-gray-400 dark:border-gray-500"
                                                }`}>
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`font-medium ${isSelected
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-gray-900 dark:text-white"
                                                }`}>
                                                {option}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === "text" && (
                            <textarea
                                value={(getAnswer() as string) || ""}
                                onChange={(e) => handleAnswer(e.target.value)}
                                placeholder="Type your response here..."
                                rows={6}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                            />
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${currentStep === 0
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Previous</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isAnswered()}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-md ${!isAnswered()
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        <span>{currentStep === questions.length - 1 ? "View Results" : "Next Question"}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        All information is confidential and used only for screening purposes
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default withAuth(ScreeningToolPage)