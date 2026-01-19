import React, { useMemo, useState } from 'react';
import { Student } from '../types';
import { Crown, Medal, Sparkles, Trophy, ClipboardList } from 'lucide-react';
import { generateClassAnalysis } from '../services/geminiService';

interface PodiumTabProps {
  students: Student[];
}

const PodiumTab: React.FC<PodiumTabProps> = ({ students }) => {
  const [analysisMessage, setAnalysisMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => b.points - a.points);
  }, [students]);

  const topThree = sortedStudents.slice(0, 3);
  const others = sortedStudents.slice(3);

  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  const handleAnalysis = async () => {
    setLoading(true);
    setAnalysisMessage(null);
    const message = await generateClassAnalysis(students);
    setAnalysisMessage(message);
    setLoading(false);
  };

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Trophy size={48} className="mb-4 opacity-50" />
        <p>아직 등록된 학생이 없습니다.</p>
        <p className="text-sm">기록 탭에서 학생을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-10">
      
      {/* Analysis Section */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalysis}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {loading ? (
            <span className="animate-pulse">분석 중...</span>
          ) : (
            <>
              <ClipboardList size={16} />
              학급 분석 리포트
            </>
          )}
        </button>
      </div>

      {analysisMessage && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-6 rounded-2xl relative">
          <div className="absolute top-0 left-0 -translate-x-3 -translate-y-3 bg-white p-2 rounded-full shadow-sm border border-purple-100">
            <Sparkles className="text-purple-500" size={24} />
          </div>
          <h3 className="text-purple-900 font-bold mb-2">선생님 리포트</h3>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{analysisMessage}</p>
        </div>
      )}

      {/* The Podium Visual */}
      <div className="flex justify-center items-end h-80 gap-4 mb-12 px-4">
        {/* 2nd Place */}
        {second && (
          <div className="flex flex-col items-center w-1/3 max-w-[150px] animate-[slideUp_0.6s_ease-out_0.2s_both]">
            <div className="mb-2 flex flex-col items-center">
              <span className="font-bold text-slate-700 text-lg truncate w-full text-center">{second.name}</span>
              <span className="text-slate-500 text-sm">{second.points}점</span>
            </div>
            <div className="w-full h-48 bg-gradient-to-t from-slate-300 to-slate-200 rounded-t-lg shadow-lg flex flex-col justify-start items-center pt-4 relative border-t-4 border-slate-400">
              <Medal className="text-slate-500 w-10 h-10 drop-shadow-sm" />
              <span className="text-4xl font-black text-slate-400/30 mt-2">2</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {first && (
          <div className="flex flex-col items-center w-1/3 max-w-[160px] z-10 animate-[slideUp_0.6s_ease-out_both]">
            <div className="mb-2 flex flex-col items-center">
              <Crown className="text-yellow-500 w-8 h-8 mb-1 animate-bounce" />
              <span className="font-bold text-slate-800 text-xl truncate w-full text-center">{first.name}</span>
              <span className="text-yellow-600 font-bold">{first.points}점</span>
            </div>
            <div className="w-full h-64 bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-t-lg shadow-xl flex flex-col justify-start items-center pt-6 relative border-t-4 border-yellow-400">
              <Trophy className="text-yellow-500 w-12 h-12 drop-shadow-md" />
              <span className="text-5xl font-black text-yellow-500/30 mt-2">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {third && (
          <div className="flex flex-col items-center w-1/3 max-w-[150px] animate-[slideUp_0.6s_ease-out_0.4s_both]">
            <div className="mb-2 flex flex-col items-center">
              <span className="font-bold text-slate-700 text-lg truncate w-full text-center">{third.name}</span>
              <span className="text-slate-500 text-sm">{third.points}점</span>
            </div>
            <div className="w-full h-32 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-lg shadow-lg flex flex-col justify-start items-center pt-4 relative border-t-4 border-orange-300">
              <Medal className="text-orange-500 w-10 h-10 drop-shadow-sm" />
              <span className="text-4xl font-black text-orange-500/30 mt-2">3</span>
            </div>
          </div>
        )}
      </div>

      {/* List of others */}
      {others.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-600">
            전체 순위
          </div>
          <ul className="divide-y divide-slate-50">
            {others.map((student, index) => (
              <li key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-sm">
                    {index + 4}
                  </span>
                  <span className="font-medium text-slate-800">{student.name}</span>
                </div>
                <div className="font-bold text-slate-600">{student.points}점</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PodiumTab;