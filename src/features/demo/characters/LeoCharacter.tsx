import {motion, useReducedMotion} from 'motion/react';

export type LeoPose='reading'|'thinking'|'writing'|'teacher'|'smile'|'packing'|'restless'|'tired'|'energetic';

export default function LeoCharacter({pose='reading',small=false}:{pose?:LeoPose;small?:boolean}){
 const reduced=useReducedMotion();
 const look=pose==='teacher'?-5:pose==='thinking'||pose==='restless'?5:0;
 return <motion.div className={`demo-character leo ${small?'is-small':''}`} aria-label={`Leo is ${pose}`} animate={reduced?{}:{y:pose==='restless'?[0,-2,0]:[0,-1,0]}} transition={{duration:pose==='restless'?1.5:3.8,repeat:Infinity}}>
  <svg viewBox="0 0 180 250" role="img" aria-hidden="true">
   <ellipse cx="90" cy="238" rx="58" ry="8" fill="#3c3c3c" opacity=".1"/>
   <path d="M55 119Q90 101 125 119L137 211H43Z" fill="#1cb0f6"/><path d="M55 173h70" stroke="#1899d6" strokeWidth="5"/>
   <path d="M59 207v30M121 207v30" stroke="#334155" strokeWidth="18" strokeLinecap="round"/>
   <path d="M42 128q-14 35 8 57M138 128q14 35-8 57" stroke="#9b603f" strokeWidth="13" strokeLinecap="round"/>
   <circle cx="90" cy="77" r="49" fill="#a86b47"/>
   <path d="M45 72Q48 19 92 20q43 1 45 50-17-20-47-15-26 5-45 17Z" fill="#2f2927"/><path d="M57 35q7-23 21-11M89 29q10-20 21-3" fill="none" stroke="#2f2927" strokeWidth="12" strokeLinecap="round"/>
   <motion.g animate={{x:look}} transition={{duration:.45}}><circle cx="72" cy="77" r="5" fill="#292524"/><circle cx="108" cy="77" r="5" fill="#292524"/></motion.g>
   <motion.path d={pose==='smile'||pose==='teacher'||pose==='energetic'?'M76 98q14 13 28 0':'M78 99q12 5 24 0'} fill="none" stroke="#542f25" strokeWidth="4" strokeLinecap="round"/>
   <motion.path d="M65 70h14M101 70h14" stroke="#2f2927" strokeWidth="3" strokeLinecap="round" animate={reduced?{}:{scaleY:[1,1,.1,1]}} transition={{duration:4.6,repeat:Infinity,times:[0,.94,.96,1]}}/>
   {pose==='reading'&&<><path d="M48 178q42-13 42 6v39q-24-12-45-5Z" fill="#fff" stroke="#e5e5e5" strokeWidth="3"/><path d="M132 178q-42-13-42 6v39q24-12 45-5Z" fill="#fff" stroke="#e5e5e5" strokeWidth="3"/></>}
   {pose==='writing'&&<path d="M75 180l37 32" stroke="#ff9600" strokeWidth="5" strokeLinecap="round"/>}
  </svg>
 </motion.div>
}
