import Link from "next/link";
import { CheckCircle, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NGOSuccessPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6 animate-fade-up">
                {/* Success Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-triage-green/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-triage-green" />
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-text-primary">
                        Application Submitted Successfully!
                    </h1>
                    <p className="text-text-secondary">
                        Thank you for submitting your application. The NGO will review your details and contact you soon.
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-surface border border-border rounded-xl p-4 text-left">
                    <h3 className="font-medium text-text-primary mb-2">What happens next?</h3>
                    <ul className="text-sm text-text-muted space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>The NGO will review your application within 5-7 business days</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>You may be contacted for additional documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>The decision will be communicated via email or phone</span>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/ngo" className="flex-1">
                        <Button className="w-full bg-primary text-white hover:bg-primary-hover">
                            Browse More NGOs
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
