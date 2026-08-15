import type{ReactNode}from'react';
import {motion,useReducedMotion}from'motion/react';
import LeoCharacter,{type LeoPose}from'../characters/LeoCharacter';
import TeacherCharacter from'../characters/TeacherCharacter';

export default function ClassroomScene({children,board='Good morning, everyone!',pose='reading',teacher='point',focus='room',quiet=false}:{children?:ReactNode;board?:ReactNode;pose?:LeoPose;teacher?:'point'|'write'|'help'|'smile';focus?:'room'|'leo'|'desk'|'board';quiet?:boolean}){
 const reduced=useReducedMotion();
 const scale=focus==='desk'?1.08:focus==='leo'?1.06:focus==='board'?1.04:1;
 return <motion.section className={`classroom-world focus-${focus} ${quiet?'is-quiet':''}`} initial={{opacity:0}} animate={{opacity:1,scale:reduced?1:scale}} transition={{duration:reduced?.15:.5}}>
  <div className="classroom-sun"/><div className="classroom-window"><span/><span/><div className="cloud"/></div>
  <div className="classroom-clock"><i/></div><div className="classroom-board">{board}</div>
  <div className="classroom-poster">BE<br/><b>KIND</b></div><div className="classroom-shelf"><i/><i/><i/><i/></div>
  <TeacherCharacter action={teacher}/><div className="classmate mate-one"/><div className="classmate mate-two"/>
  <div className="leo-station"><LeoCharacter pose={pose}/><div className="desk"><span className="desk-book"/><span className="desk-pencil"/></div></div>
  <div className="classroom-floor"/>{children}
 </motion.section>
}
