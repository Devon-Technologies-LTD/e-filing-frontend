"use client";

import { useState, useEffect } from "react";
import Histogram from "./Histogram";
import { Icons } from "@/components/svg/icons";
import { YearSelector, AllCasesFilter, AllFiledCasesFilter } from "@/components/filters/all-cases";
import RightSidebarModal from "@/components/modal-right";

interface Metric {
    id: number;
    title: string;
    total: string;
    lastYear: string;
    color: string;
    description: string;
    districts: { name: string; cases: number }[];
}

interface HearingRecord {
    caseNumber: string;
    parties: string;
    description: string;
    hearingDate: string;
    hearingTime: string;
    displayDate: string;
}

interface CaseMetricProps {
    metric: Metric[];
    hearings: HearingRecord[];
    histogram: {
        labels: string[];
        data: number[];
        label: string;
        histogramTitle: string;
    };
}

export default function CASEMETRIC({ metric, hearings, histogram }: CaseMetricProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
    const [metrics] = useState<Metric[]>(metric);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isModalOpen]);

    const handleCardClick = (metric: Metric) => {
        setSelectedMetric(metric);
        setIsModalOpen(true);
    };

    const MetricCard: React.FC<{ metric: Metric; onClick: () => void }> = ({ metric, onClick }) => {
        return (
            <div className="space-y-6 bg-white shadow-lg rounded-lg">
                <div className={`p-4 ${metric.color} text-black font-semibold rounded-t-lg`}>
                    {metric.title}
                </div>
                <div className="py-5 px-6">
                    <p className="text-2xl text-app-primary font-bold">{metric.total}</p>
                    <span className="flex items-center space-x-2">
                        <Icons.arrowUp className="h-4 w-4" />
                        <p className="text-base text-app-primary">{metric.lastYear} in the last year</p>
                    </span>
                </div>
                <div
                    className="py-2 p-4 text-xs text-black font-bold cursor-pointer"
                    onClick={onClick}
                >
                    <div className="flex items-center space-x-2">
                        <span>View Breakpoint</span>
                        <Icons.rightArrow className="h-4 w-4 text-neutral" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Metrics Grid */}
            <div className="grid py-6 rounded-lg gap-6" style={{
                gridTemplateColumns: `repeat(${metrics.length}, 1fr)`
            }}>
                {metrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} onClick={() => handleCardClick(metric)} />
                ))}
            </div>

            {/* Histogram Section */}
            <div className="flex items-center justify-between bg-white border-b-2 py-3">
                <p className="font-semibold">{histogram.histogramTitle}</p>
                <section className="flex gap-2">
                    <YearSelector />
                    <AllFiledCasesFilter />
                    <AllCasesFilter />
                </section>
            </div>
            <Histogram
                labels={histogram.labels}
                data={histogram.data}
                label={histogram.label}
                histogramTitle={histogram.histogramTitle}
            />

            {/* Conditionally render the hearings section */}
            {hearings.length > 0 && (
                <>
                    <div className="flex items-center justify-between bg-white border-b-2 py-3">
                        <p className="font-semibold">UPCOMING HEARING</p>
                    </div>
                    <div className="space-y-6">
                        {hearings.map((hearing, index) => (
                            <div key={index} className="flex flex-row justify-between items-center">
                                <div className="flex space-x-2 w-2/3 items-center">
                                    <Icons.calender className="h-14 w-14 flex-shrink-0" />
                                    <span className="text-sm font-semibold">
                                        Your hearing for {hearing.caseNumber} ({hearing.parties} - {hearing.description}) is on {hearing.hearingDate} at {hearing.hearingTime}.
                                    </span>
                                </div>
                                <div className="flex row-auto flex-row text-sm text-app-primary space-x-2 w-auto">
                                    <span>{hearing.hearingTime}</span>
                                    <span>{hearing.displayDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {selectedMetric && (
                <RightSidebarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-4">{selectedMetric.title}</h2>
                                <p className="text-base">{selectedMetric.description}</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-2xl text-app-primary font-bold">{selectedMetric.total}</p>
                                    <span className="flex items-center space-x-2 text-app-primary">
                                        <Icons.arrowUp className="h-4 w-4" />
                                        <div>
                                            <span className="font-bold">
                                                {selectedMetric.lastYear} {" "}
                                            </span>
                                            in the last year
                                        </div>
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <AllCasesFilter />
                                </div>
                            </div>

                            <div className={`flex justify-between text-md font-bold p-3 ${selectedMetric.color}`}>
                                <p>DISTRICT</p>
                                <p>NUMBER OF CASES</p>
                            </div>


                            <div className="overflow-y-auto max-h-[400px]">
                                {selectedMetric.districts.map((district, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between border-b-2 p-4"
                                    >
                                        <p>{district.name}</p>
                                        <p>{district.cases}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                </RightSidebarModal>
            )}
        </>
    );
}