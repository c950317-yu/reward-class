import { Student } from "../types";

// Local analysis logic (Gemini API removed)
export const generateClassAnalysis = async (students: Student[]): Promise<string> => {
  // Simulate a short loading delay for better UX
  await new Promise(resolve => setTimeout(resolve, 600));

  if (students.length === 0) {
    return "등록된 학생이 없습니다.";
  }

  const sortedStudents = [...students].sort((a, b) => b.points - a.points);
  const topStudents = sortedStudents.slice(0, 3);
  const totalPoints = students.reduce((sum, s) => sum + s.points, 0);
  const averagePoints = (totalPoints / students.length).toFixed(1);

  const compliments = [
    "모두가 서로 격려하며 성장하는 모습이 정말 보기 좋습니다!",
    "작은 노력들이 모여 큰 성과를 만들고 있어요.",
    "선의의 경쟁을 통해 함께 발전하는 우리 반이 됩시다.",
    "결과도 중요하지만, 과정에서 배우는 점들을 잊지 마세요.",
    "우리 반의 열정이 정말 대단합니다! 이대로 쭉 가볼까요?"
  ];

  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  const leaderNames = topStudents.map(s => s.name).join(', ');

  return `[학급 현황 리포트]

현재 우리 반의 총 상점은 ${totalPoints}점, 평균 점수는 ${averagePoints}점입니다.
상위권 학생들(${leaderNames})이 아주 훌륭한 모습을 보여주고 있네요! 👏

${randomCompliment}
모두 조금만 더 힘내서 목표를 향해 달려가 봐요! 화이팅!`;
};