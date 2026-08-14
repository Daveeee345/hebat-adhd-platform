export type NeedLabel = 'Low' | 'Moderate' | 'High';

export interface ObservationRecord {
  id: string;
  childId: string;
  authorRole: 'teacher' | 'parent';
  authorName: string;
  createdAt: string;
  attention: 'good' | 'some' | 'significant';
  taskCompletion: 'completed' | 'partial' | 'not_completed';
  promptLevel: 'none' | 'one_two' | 'frequent';
  transition: 'smooth' | 'prompt' | 'difficult';
  note?: string;
}

export interface FocusSessionRecord {
  id: string;
  childId: string;
  createdAt: string;
  assignedMinutes: number;
  completedMinutes: number;
  completed: boolean;
}

export interface RoutineSessionRecord {
  id: string;
  childId: string;
  createdAt: string;
  routineId: string;
  completedSteps: number;
  totalSteps: number;
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const labelFor = (score: number): NeedLabel => score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low';

const average = (values: number[], fallback = 0) => values.length ? values.reduce((a, b) => a + b, 0) / values.length : fallback;

export function calculateSupportProfile(
  observations: ObservationRecord[],
  focusSessions: FocusSessionRecord[],
  routines: RoutineSessionRecord[]
) {
  const hasAnyData = observations.length > 0 || focusSessions.length > 0 || routines.length > 0;
  if (!hasAnyData) {
    const domains = [
      { key: 'task_persistence', label: 'Task Persistence', score: 0, need: 'Low' as NeedLabel },
      { key: 'attention', label: 'Attention Support', score: 0, need: 'Low' as NeedLabel },
      { key: 'routine', label: 'Routine Support', score: 0, need: 'Low' as NeedLabel },
      { key: 'working_memory', label: 'Working Memory', score: 0, need: 'Low' as NeedLabel },
      { key: 'transition', label: 'Transition Support', score: 0, need: 'Low' as NeedLabel },
    ];
    return { domains, priorityKey: 'task_persistence', updatedAt: new Date().toISOString(), dataStatus: 'baseline_needed' as const };
  }
  const recentObs = observations.slice(0, 12);
  const attention = average(recentObs.map(o => o.attention === 'good' ? 10 : o.attention === 'some' ? 55 : 90), 45);
  const task = average(recentObs.map(o => o.taskCompletion === 'completed' ? 10 : o.taskCompletion === 'partial' ? 55 : 95), 50);
  const prompts = average(recentObs.map(o => o.promptLevel === 'none' ? 10 : o.promptLevel === 'one_two' ? 50 : 90), 45);
  const transition = average(recentObs.map(o => o.transition === 'smooth' ? 10 : o.transition === 'prompt' ? 55 : 90), 45);

  const successfulFocus = focusSessions.filter(s => s.completed).slice(0, 10);
  const focusAvg = average(successfulFocus.map(s => s.completedMinutes), 7);
  const focusNeed = clamp(100 - (focusAvg / 15) * 100);

  const recentRoutines = routines.slice(0, 10);
  const routineRate = average(recentRoutines.map(r => r.totalSteps ? r.completedSteps / r.totalSteps : 0), 0.65);
  const routineNeed = clamp(100 - routineRate * 100);

  const taskPersistence = clamp(task * 0.45 + prompts * 0.35 + focusNeed * 0.20);
  const attentionNeed = clamp(attention * 0.70 + focusNeed * 0.30);
  const transitionNeed = clamp(transition);
  const workingMemoryNeed = clamp(task * 0.40 + prompts * 0.30 + 10);

  const domains = [
    { key: 'task_persistence', label: 'Task Persistence', score: taskPersistence, need: labelFor(taskPersistence) },
    { key: 'attention', label: 'Attention Support', score: attentionNeed, need: labelFor(attentionNeed) },
    { key: 'routine', label: 'Routine Support', score: routineNeed, need: labelFor(routineNeed) },
    { key: 'working_memory', label: 'Working Memory', score: workingMemoryNeed, need: labelFor(workingMemoryNeed) },
    { key: 'transition', label: 'Transition Support', score: transitionNeed, need: labelFor(transitionNeed) },
  ];

  const priority = [...domains].sort((a, b) => b.score - a.score)[0];
  return { domains, priorityKey: priority.key, updatedAt: new Date().toISOString(), dataStatus: recentObs.length < 3 ? 'early_data' as const : 'ready' as const };
}

export function recommendedFocusMinutes(focusSessions: FocusSessionRecord[]) {
  const completed = focusSessions.filter(s => s.completed).slice(0, 6);
  if (!completed.length) return 7;
  const avg = average(completed.map(s => s.completedMinutes), 7);
  const successRate = completed.length / Math.max(1, focusSessions.slice(0, 6).length);
  if (successRate >= 0.8 && completed.length >= 3) return Math.min(15, Math.max(5, Math.round(avg) + 1));
  return Math.min(15, Math.max(5, Math.round(avg)));
}

export function buildSupportPlan(profile: ReturnType<typeof calculateSupportProfile>, focusMinutes: number, childId = 'leo-1', childName = 'the child') {
  if (profile.dataStatus === 'baseline_needed') {
    return {
      id: `plan-${childId}-active`, childId, version: '3.0', status: 'baseline', priorityDomain: 'baseline', updatedAt: new Date().toISOString(), reviewInDays: 7, focusMinutes,
      summary: `Start with short, predictable activities while HEBAT learns ${childName}'s support pattern.`,
      student: [`Try a ${focusMinutes}-minute Focus Sprint`, 'Complete one short learning mission', 'Use the same simple routine each day'],
      teacher: ['Record short classroom observations when relevant', 'Keep instructions brief and visible', 'Avoid interpreting early data as a diagnosis'],
      parent: ['Use one short homework routine', 'Record what helps or makes tasks harder', 'Give clear praise after a completed step'],
      reasons: ['There is not enough account history yet to personalise a support priority', 'HEBAT will update the plan as school, home, and learning observations accumulate'],
    };
  }
  const priority = profile.priorityKey;
  const catalog: Record<string, { summary: string; student: string[]; teacher: string[]; parent: string[]; reasons: string[] }> = {
    task_persistence: {
      summary: `Help ${childName} finish one small step at a time before increasing task length.`,
      student: [`Use ${focusMinutes}-minute learning missions`, 'See one instruction at a time', 'Take a short movement break after a completed mission'],
      teacher: ['Chunk assignments into 3 visible steps', 'Use immediate descriptive praise after each completed step', 'Give one brief transition cue before changing activities'],
      parent: ['Use a 3-step homework routine', 'Give one clear instruction, wait, then praise completion', 'Keep homework blocks short and predictable'],
      reasons: ['Recent tasks are often partially completed', 'Prompting is still needed during longer tasks', 'Shorter focus windows are more successful'],
    },
    attention: {
      summary: 'Reduce competing information and keep learning windows short and predictable.',
      student: [`Use ${focusMinutes}-minute Focus Sprints`, 'Work on one visible task only', 'Use a 2-minute movement break between missions'],
      teacher: ['Seat away from high-traffic distractions', 'Use a visual cue before giving instructions', 'Check understanding after one instruction'],
      parent: ['Prepare a low-distraction homework space', 'Use a visible short timer', 'Praise returning attention to the task'],
      reasons: ['Attention observations show recurring difficulty', 'Successful focus periods remain shorter than the long-term target'],
    },
    transition: {
      summary: 'Make transitions predictable before expecting independent switching.',
      student: ['Use a visual next-step card', 'Finish one small task before moving on', 'Take one planned movement transition'],
      teacher: ['Give a 5-minute and 1-minute transition cue', 'Assign a purposeful movement job', 'Show the next task before ending the current one'],
      parent: ['Use first-then language at home', 'Preview the next routine step', 'Keep transition instructions brief'],
      reasons: ['Transitions frequently require prompts', 'Predictability can reduce task-switching friction'],
    },
    routine: {
      summary: 'Build consistency with the same small sequence each day.',
      student: ['Follow the 3-step visual routine', 'Check off one step at a time', 'Earn Stars for completing the whole sequence'],
      teacher: ['Keep classroom routines visually consistent', 'Use the same cue words each day', 'Praise independent routine completion'],
      parent: ['Use the same 3-step homework routine', 'Prepare materials before starting', 'Praise completion, not speed'],
      reasons: ['Routine completion is inconsistent across recent days'],
    },
    working_memory: {
      summary: 'Reduce memory load by externalising instructions and checking one step at a time.',
      student: ['Use one-step mission cards', 'Repeat the instruction before starting', 'Use short memory games in Today’s Plan'],
      teacher: ['Provide visual instructions', 'Avoid long verbal instruction chains', `Ask ${childName} to repeat the next step`],
      parent: ['Write down the next step', 'Use short clear instructions', 'Avoid combining multiple requests'],
      reasons: ['Task completion and prompt patterns suggest extra working-memory support may help'],
    },
  };
  const selected = catalog[priority] ?? catalog.task_persistence;
  return {
    id: `plan-${childId}-active`,
    childId,
    version: '3.0',
    status: 'active',
    priorityDomain: priority,
    updatedAt: new Date().toISOString(),
    reviewInDays: 7,
    focusMinutes,
    ...selected,
  };
}
