"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileImage, Calendar, Tag, Shield, Info, X, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// Scan type options for the dropdown
const scanTypes = [
    { value: "", label: "Select scan type..." },
    { value: "xray", label: "X-Ray" },
    { value: "mri", label: "MRI Scan" },
    { value: "ct", label: "CT Scan" },
    { value: "ultrasound", label: "Ultrasound" },
    { value: "eye-scan", label: "Eye Scan / Retinal Image" },
    { value: "ecg", label: "ECG / Heart Scan" },
    { value: "blood-report", label: "Blood Test Report" },
    { value: "other", label: "Other Medical Document" },
];

// Body region options
const bodyRegions = [
    { value: "", label: "Select region..." },
    { value: "head", label: "Head / Brain" },
    { value: "chest", label: "Chest / Lungs" },
    { value: "abdomen", label: "Abdomen" },
    { value: "spine", label: "Spine / Back" },
    { value: "limbs", label: "Arms / Legs" },
    { value: "eye", label: "Eye" },
    { value: "heart", label: "Heart" },
    { value: "full-body", label: "Full Body" },
    { value: "other", label: "Other" },
];

interface UploadedFile {
    file: File;
    preview: string;
    scanType: string;
    bodyRegion: string;
    scanDate: string;
}

export default function MedicalRecordsPage() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle file selection
    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: UploadedFile[] = Array.from(files).map(file => ({
            file,
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
            scanType: "",
            bodyRegion: "",
            scanDate: "",
        }));

        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    // Update file metadata
    const updateFileMetadata = (index: number, field: keyof UploadedFile, value: string) => {
        setUploadedFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, [field]: value } : f
        ));
    };

    // Remove a file
    const removeFile = (index: number) => {
        setUploadedFiles(prev => {
            const file = prev[index];
            if (file.preview) URL.revokeObjectURL(file.preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    // Mock submit handler
    const handleSubmit = () => {
        // In a real app, this would upload to a server
        // For this prototype, we just show a success message
        setShowSuccess(true);
    };

    const inputClass = "w-full h-10 px-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none text-text-primary text-sm transition-colors";

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <header className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Upload Medical Records</h1>
                        <p className="text-text-muted mt-1">Share your existing scans for clinician review</p>
                    </div>
                </div>

                {/* Privacy Notice */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4 flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-text-primary mb-1">Your Privacy is Protected</p>
                            <ul className="text-text-secondary space-y-1">
                                <li>• Files are stored securely for clinician review only</li>
                                <li>• No automated analysis or AI diagnosis is performed</li>
                                <li>• Uploading does not generate any medical diagnosis</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </header>

            {/* Success Message */}
            {showSuccess && (
                <Card className="border-triage-green bg-triage-green/5 animate-fade-up">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-triage-green/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-triage-green" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-text-primary">Records Submitted Successfully</h3>
                            <p className="text-sm text-text-secondary mt-1">
                                Your medical records have been received. A clinician will review them and contact you if needed.
                            </p>
                            <p className="text-red-500 text-sm mt-1">
                                Currently in Beta version, Soon it will be able to generate AI diagnosis and recommendations based on the uploaded medical records.
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setShowSuccess(false);
                                setUploadedFiles([]);
                            }}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Upload Area */}
            {!showSuccess && (
                <>
                    <section>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
                                ${isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50 hover:bg-surface-hover"
                                }
                            `}
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileSelect(e.target.files)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-text-primary">
                                        Drag and drop your files here
                                    </p>
                                    <p className="text-sm text-text-muted mt-1">
                                        or click to browse • Supports images and PDFs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                <FileImage className="w-5 h-5 text-primary" />
                                Uploaded Files ({uploadedFiles.length})
                            </h2>

                            <div className="space-y-4">
                                {uploadedFiles.map((upload, index) => (
                                    <Card key={index} className="animate-fade-up">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-4">
                                                {/* Preview or Icon */}
                                                <div className="w-20 h-20 rounded-lg bg-surface-hover border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {upload.preview ? (
                                                        <img
                                                            src={upload.preview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <FileImage className="w-8 h-8 text-text-muted" />
                                                    )}
                                                </div>

                                                {/* File Info & Metadata */}
                                                <div className="flex-1 min-w-0 space-y-3">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-text-primary truncate">
                                                                {upload.file.name}
                                                            </p>
                                                            <p className="text-xs text-text-muted">
                                                                {(upload.file.size / 1024).toFixed(1)} KB
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="flex-shrink-0 text-text-muted hover:text-destructive"
                                                            onClick={() => removeFile(index)}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Metadata Fields */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                        <div>
                                                            <label className="flex items-center gap-1 text-xs text-text-muted mb-1">
                                                                <Tag className="w-3 h-3" />
                                                                Scan Type
                                                            </label>
                                                            <select
                                                                value={upload.scanType}
                                                                onChange={(e) => updateFileMetadata(index, "scanType", e.target.value)}
                                                                className={inputClass}
                                                            >
                                                                {scanTypes.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-1 text-xs text-text-muted mb-1">
                                                                <Info className="w-3 h-3" />
                                                                Body Region
                                                            </label>
                                                            <select
                                                                value={upload.bodyRegion}
                                                                onChange={(e) => updateFileMetadata(index, "bodyRegion", e.target.value)}
                                                                className={inputClass}
                                                            >
                                                                {bodyRegions.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-1 text-xs text-text-muted mb-1">
                                                                <Calendar className="w-3 h-3" />
                                                                Date of Scan
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={upload.scanDate}
                                                                onChange={(e) => updateFileMetadata(index, "scanDate", e.target.value)}
                                                                className={inputClass}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-primary text-white hover:bg-primary-hover"
                                >
                                    Submit for Review
                                </Button>
                            </div>
                        </section>
                    )}

                    {/* Info Section */}
                    <section>
                        <Card className="bg-surface-hover/50">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Info className="w-4 h-4 text-primary" />
                                    What happens next?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-text-secondary space-y-2">
                                <p>1. Your files are securely stored for clinician review</p>
                                <p>2. A healthcare professional will review your records</p>
                                <p>3. You may be contacted for follow-up if needed</p>
                                <p className="pt-2 text-text-muted italic">
                                    Note: This is a document intake service only. No automated diagnosis is provided.
                                </p>
                            </CardContent>
                        </Card>
                    </section>
                </>
            )}
        </main>
    );
}
