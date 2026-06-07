import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import type { AttendanceChartData } from "../../../repository/StatisticsApi";
import { BarChart3 } from "lucide-react";

interface Props {
  data: AttendanceChartData | null;
  loading: boolean;
}

const AttendanceChartWidget: React.FC<Props> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px] animate-pulse">
        <div className="w-1/4 h-6 bg-slate-100 rounded-lg mb-8" />
        <div className="w-full h-64 bg-slate-50 rounded-2xl" />
      </div>
    );
  }

  // Transform data for Recharts
  const chartData = (data?.labels || []).map((label, index) => {
    const item: any = { name: label };
    (data?.datasets || []).forEach((dataset) => {
      item[dataset.label] = dataset.data?.[index];
    });
    return item;
  });

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <BarChart3 size={20} />
          </div>
          <h3 className="font-black text-slate-900 tracking-tight text-lg">Phân loại chuyên cần</h3>
        </div>
        <select className="bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500">
          <option>Học kỳ này</option>
          <option>Tháng này</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              labelStyle={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}
            />
            <Bar 
              dataKey="Số sinh viên" 
              radius={[10, 10, 10, 10]} 
              barSize={40}
            >
              {(chartData || []).map((_, index) => (
                <Cell key={`cell-${index}`} fill={data?.datasets?.[0]?.backgroundColor?.[index] || '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex gap-6 justify-center">
        {(data?.labels || []).map((label, index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: data?.datasets?.[0]?.backgroundColor?.[index] }}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChartWidget;
