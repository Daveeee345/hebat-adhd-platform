import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type DemoAnswers = {focus?:number;task?:number;memory?:number;sequence?:number;transition?:number;energy?:number;support?:string};
export type DemoUser = {id:'demo-user';name:string;role:'student';age:9;grade:4;isDemo:true};
export type SupportDomain = {label:string;score:number};

type DemoContextValue = {
  demoMode:boolean;
  demoUser:DemoUser|null;
  currentScene:number;
  answers:DemoAnswers;
  supportProfile:SupportDomain[];
  personalisedPlan:string[];
  stars:number;
  demoProgress:number;
  enterDemo:(name:string)=>void;
  setCurrentScene:(scene:number)=>void;
  setAnswers:React.Dispatch<React.SetStateAction<DemoAnswers>>;
  resetDemo:()=>void;
};

const DemoContext=createContext<DemoContextValue|null>(null);

export function DemoProvider({children}:{children:ReactNode}){
  const[demoUser,setDemoUser]=useState<DemoUser|null>(null);
  const[currentScene,setCurrentScene]=useState(0);
  const[answers,setAnswers]=useState<DemoAnswers>({});
  const[stars]=useState(0);
  const supportProfile=useMemo(()=>[
    {label:'Attention',score:answers.focus??1},
    {label:'Task Persistence',score:answers.task??1},
    {label:'Working Memory',score:Math.max(answers.memory??0,answers.sequence??0)},
    {label:'Transition',score:answers.transition??1},
    {label:'Self Regulation',score:answers.energy??0},
  ],[answers]);
  const personalisedPlan=useMemo(()=>['Reading Mission','Focus Sprint','Memory Mission'],[]);
  const enterDemo=(enteredName:string)=>{
    setDemoUser({id:'demo-user',name:enteredName.trim()||'Leo',role:'student',age:9,grade:4,isDemo:true});
    setAnswers({});
    setCurrentScene(0);
  };
  const resetDemo=()=>{setAnswers({});setCurrentScene(0)};
  const value={demoMode:Boolean(demoUser),demoUser,currentScene,answers,supportProfile,personalisedPlan,stars,demoProgress:currentScene,enterDemo,setCurrentScene,setAnswers,resetDemo};
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(){
  const context=useContext(DemoContext);
  if(!context)throw new Error('useDemo must be used inside DemoProvider');
  return context;
}
