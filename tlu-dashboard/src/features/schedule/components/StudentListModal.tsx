import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, GraduationCap, Search, Loader2 } from "lucide-react";
import { CourseClassApi } from "../../../repository/CourseClassApi";
import type { ClassStudent } from "../../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  className: string;
}

const StudentListModal: React.FC<Props> = ({ isOpen, onClose, classId, className }) => {
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && classId) {
      const fetchStudents = async () => {
        setLoading(true);
        try {
          const data = await CourseClassApi.getStudentsByClass(classId);
          setStudents(data);
        } catch (error) {
          console.error("Failed to fetch students:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStudents();
    }
  }, [isOpen, classId]);

  const filteredStudents = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Danh sách sinh viên
                </h2>
                <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                  <GraduationCap size={16} className="text-blue-500" />
                  {className} (Lớp: {classId})
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Toolbar */}
            <div className="p-4 border-b border-slate-50 flex items-center gap-4 bg-white">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mã sinh viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-sm font-medium transition-all"
                />
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                {filteredStudents.length} Sinh viên
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-blue-500" size={40} />
                  <p className="text-slate-400 font-bold text-sm animate-pulse">Đang tải dữ liệu...</p>
                </div>
              ) : filteredStudents.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {filteredStudents.map((student) => (
                    <motion.div
                      layout
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex items-center gap-4 p-2 px-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all duration-300"
                    >
                      {/* 1. Avatar */}
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-white shadow-sm">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt={student.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                            <User size={14} />
                          </div>
                        )}
                      </div>

                      {/* 2. Primary Info (Name & Code) */}
                      <div className="w-[180px] shrink-0">
                        <h4 className="text-[13px] font-black text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                          {student.full_name}
                        </h4>
                      </div>

                      <div className="w-[100px] shrink-0">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">
                          {student.student_code}
                        </span>
                      </div>

                      {/* 3. Class Info */}
                      <div className="w-[80px] shrink-0 text-center">
                        <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-lg border border-blue-100">
                          {student.class_name}
                        </span>
                      </div>

                      {/* 4. Contact Info (Horizontal) */}
                      <div className="w-[240px] shrink-0 flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <Mail size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>

                      <div className="flex-1 flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <Phone size={12} className="text-slate-400 shrink-0" />
                        <span>{student.phone_number}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <User size={48} className="mb-4 opacity-20" />
                  <p className="font-bold">Không tìm thấy sinh viên nào</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.1em] rounded-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudentListModal;
