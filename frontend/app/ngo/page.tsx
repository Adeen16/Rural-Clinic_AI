"use client";

import { useState } from "react";
import { ArrowLeft, Search, Globe, MapPin, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import NGORegistrationForm from "@/components/ngo/NGORegistrationForm";

// 12 Real Indian Healthcare NGOs
const ngos = [
    {
        id: 1,
        name: "Indian Cancer Society",
        diseases: ["Cancer"],
        description: "Financial aid for underprivileged cancer patients through the Cancer Cure Fund.",
        location: "Pan India",
        website: "https://www.indiancancersociety.org",
        email: "info@indiancancersociety.org"
    },
    {
        id: 2,
        name: "Cancer Patients Aid Association (CPAA)",
        diseases: ["Cancer"],
        description: "Total management of cancer including treatment support for poor patients since 1969.",
        location: "Mumbai, Maharashtra",
        website: "https://www.cancer.org.in",
        email: "cpaa@vsnl.com"
    },
    {
        id: 3,
        name: "Tata Trusts",
        diseases: ["Cancer", "Heart Disease", "Kidney Disease"],
        description: "Medical grants through network of linked hospitals across India.",
        location: "Pan India",
        website: "https://www.tatatrusts.org",
        email: "talktous@tatatrusts.org"
    },
    {
        id: 4,
        name: "Genesis Foundation",
        diseases: ["Heart Disease"],
        description: "Heart surgery support for underprivileged children aged 0-18 years with congenital heart defects.",
        location: "Pan India",
        website: "https://www.genesis-foundation.net",
        email: "info@genesis-foundation.net"
    },
    {
        id: 5,
        name: "Heart Health India Foundation",
        diseases: ["Heart Disease"],
        description: "Fighting heart diseases through awareness, early detection, and patient support.",
        location: "Pan India",
        website: "https://www.hearthealthindia.org",
        email: "contact@hearthealthindia.org"
    },
    {
        id: 6,
        name: "Narmada Kidney Foundation",
        diseases: ["Kidney Disease"],
        description: "Support for kidney patients and promoting organ donation since 1993.",
        location: "Gujarat",
        website: "https://www.narmadakidney.org",
        email: "info@narmadakidney.org"
    },
    {
        id: 7,
        name: "India Renal Foundation",
        diseases: ["Kidney Disease"],
        description: "Dialysis and post-transplant medication assistance through Save a Life program.",
        location: "Pan India",
        website: "https://www.indiarenalfoundation.org",
        email: "contact@indiarenalfoundation.org"
    },
    {
        id: 8,
        name: "SAPNA",
        diseases: ["Kidney Disease"],
        description: "Free medicines and sustained monthly dialysis support for poor patients.",
        location: "Delhi NCR",
        website: "https://www.sapnaindia.org",
        email: "info@sapnaindia.org"
    },
    {
        id: 9,
        name: "Nityaasha Foundation",
        diseases: ["Diabetes"],
        description: "Free insulin, blood glucose strips, and glucometers for underprivileged children with Type 1 Diabetes.",
        location: "Pan India",
        website: "https://www.nityaasha.org",
        email: "info@nityaasha.org"
    },
    {
        id: 10,
        name: "Blue Circle Diabetes Foundation",
        diseases: ["Diabetes"],
        description: "India's largest patient-led diabetes support group focused on education and empowerment.",
        location: "Pan India",
        website: "https://www.bluecircle.foundation",
        email: "hello@bluecircle.foundation"
    },
    {
        id: 11,
        name: "Smile Foundation",
        diseases: ["Cancer", "Heart Disease", "Kidney Disease", "General"],
        description: "General medical financial assistance for various critical treatments.",
        location: "Pan India",
        website: "https://www.smilefoundationindia.org",
        email: "info@smilefoundationindia.org"
    },
    {
        id: 12,
        name: "Saviour Foundation",
        diseases: ["Cancer", "Heart Disease", "Kidney Disease", "General"],
        description: "Financial support for critical and life-saving procedures to low-income communities.",
        location: "Pan India",
        website: "https://www.savioursfoundation.org",
        email: "contact@savioursfoundation.org"
    }
];

// Disease color mapping
const diseaseColors: Record<string, string> = {
    "Cancer": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "Heart Disease": "bg-red-500/20 text-red-400 border-red-500/30",
    "Kidney Disease": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Diabetes": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "General": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export default function NGOPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNGO, setSelectedNGO] = useState<typeof ngos[0] | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const filteredNGOs = ngos.filter(ngo =>
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.diseases.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApply = (ngo: typeof ngos[0]) => {
        setSelectedNGO(ngo);
        setIsFormOpen(true);
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto flex flex-col gap-8">
            <header className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Healthcare NGO Support</h1>
                        <p className="text-text-muted mt-1">Find NGOs that provide financial assistance for your treatment</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by disease (Cancer, Heart, Kidney, Diabetes)..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-text-primary placeholder:text-text-muted transition-colors"
                    />
                </div>

                {/* Quick filter badges */}
                <div className="flex flex-wrap gap-2">
                    {["Cancer", "Heart Disease", "Kidney Disease", "Diabetes"].map((disease) => (
                        <button
                            key={disease}
                            onClick={() => setSearchTerm(searchTerm === disease ? "" : disease)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${searchTerm === disease
                                    ? diseaseColors[disease]
                                    : "bg-surface border-border text-text-muted hover:border-primary/50"
                                }`}
                        >
                            {disease}
                        </button>
                    ))}
                </div>
            </header>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNGOs.length > 0 ? (
                    filteredNGOs.map((ngo, i) => (
                        <Card
                            key={ngo.id}
                            className="hover:border-primary/50 transition-colors animate-fade-up flex flex-col"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <CardContent className="p-6 flex flex-col flex-1">
                                {/* Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Heart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-text-primary leading-tight">{ngo.name}</h3>
                                        <p className="text-sm text-text-muted flex items-center mt-1">
                                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                            {ngo.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Disease Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {ngo.diseases.map((disease) => (
                                        <span
                                            key={disease}
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${diseaseColors[disease] || diseaseColors["General"]}`}
                                        >
                                            {disease}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-text-secondary mb-4 flex-1">
                                    {ngo.description}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2 mt-auto">
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-primary text-white hover:bg-primary-hover"
                                        onClick={() => handleApply(ngo)}
                                    >
                                        Apply for Support
                                    </Button>
                                    <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                                        <Button size="sm" variant="outline" className="flex-initial">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-text-muted">
                        No NGOs found matching "{searchTerm}"
                    </div>
                )}
            </section>

            {/* Registration Form Modal */}
            {isFormOpen && selectedNGO && (
                <NGORegistrationForm
                    ngo={selectedNGO}
                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedNGO(null);
                    }}
                />
            )}
        </main>
    );
}
