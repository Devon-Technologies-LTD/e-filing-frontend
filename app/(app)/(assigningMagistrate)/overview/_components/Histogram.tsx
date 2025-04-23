"use client";

import { FC } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface HistogramProps {
    labels: string[];
    data: number[];
    label: string;
    histogramTitle?: string;
}

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: any;
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border px-2 py-1 rounded shadow text-sm">
                <p>{`Value: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const Histogram: FC<HistogramProps> = ({ labels, data, label, histogramTitle }) => {
    const chartData = labels.map((labelText, index) => ({
        name: labelText,
        value: data[index],
    }));
    return (
        <div className="h-[300px]">
            {histogramTitle && (
                <h3 className="text-center text-sm font-semibold mb-2">{histogramTitle}</h3>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}  cursor={false}   />
                    <Legend />
                    <Bar
                        dataKey="value"
                        name={label}
                        barSize={60}
                        fill="#EB963F"
                        radius={[10, 10, 0, 0]} // Rounded top corners
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Histogram;
