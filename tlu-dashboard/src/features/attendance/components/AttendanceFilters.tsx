// import React from "react";
// import { Search, Settings } from "lucide-react";

// interface FilterTab {
//   id: string;
//   label: string;
//   count: number;
// }

// interface AttendanceFiltersProps {
//   searchValue: string;
//   onSearchChange: (value: string) => void;
//   activeFilter: string;
//   onFilterChange: (filterId: string) => void;
//   filters: FilterTab[];
// }

// export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
//   searchValue,
//   onSearchChange,
//   activeFilter,
//   onFilterChange,
//   filters,
// }) => {
//   return (
//     <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/40 mb-8 space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center gap-6">
//         {/* Search Bar */}
//         <div className="flex-1 relative group">
//           <Search
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors"
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search students by name, ID or email..."
//             value={searchValue}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 transition-all"
//           />
//         </div>

//         {/* Filter Selection */}
//         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
//           <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
//             {filters.map((filter) => (
//               <button
//                 key={filter.id}
//                 onClick={() => onFilterChange(filter.id)}
//                 className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
//                   activeFilter === filter.id
//                     ? "bg-white text-red-600 shadow-md shadow-red-500/10 ring-1 ring-red-500/10"
//                     : "text-slate-400 hover:text-slate-600 hover:bg-white"
//                 }`}
//               >
//                 {filter.label}
//                 <span className={`px-2 py-0.5 rounded-md text-[10px] ${
//                   activeFilter === filter.id ? "bg-red-50 text-red-600" : "bg-slate-200 text-slate-500"
//                 }`}>
//                   {filter.count}
//                 </span>
//               </button>
//             ))}
//           </div>
          
//           <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all">
//             <Settings size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceFilters;
