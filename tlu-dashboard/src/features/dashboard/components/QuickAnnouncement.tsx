// src/features/dashboard/components/QuickAnnouncement.tsx
import React, { useState } from "react";
import Card from "../../../components/common/Card";
import { Send, Megaphone, Loader2 } from "lucide-react";
import type { CourseClass } from "../../../types";
import { NotificationApi, PostRecipientType } from "../../../repository/NotificationApi";

interface Props {
  classes: CourseClass[];
}

export const QuickAnnouncement: React.FC<Props> = ({ classes }) => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!selectedClassId || !message.trim()) {
      alert("Vui lòng chọn lớp và nhập nội dung tin nhắn!");
      return;
    }

    setLoading(true);
    try {
      await NotificationApi.create({
        title: "Thông báo từ Giảng viên",
        content: message,
        recipient_type: PostRecipientType.SPECIFIC_CLASSES,
        course_class_id: selectedClassId
      });
      alert("Đã gửi thông báo thành công!");
      setMessage("");
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert("Gửi thông báo thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm p-6 space-y-6 bg-white rounded-3xl">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
          <Megaphone size={24} />
        </div>
        <div>
          <h3 className="font-black text-slate-900 tracking-tight text-lg">Gửi thông báo nhanh</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gửi tin nhắn tới toàn bộ sinh viên trong lớp</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chọn lớp học phần</label>
          <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            disabled={loading}
            className="w-full bg-slate-50 border border-slate-100 text-sm font-bold p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="">-- Chọn lớp muốn gửi thông báo --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                [{cls.subject.subject_code}] {cls.subject.subject_name} - Lớp {cls.id}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nội dung thông báo</label>
          <textarea 
            placeholder="Nhập nội dung thông báo gửi tới lớp..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            className="w-full h-32 bg-slate-50 border border-slate-100 text-sm p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none transition-all disabled:opacity-50"
          />
        </div>
        
        <button 
          onClick={handleSend}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {loading ? "Đang gửi..." : "Gửi thông báo ngay"}
        </button>
      </div>
    </Card>
  );
};

export default QuickAnnouncement;