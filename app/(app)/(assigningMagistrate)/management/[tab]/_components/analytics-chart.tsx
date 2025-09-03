"use client";
import { BarChart, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  label: string;
  value: number;
}

interface AnalyticsChartProps {
  data: ChartData[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-lg border">
        <p className="font-medium">{label}</p>
        <p className="text-[#F4C674]">
          Cases: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Custom label formatter for X-axis
const formatXAxisLabel = (value: string) => {
  // Split long labels into multiple lines
  const words = value.split(' ');
  if (words.length > 2) {
    const mid = Math.ceil(words.length / 2);
    return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
  }
  return value;
};

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Format data for Recharts
  const chartData = data.map(item => ({
    name: item.label,
    cases: item.value,
    fullName: item.label
  }));

  const totalCases = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between gap-2 p-4 w-full bg-[#FDF7F5] hover:bg-[#FDF7F5]/80 transition-colors duration-200"
      >
        <span className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-[#E4A853]" />
          <span className="font-extrabold text-gray-800">Analytics</span>
        </span>
        <ChevronDown
          className={`transition-transform duration-200 h-4 w-4 text-gray-600 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-6 space-y-6 bg-white">
        <h3 className="font-semibold text-sm text-gray-700">
          Individual Performance Metric
        </h3>
        
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                tick={{ 
                  fontSize: 12, 
                  fill: '#667185',
                  fontWeight: 600
                }}
                interval={0}
                angle={0}
                textAnchor="middle"
                height={60}
                tickFormatter={formatXAxisLabel}
              />
              <YAxis
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                tick={{ 
                  fontSize: 12, 
                  fill: '#475367',
                  fontWeight: 500
                }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(228, 168, 83, 0.1)' }}
              />
              <Bar
                dataKey="cases"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F4C674" />
                  <stop offset="100%" stopColor="#E4A853" />
                </linearGradient>
              </defs>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend/Summary */}
        <div className="flex flex-wrap items-center justify-between  border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-t from-[#E4A853] to-[#F4C674] rounded-sm"></div>
              <span className="text-sm text-gray-600 font-medium">Case Statistics</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 font-semibold">
            Total Cases: <span className="text-[#E4A853]">{totalCases.toLocaleString()}</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}