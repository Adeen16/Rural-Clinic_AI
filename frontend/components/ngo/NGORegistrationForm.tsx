"use client";

import { useState } from "react";
import { X, Upload, User, Phone, Mail, MapPin, FileText, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface NGORegistrationFormProps {
    ngo: {
        id: number;
        name: string;
        diseases: string[];
        email: string;
    };
    onClose: () => void;
}

export default function NGORegistrationForm({ ngo, onClose }: NGORegistrationFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        // Patient Demographics
        fullName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        // Medical Information
        diagnosis: "",
        doctorName: "",
        hospitalName: "",
        // Financial Information
        annualIncome: "",
        hasInsurance: "",
        statementOfNeed: "",
    });

    const [files, setFiles] = useState<{
        prescription: File | null;
        medicalReport: File | null;
    }>({
        prescription: null,
        medicalReport: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "prescription" | "medicalReport") => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [field]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Navigate to success page
        router.push("/ngo/success");
    };

    const inputClass = "w-full h-11 px-4 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none text-text-primary placeholder:text-text-muted transition-colors";
    const labelClass = "block text-sm font-medium text-text-secondary mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary">Apply for Support</h2>
                        <p className="text-sm text-text-muted">Submitting to: {ngo.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-surface transition-colors"
                    >
                        <X className="w-5 h-5 text-text-muted" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Patient Demographics */}
                    <section>
                        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Patient Demographics
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        max="120"
                                        placeholder="Age"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Gender *</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Phone Number *</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+91 98765 43210"
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="your@email.com"
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Address *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your full address"
                                        rows={2}
                                        className={`${inputClass} h-auto py-2.5 pl-10 resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Medical Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Medical Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className={labelClass}>Diagnosis / Condition *</label>
                                <input
                                    type="text"
                                    name="diagnosis"
                                    value={formData.diagnosis}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., Stage 2 Breast Cancer, Chronic Kidney Disease"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Doctor's Name</label>
                                <input
                                    type="text"
                                    name="doctorName"
                                    value={formData.doctorName}
                                    onChange={handleInputChange}
                                    placeholder="Dr. Name"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Hospital / Clinic Name</label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleInputChange}
                                    placeholder="Hospital name"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Prescription (Optional)</label>
                                <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                                    <Upload className="w-5 h-5 text-text-muted" />
                                    <span className="text-sm text-text-muted truncate">
                                        {files.prescription ? files.prescription.name : "Upload prescription"}
                                    </span>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange(e, "prescription")}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className={labelClass}>Medical Report (Optional)</label>
                                <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                                    <Upload className="w-5 h-5 text-text-muted" />
                                    <span className="text-sm text-text-muted truncate">
                                        {files.medicalReport ? files.medicalReport.name : "Upload medical report"}
                                    </span>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange(e, "medicalReport")}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Financial Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-primary" />
                            Financial Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Annual Household Income *</label>
                                <select
                                    name="annualIncome"
                                    value={formData.annualIncome}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                >
                                    <option value="">Select income range</option>
                                    <option value="below-1lakh">Below ₹1 Lakh</option>
                                    <option value="1-3lakh">₹1 - 3 Lakhs</option>
                                    <option value="3-5lakh">₹3 - 5 Lakhs</option>
                                    <option value="5-10lakh">₹5 - 10 Lakhs</option>
                                    <option value="above-10lakh">Above ₹10 Lakhs</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Do you have existing insurance? *</label>
                                <select
                                    name="hasInsurance"
                                    value={formData.hasInsurance}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                >
                                    <option value="">Select</option>
                                    <option value="no">No</option>
                                    <option value="yes-partial">Yes, but partial coverage</option>
                                    <option value="yes-full">Yes, full coverage</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Brief Statement of Need *</label>
                                <textarea
                                    name="statementOfNeed"
                                    value={formData.statementOfNeed}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Please describe your situation and why you need financial assistance..."
                                    rows={4}
                                    className={`${inputClass} h-auto py-2.5 resize-none`}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-primary text-white hover:bg-primary-hover"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
