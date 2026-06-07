// src/features/attendance/components/EditStatusModal.tsx
import React, { useState } from "react";
// Đảm bảo import type Student từ file định nghĩa chung của bạn
import type { Student } from "../../../types"; 

interface Props {
  student: any;
  // Sử dụng Student["status"] để lấy chính xác các giá trị "present" | "absent" | ...
  currentStatus: Student["status"]; 
  onSave: (newStatus: Student["status"], reason: string) => void;
  onClose: () => void;
}

export const EditStatusModal: React.FC<Props> = ({ student, currentStatus, onSave, onClose }) => {
  // Định nghĩa kiểu cho useState để khớp với Props
  const [newStatus, setNewStatus] = useState<Student["status"]>(currentStatus);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!reason.trim()) {
      setError("Vui lòng nhập lý do điều chỉnh trạng thái điểm danh.");
      return;
    }
    onSave(newStatus, reason);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Điều chỉnh điểm danh</h3>
          <p className="text-sm text-slate-500">Sinh viên: <span className="font-bold">{student.name}</span> ({student.studentId})</p>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái mới</label>
            <select 
              value={newStatus} 
              // Ép kiểu value khi thay đổi để tránh lỗi TS
              onChange={(e) => setNewStatus(e.target.value as Student["status"])}
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="present">Có mặt (Present)</option>
              <option value="absent">Vắng mặt (Absent)</option>
              <option value="late">Đi muộn (Late)</option>
              <option value="ai_verified">AI Verified</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lý do thay đổi</label>
            <textarea 
              value={reason}
              onChange={(e) => {setReason(e.target.value); setError("");}}
              placeholder="Ví dụ: Sinh viên có giấy xác nhận của y tế..."
              className={`w-full p-3 bg-slate-50 border rounded-xl text-sm h-24 outline-none focus:ring-2 transition-all ${
                error ? "border-red-300 focus:ring-red-500" : "border-slate-100 focus:ring-blue-500"
              }`}
            />
            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1">⚠️ {error}</p>}
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 font-bold text-slate-400 hover:text-slate-600 transition-colors">Hủy</button>
          <button onClick={handleSave} className="px-6 py-2 bg-[#1e3a8a] text-white rounded-xl font-bold shadow-lg hover:bg-blue-800 active:scale-95 transition-all">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};