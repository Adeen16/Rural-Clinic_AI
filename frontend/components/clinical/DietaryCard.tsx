import { Apple, Ban, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface DietaryCardProps {
    advice: {
        recommended_foods: string[];
        foods_to_avoid: string[];
        daily_habit: string;
    };
}

export function DietaryCard({ advice }: DietaryCardProps) {
    if (!advice) return null;

    return (
        <Card className="p-6 space-y-6 border-l-4 border-l-emerald-500 bg-emerald-500/5">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Apple className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider">
                        Patient Care Plan
                    </h3>
                    <h2 className="text-xl font-bold text-white">
                        Sahi Khaana (Diet & Habits)
                    </h2>
                </div>
            </div>

            {/* Show detailed columns ONLY if we have data */}
            {(advice.recommended_foods.length > 0 || advice.foods_to_avoid.length > 0) ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Recommended Foods */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Recommended Foods (Khaiye)
                        </h4>
                        <ul className="space-y-2">
                            {advice.recommended_foods.map((food, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50" />
                                    {food}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Avoid Foods */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            Foods to Avoid (Na Khaiye)
                        </h4>
                        <ul className="space-y-2">
                            {advice.foods_to_avoid.map((food, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/50" />
                                    {food}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 border-dashed">
                    <p className="text-emerald-200/80 text-sm">
                        Specific dietary recommendations require a confirmed diagnosis.
                    </p>
                </div>
            )}

            {/* Daily Habit Tip */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-emerald-200 mb-1">Daily Healthy Habit</h4>
                    <p className="text-sm text-emerald-100/80 italic">
                        "{advice.daily_habit}"
                    </p>
                </div>
            </div>
        </Card>
    );
}
