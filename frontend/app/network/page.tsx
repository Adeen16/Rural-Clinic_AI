"use client";

import { useState } from "react";
import { ArrowLeft, Search, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function NetworkPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const doctors = [
        { name: "Dr. Sarah Khan", specialty: "Cardiologist", distance: "5km", hospital: "Memorial Hospital", rating: 4.8 },
        { name: "Dr. Amit Patel", specialty: "General Physician", distance: "2km", hospital: "Rural Health Center", rating: 4.9 },
        { name: "Dr. Emily Chen", specialty: "Pediatrician", distance: "12km", hospital: "District Hospital", rating: 4.7 },
        { name: "Dr. James Wilson", specialty: "Orthopedic", distance: "15km", hospital: "City Trauma Center", rating: 4.6 },
        { name: "Dr. Anjali Gupta", specialty: "Gynecologist", distance: "8km", hospital: "Women's Clinic", rating: 4.9 },
        { name: "Dr. Robert Fox", specialty: "Dermatologist", distance: "20km", hospital: "Skin Care Center", rating: 4.5 },
    ];

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-8">
            <header className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Specialist Network</h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by specialty, name, or hospital..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-text-primary placeholder:text-text-muted transition-colors"
                    />
                </div>
            </header>

            <section className="grid md:grid-cols-2 gap-4">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doc, i) => (
                        <Card key={i} className="hover:border-primary/50 transition-colors animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-surface-hover border border-border flex items-center justify-center text-xl font-bold text-text-secondary">
                                    {doc.name.split(" ")[1][0]}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-white">{doc.name}</h3>
                                        <div className="flex items-center text-amber-400 text-sm">
                                            <Star className="w-4 h-4 fill-current mr-1" />
                                            {doc.rating}
                                        </div>
                                    </div>
                                    <p className="text-primary font-medium">{doc.specialty}</p>
                                    <p className="text-sm text-text-muted flex items-center pt-1">
                                        <MapPin className="w-4 h-4 mr-1 opacity-70" />
                                        {doc.distance} • {doc.hospital}
                                    </p>

                                    <div className="pt-4 flex gap-3">
                                        <Button size="sm" className="flex-1 bg-primary text-white hover:bg-primary-hover">
                                            Book Appointment
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-initial">
                                            <Phone className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-text-muted">
                        No specialists found matching "{searchTerm}"
                    </div>
                )}
            </section>
        </main>
    );
}
