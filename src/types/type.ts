// @/types/type.ts
export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    subSpecialty?: string;
    experience: number;
    rating: number;
    reviews: number;
    location: string;
    hospital: string;
    languages: string[];
    availability: "Available" | "Busy" | "Off Duty";
    consultationFee: number;
    education: string;
    about?: string;
    certifications?: string[];
    expertise?: string[];
}