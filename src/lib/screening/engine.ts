export type Domain='attention'|'task_persistence'|'working_memory'|'routine'|'transition'|'self_regulation';
export type Need='Low'|'Moderate'|'High';
export type ScreeningResponse={id:string;value:string|string[];signals:Partial<Record<Domain,number>>};
const labels:Record<Domain,string>={attention:'Attention',task_persistence:'Task Persistence',working_memory:'Working Memory',routine:'Routine',transition:'Transitions',self_regulation:'Self Regulation'};
export function buildSupportProfile(responses:ScreeningResponse[]){
 const keys=Object.keys(labels) as Domain[];
 const domains=keys.map(key=>{const values=responses.flatMap(r=>r.signals[key]===undefined?[]:[r.signals[key]!]);const avg=values.length?values.reduce((a,b)=>a+b,0)/values.length:0;const need:Need=avg>=2.35?'High':avg>=1.35?'Moderate':'Low';return {key,label:labels[key],need,score:need==='High'?80:need==='Moderate'?52:20}});
 return {domains,priorityKey:[...domains].sort((a,b)=>b.score-a.score)[0].key,version:'support-profile-1.0'};
}
export const displayNeed=(need:Need)=>need==='High'?'Needs More Support':need==='Moderate'?'May Need Support':'Doing Well';
export function recommendations(profile:ReturnType<typeof buildSupportProfile>,preference='smaller'){
 const high=new Set(profile.domains.filter(d=>d.need==='High').map(d=>d.key)); const list:string[]=[];
 if(high.has('attention')) list.push('5-minute Focus Sprints','one visible task at a time');
 if(high.has('task_persistence')) list.push('activities broken into small steps');
 if(high.has('working_memory')) list.push('one instruction at a time','visual task steps');
 if(high.has('routine')) list.push('Routine Builder first in Today’s Plan');
 if(high.has('transition')) list.push('calm countdown and transition cues');
 if(preference==='example') list.unshift('a worked example before new activities');
 return [...new Set(list)].slice(0,4).length?[...new Set(list)].slice(0,4):['short learning missions','clear visual task steps','gentle reminders'];
}
