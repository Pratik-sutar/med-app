// @/data/doctors.ts
import { Doctor } from "@/types/type";

export const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Sarah Mitchell",
        specialty: "Orthopedics",
        subSpecialty: "Sports Medicine",
        experience: 15,
        rating: 4.9,
        reviews: 234,
        location: "Dubai",
        hospital: "Dubai Medical Center",
        languages: ["English", "Arabic"],
        availability: "Available",
        consultationFee: 500,
        education: "MD, Harvard Medical School",
        about: "Dr. Sarah Mitchell is a highly experienced orthopedic surgeon specializing in sports medicine with over 15 years of practice. She has treated numerous professional athletes and is known for her innovative approaches to sports injury rehabilitation.",
        certifications: [
            "Board Certified - Orthopedic Surgery",
            "Fellowship - Sports Medicine",
            "Advanced Arthroscopy Certification",
            "FRCS (Fellow of the Royal College of Surgeons)"
        ],
        expertise: [
            "ACL Reconstruction",
            "Rotator Cuff Repair",
            "Knee Arthroscopy",
            "Sports Injury Treatment",
            "Joint Replacement",
            "Minimally Invasive Surgery"
        ]
    },
    {
        id: 2,
        name: "Dr. Ahmed Al-Hassan",
        specialty: "Physical Therapy",
        subSpecialty: "Rehabilitation",
        experience: 12,
        rating: 4.8,
        reviews: 189,
        location: "Abu Dhabi",
        hospital: "Abu Dhabi Specialist Hospital",
        languages: ["Arabic", "English", "French"],
        availability: "Available",
        consultationFee: 400,
        education: "DPT, University of Toronto",
        about: "Dr. Ahmed Al-Hassan is a dedicated physical therapist with extensive experience in post-surgical rehabilitation and chronic pain management. He specializes in developing personalized treatment plans for optimal recovery.",
        certifications: [
            "Certified Physical Therapist",
            "Manual Therapy Certification",
            "Sports Rehabilitation Specialist",
            "Dry Needling Certified"
        ],
        expertise: [
            "Post-Surgical Rehabilitation",
            "Manual Therapy",
            "Sports Injuries",
            "Chronic Pain Management",
            "Therapeutic Exercise",
            "Movement Assessment"
        ]
    },
    {
        id: 3,
        name: "Dr. Jennifer Wong",
        specialty: "Neurology",
        subSpecialty: "Pain Management",
        experience: 18,
        rating: 4.9,
        reviews: 312,
        location: "Dubai",
        hospital: "Emirates Healthcare",
        languages: ["English", "Mandarin"],
        availability: "Busy",
        consultationFee: 600,
        education: "MD, PhD, Johns Hopkins",
        about: "Dr. Jennifer Wong is a renowned neurologist specializing in pain management with a research background in neuroscience. She combines evidence-based medicine with compassionate care to help patients manage chronic neurological conditions.",
        certifications: [
            "Board Certified - Neurology",
            "Pain Medicine Certification",
            "Advanced Pain Management",
            "Interventional Pain Procedures"
        ],
        expertise: [
            "Chronic Pain Management",
            "Neuropathic Pain",
            "Headache & Migraine",
            "Nerve Block Procedures",
            "Spinal Cord Stimulation",
            "Medical Cannabis Therapy"
        ]
    },
    {
        id: 4,
        name: "Dr. Mohammed Khalil",
        specialty: "Orthopedics",
        subSpecialty: "Spine Surgery",
        experience: 20,
        rating: 5.0,
        reviews: 456,
        location: "Dubai",
        hospital: "Dubai Medical Center",
        languages: ["Arabic", "English"],
        availability: "Available",
        consultationFee: 700,
        education: "MD, FRCS, Mayo Clinic",
        about: "Dr. Mohammed Khalil is a leading spine surgeon with two decades of experience. He has performed over 3,000 successful spine surgeries and is recognized internationally for his expertise in complex spinal procedures.",
        certifications: [
            "Board Certified - Orthopedic Surgery",
            "Fellowship - Spine Surgery",
            "Minimally Invasive Spine Surgery",
            "Complex Spinal Reconstruction"
        ],
        expertise: [
            "Spinal Fusion",
            "Disc Replacement",
            "Scoliosis Correction",
            "Spinal Deformity",
            "Minimally Invasive Spine Surgery",
            "Revision Spine Surgery"
        ]
    },
    {
        id: 5,
        name: "Dr. Lisa Anderson",
        specialty: "Physical Therapy",
        subSpecialty: "Sports Rehabilitation",
        experience: 10,
        rating: 4.7,
        reviews: 167,
        location: "Sharjah",
        hospital: "Sharjah Medical Complex",
        languages: ["English"],
        availability: "Available",
        consultationFee: 350,
        education: "DPT, University of Melbourne",
        about: "Dr. Lisa Anderson focuses on sports rehabilitation and injury prevention. She works with athletes of all levels to optimize performance and accelerate recovery from sports-related injuries.",
        certifications: [
            "Certified Physical Therapist",
            "Sports Rehabilitation Specialist",
            "Functional Movement Screen",
            "Athletic Training Certification"
        ],
        expertise: [
            "Sports Injury Rehabilitation",
            "Performance Enhancement",
            "Injury Prevention Programs",
            "Return to Sport Testing",
            "Biomechanical Analysis",
            "Strength & Conditioning"
        ]
    },
    {
        id: 6,
        name: "Dr. Raj Patel",
        specialty: "Cardiology",
        subSpecialty: "Interventional",
        experience: 16,
        rating: 4.8,
        reviews: 278,
        location: "Abu Dhabi",
        hospital: "Abu Dhabi Specialist Hospital",
        languages: ["English", "Hindi", "Gujarati"],
        availability: "Off Duty",
        consultationFee: 550,
        education: "MD, FACC, AIIMS Delhi",
        about: "Dr. Raj Patel is an interventional cardiologist specializing in minimally invasive cardiac procedures. He has extensive experience in treating complex coronary artery disease and structural heart conditions.",
        certifications: [
            "Board Certified - Cardiology",
            "Interventional Cardiology Fellowship",
            "Advanced Cardiac Life Support",
            "Complex Coronary Interventions"
        ],
        expertise: [
            "Coronary Angioplasty",
            "Stent Placement",
            "Heart Catheterization",
            "Structural Heart Interventions",
            "Peripheral Vascular Interventions",
            "Complex PCI Procedures"
        ]
    },
    {
        id: 7,
        name: "Dr. Fatima Al-Najjar",
        specialty: "Internal Medicine",
        subSpecialty: "Diabetes & Endocrinology",
        experience: 14,
        rating: 4.9,
        reviews: 201,
        location: "Dubai",
        hospital: "Emirates Healthcare",
        languages: ["Arabic", "English"],
        availability: "Available",
        consultationFee: 450,
        education: "MD, FACE, American University of Beirut",
        about: "Dr. Fatima Al-Najjar specializes in diabetes management and endocrine disorders. She is passionate about helping patients achieve better metabolic health through personalized treatment plans and lifestyle modifications.",
        certifications: [
            "Board Certified - Internal Medicine",
            "Endocrinology Fellowship",
            "Advanced Diabetes Management",
            "Certified Diabetes Educator"
        ],
        expertise: [
            "Diabetes Management",
            "Thyroid Disorders",
            "Metabolic Syndrome",
            "Obesity Medicine",
            "Hormone Replacement Therapy",
            "Osteoporosis Treatment"
        ]
    },
    {
        id: 8,
        name: "Dr. Michael Chen",
        specialty: "Orthopedics",
        subSpecialty: "Joint Replacement",
        experience: 22,
        rating: 4.9,
        reviews: 389,
        location: "Dubai",
        hospital: "Dubai Medical Center",
        languages: ["English", "Mandarin"],
        availability: "Busy",
        consultationFee: 650,
        education: "MD, Stanford University",
        about: "Dr. Michael Chen is a highly skilled orthopedic surgeon specializing in joint replacement procedures. With over 22 years of experience, he has performed thousands of successful hip and knee replacements using the latest surgical techniques.",
        certifications: [
            "Board Certified - Orthopedic Surgery",
            "Fellowship - Joint Replacement",
            "Robotic-Assisted Surgery",
            "Revision Arthroplasty"
        ],
        expertise: [
            "Total Hip Replacement",
            "Total Knee Replacement",
            "Partial Knee Replacement",
            "Revision Joint Surgery",
            "Robotic-Assisted Surgery",
            "Minimally Invasive Arthroplasty"
        ]
    }
];