"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    ChartOptions,
} from "chart.js";
import { FC } from "react";

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

// Define the types for the props
interface HistogramProps {
    labels: string[];
    data: number[];
    label: string;
    histogramTitle?: string; // Optional prop for the histogram title
}

const Histogram: FC<HistogramProps> = ({ labels, data, label, histogramTitle }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: "rgba(0,0,0, 0.6)",
                borderColor: "rgba(0,0,0, 1)",
                borderWidth: 1,
                borderRadius: 10, // Rounded corners for the bars
            },
        ],
    };

    // Explicitly type the options object
    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false, // Allow custom height
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false, // Remove vertical grid lines
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true, // Keep horizontal grid lines
                },
            },
        },
        plugins: {
            legend: {
                display: true, // Display the legend
            },
            title: {
                display: !!histogramTitle, // Display title only if provided
                text: histogramTitle, // Title text
                position: "bottom", // Position the title at the bottom
                font: {
                    size: 14, // Adjust font size
                },
            },
        },
    };

    return (
        <div style={{ height: "300px" }}> {/* Set a fixed height for the graph */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Histogram;