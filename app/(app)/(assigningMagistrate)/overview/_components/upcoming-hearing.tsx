import React, { useEffect, useState } from "react";
import { Icons } from "@/components/svg/icons";
import { getHearing } from "@/lib/actions/admin-file";

interface Hearing {
    id: string;
    casefile_id: string;
    hearing_date: string;
    hearing_time: string;
    other_details: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function UpcomingHearing() {
    const [hearings, setHearings] = useState<Hearing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHearings = async () => {
            setLoading(true);
            try {
                const response = await getHearing();
                if (response.success) {
                    setHearings(response.data || []);
                } else {
                    throw new Error(response.message || "Failed to fetch hearings");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchHearings();
        const interval = setInterval(fetchHearings, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <>
        <div className="space-y-1 p-4 flex justify-between items-center">
            <div className="h-6 w-1/3 bg-gray-300 rounded" />{" "}
            <div className="max-w-lg space-y-2">
                <div className="h-6 w-3/4 bg-gray-300 rounded" /> {/* Title */}
                <div className="flex items-center justify-between">
                    <div className="h-4 w-1/3 bg-gray-300 rounded" />{" "}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-300 rounded" /> {/* "Filed on" */}
                <div className="h-5 w-32 bg-gray-300 rounded" /> {/* Date */}
            </div>
        </div></>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (hearings.length === 0) return <p>No upcoming hearings.</p>;

    console.log("hearings  => hearings " + JSON.stringify( hearings));
    return (
        <div className="mb-36">
            <div className="flex items-center justify-between bg-white border-b-2 py-3">
                <p className="font-semibold container">UPCOMING HEARING</p>
            </div>
            <div className="space-y-6 container">
                {hearings.map((hearing) => (
                    <div
                        key={hearing.id}
                        className="flex my-4 py-4 hover:border-b-app-primary hover:bg-gray-300 cursor-pointer border-b-2 flex-row justify-between items-center"
                    >
                        <div className="flex space-x-2 w-2/3 items-center">
                            <Icons.calender className="size-10 flex-shrink-0" />
                            <span className="text-sm">
                                Your hearing (Case ID: {hearing.casefile_id}) is on {hearing.hearing_date} at {hearing.hearing_time}. {hearing.other_details && `Details: ${hearing.other_details}`}
                            </span>
                        </div>
                        <div className="flex row-auto flex-row text-sm text-app-primary space-x-2 w-auto">
                            <span>{hearing.hearing_time}</span>
                            <span>{hearing.hearing_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
