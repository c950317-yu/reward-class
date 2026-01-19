import React, { useState } from 'react';
import { Student, PointLog } from '../types';
import { Plus, Minus, Trash2, UserPlus, History } from 'lucide-react';

interface RecordTabProps {
  students: Student[];
  onUpdatePoints: (studentId: string, change: number, reason: string) => void;
  onAddStudent: (name: string) => void;
  onRemoveStudent: (id: string) => void;
  logs: PointLog[];
}

const RecordTab: React.FC<RecordTabProps> = ({ 
  students, 
  onUpdatePoints, 
  onAddStudent, 
  onRemoveStudent,
  logs 
}) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [customReason, setCustomReason] = useState('수업 태도 우수');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      onAddStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Student List */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Add Student Form */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <form onSubmit={handleAddSubmit} className="flex gap-2">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="새로운 학생 이름 입력..."
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-colors"
            >
              <UserPlus size={18} />
              추가
            </button>
          </form>
        </div>

        {/* Action Bar (Reason Setting) */}
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
          <span className="font-semibold px-2">포인트 사유:</span>
          <input 
            type="text" 
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="flex-1 bg-transparent border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1"
            placeholder="예: 발표 우수, 숙제 완료..."
          />
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.length === 0 ? (
            <div className="col-span-full text-center py-10 text-slate-400">
              학생을 등록해주세요.
            </div>
          ) : (
            students.map((student) => (
              <div key={student.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {student.name.slice(0, 1)}
                    </div>
                    <span className="font-medium text-lg text-slate-800">{student.name}</span>
                  </div>
                  <span className={`font-bold text-xl ${student.points >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                    {student.points}
                  </span>
                </div>
                
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onUpdatePoints(student.id, 1, customReason)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="+1점"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => onUpdatePoints(student.id, 3, `대박! ${customReason}`)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-bold text-sm"
                      title="+3점"
                    >
                      +3
                    </button>
                    <button
                      onClick={() => onUpdatePoints(student.id, 5, `완벽해! ${customReason}`)}
                      className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-bold text-sm"
                      title="+5점"
                    >
                      +5
                    </button>
                  </div>

                  <div className="h-4 w-px bg-slate-200 mx-1"></div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => onUpdatePoints(student.id, -1, '경고')}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="-1점"
                    >
                      <Minus size={18} />
                    </button>
                    <button
                      onClick={() => onRemoveStudent(student.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors ml-1"
                      title="학생 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Recent Activity Log */}
      <div className="lg:col-span-1">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-full max-h-[80vh] overflow-y-auto sticky top-4">
          <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold border-b border-slate-100 pb-2">
            <History size={20} />
            <span>최근 기록</span>
          </div>
          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">아직 기록이 없습니다.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="text-sm flex flex-col gap-1 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-800">{log.studentName}</span>
                    <span className={log.change > 0 ? 'text-blue-600' : 'text-red-500'}>
                      {log.change > 0 ? '+' : ''}{log.change}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>{log.reason}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordTab;
