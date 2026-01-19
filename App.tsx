import React, { useState, useEffect } from 'react';
import { Student, PointLog, AppTab } from './types';
import RecordTab from './components/RecordTab';
import PodiumTab from './components/PodiumTab';
import { LayoutList, Trophy, GraduationCap } from 'lucide-react';

const STORAGE_KEY_STUDENTS = 'classpoints_students';
const STORAGE_KEY_LOGS = 'classpoints_logs';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.RECORD);
  const [students, setStudents] = useState<Student[]>([]);
  const [logs, setLogs] = useState<PointLog[]>([]);

  // Load data from local storage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEY_STUDENTS);
    const savedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
  }, [logs]);

  const addStudent = (name: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      points: 0,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const removeStudent = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까? 기록된 점수도 사라집니다.')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const updatePoints = (studentId: string, change: number, reason: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, points: s.points + change };
      }
      return s;
    }));

    const student = students.find(s => s.id === studentId);
    if (student) {
      const newLog: PointLog = {
        id: Date.now().toString() + Math.random().toString(),
        studentId,
        studentName: student.name,
        change,
        reason,
        timestamp: Date.now(),
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <GraduationCap size={28} />
            <h1 className="text-xl font-bold tracking-tight">ClassPoints</h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab(AppTab.RECORD)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === AppTab.RECORD
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutList size={18} />
              상점 기록
            </button>
            <button
              onClick={() => setActiveTab(AppTab.PODIUM)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === AppTab.PODIUM
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Trophy size={18} />
              순위표
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === AppTab.RECORD ? (
          <RecordTab
            students={students}
            onUpdatePoints={updatePoints}
            onAddStudent={addStudent}
            onRemoveStudent={removeStudent}
            logs={logs}
          />
        ) : (
          <PodiumTab students={students} />
        )}
      </main>
    </div>
  );
};

export default App;
