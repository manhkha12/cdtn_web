// src/features/communication/components/ComposeAnnouncementForm.tsx
import React, { useState } from "react";
import { Bold, Italic, List, Link, Paperclip, Send, Loader2 } from "lucide-react";
import type { CourseClass } from "../../../types";
import { NotificationApi, PostRecipientType } from "../../../repository/NotificationApi";
import toast from "react-hot-toast";

interface Props {
  classes: CourseClass[];
}

export const ComposeAnnouncementForm: React.FC<Props> = ({ classes }) => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!selectedClassId || !message.trim() || !subject.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      await NotificationApi.create({
        title: subject,
        content: message,
        recipient_type: PostRecipientType.SPECIFIC_CLASSES,
        course_class_id: selectedClassId
      });
      toast.success("Đã gửi thông báo thành công!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("Gửi thông báo thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">Soạn thông báo mới</h2>
          <p className="text-sm text-slate-400 font-medium">Gửi tin nhắn broadcast tới toàn bộ sinh viên trong lớp học phần</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Chọn lớp học</label>
            <select 
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="">-- Chọn lớp học phần --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  [{cls.subject.subject_code}] {cls.subject.subject_name} - Lớp {cls.id}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Mức độ ưu tiên</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsUrgent(false)}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${!isUrgent ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
              >
                THƯỜNG
              </button>
              <button 
                onClick={() => setIsUrgent(true)}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${isUrgent ? 'bg-red-50 text-red-600 border-2 border-red-200' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
              >
                KHẨN CẤP
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề thông báo</label>
          <input 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="Ví dụ: Thay đổi thời hạn nộp bài tập số 3" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung chi tiết</label>
          <div className="border border-slate-100 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <div className="bg-slate-50/80 px-4 py-3 flex gap-5 border-b border-slate-100 text-slate-400">
              <Bold size={18} className="cursor-pointer hover:text-slate-600" />
              <Italic size={18} className="cursor-pointer hover:text-slate-600" />
              <List size={18} className="cursor-pointer hover:text-slate-600" />
              <Link size={18} className="cursor-pointer hover:text-slate-600" />
              <div className="w-px h-5 bg-slate-200 self-center mx-1"></div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                <Paperclip size={16}/> Đính kèm tệp
              </button>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-5 h-64 outline-none text-sm font-medium resize-none bg-white"
              placeholder="Nhập nội dung thông báo tại đây..."
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50/80 p-6 flex justify-between items-center border-t border-slate-100">
        <button className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">Lưu bản nháp</button>
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black text-xs flex items-center gap-2 shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.98] uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          <span>{loading ? "Đang gửi..." : "Gửi thông báo ngay"}</span>
        </button>
      </div>
    </div>
  );
};