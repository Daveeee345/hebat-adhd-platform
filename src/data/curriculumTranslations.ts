import { MathSubmodule, ExecutiveSubmodule } from './curriculumData';

export const translateMathSubmodule = (sub: MathSubmodule, language: 'id' | 'en'): MathSubmodule => {
  if (language === 'id') return sub;

  const translations: Record<string, { title: string; desc: string; level: string }> = {
    "num-adv-jr": {
      title: "🧸 Number Adventure (Junior)",
      desc: "Start counting adventures with balloons, candies, and apples with cute characters!",
      level: "Basic Level • Level 1"
    },
    "pattern-det": {
      title: "🔍 Pattern Detective",
      desc: "Find the secrets of exciting colors, shapes, and number jump patterns!",
      level: "Basic Level • Level 2"
    },
    "visual-math": {
      title: "🍕 Visual Mathematics",
      desc: "Learn pizza fractions, bar graphs, and comparing star counts!",
      level: "Intermediate Level • Level 3"
    },
    "times-tables-fun": {
      title: "⚡ Fun Multiplication Table",
      desc: "Skip-counting with rabbits, frogs, and exciting moving cake groups!",
      level: "Intermediate Level • Level 4"
    },
    "logic-quest": {
      title: "🧩 Creative Logic Mission",
      desc: "Find the lost puppy, solve routine sequence puzzles, and build towers!",
      level: "Advanced Level • Level 5"
    }
  };

  const trans = translations[sub.id];
  if (!trans) return sub;

  return {
    ...sub,
    title: trans.title,
    desc: trans.desc,
    level: trans.level
  };
};

export const translateExecutiveSubmodule = (sub: ExecutiveSubmodule, language: 'id' | 'en'): ExecutiveSubmodule => {
  if (language === 'id') return sub;

  const submoduleTranslations: Record<string, { title: string; desc: string; level: string }> = {
    "focus-control": {
      title: "🛑 Impulse Control & Self-Discipline",
      desc: "Train your ability to control your body and delay gratification to win the gold trophy!",
      level: "Basic Level • Level 1"
    },
    "working-memory": {
      title: "🧠 Working Memory Training",
      desc: "Remember instructions, star paths, and hidden details to train your strong memory!",
      level: "Intermediate Level • Level 2"
    },
    "focus-shift": {
      title: "⚡ Focus & Thinking Flexibility (Cognitive Shifting)",
      desc: "Train your ability to shift focus quickly, filter distractions, and breathe calmly!",
      level: "All Ages • Level 3"
    }
  };

  const activityTranslations: Record<string, Record<number, { title: string; question: string; options: string[]; correctAnswer: string; hint?: string }>> = {
    "focus-control": {
      1: {
        title: "Slam the Brake!",
        question: "The traffic light turns RED! What should you do immediately?",
        options: ["Run fast", "Stop & Stay Still", "Jump around"],
        correctAnswer: "Stop & Stay Still",
        hint: "Self-control means knowing when to stop your body!"
      },
      2: {
        title: "Sparky is Sleeping!",
        question: "Sparky the firefly is sleeping soundly. To avoid waking him up, we must...",
        options: ["Shout loudly", "Walk slowly & quietly", "Sing a cheerful song"],
        correctAnswer: "Walk slowly & quietly"
      },
      3: {
        title: "Wait for the Star!",
        question: "A Golden Star is about to fall. We must wait until count 5 before catching it. When do we catch it?",
        options: ["At count 2", "After count 5", "Anytime we want"],
        correctAnswer: "After count 5"
      },
      4: {
        title: "The Quiet Volcano",
        question: "This mini volcano will erupt if we are noisy. What is the best tactic to keep the volcano calm?",
        options: ["Take a breath & close mouth tightly", "Shout with Dino", "Dance wildly"],
        correctAnswer: "Take a breath & close mouth tightly"
      },
      5: {
        title: "The Slow Turtle Crossing",
        question: "Sammy the tortoise walks very slowly across the road. What should we do?",
        options: ["Push him to go faster", "Wait patiently and calmly", "Leave him behind"],
        correctAnswer: "Wait patiently and calmly"
      },
      6: {
        title: "Balloon Pop Control",
        question: "There are 3 blue balloons and 1 thorny red balloon. Which balloon must you NOT touch so it doesn't pop loudly?",
        options: ["First blue balloon", "Second blue balloon", "Thorny red balloon"],
        correctAnswer: "Thorny red balloon"
      },
      7: {
        title: "Dino's Loud Sound",
        question: "Dino makes a loud roaring sound! What is the best reaction to keep your ears safe?",
        options: ["Cover ears calmly", "Join in shouting louder", "Run in panic"],
        correctAnswer: "Cover ears calmly"
      },
      8: {
        title: "The Golden Marshmallow",
        question: "If you wait 1 minute without eating the first Marshmallow, you get 2 Marshmallows! What is your smart choice?",
        options: ["Eat it right now", "Wait calmly to get 2", "Throw it on the floor"],
        correctAnswer: "Wait calmly to get 2"
      },
      9: {
        title: "Freeze on the Beat",
        question: "When the background music suddenly turns off, our body must be like...",
        options: ["A frozen ice statue", "A jumping rabbit", "A flying bird"],
        correctAnswer: "A frozen ice statue"
      },
      10: {
        title: "The Freeze Dance Final Quest",
        question: "You reached the final round! To win the gold trophy, when the instructor yells 'FREEZE!', you must...",
        options: ["Just blink your eyes", "Freeze like stone without moving at all", "Scratch your head"],
        correctAnswer: "Freeze like stone without moving at all"
      }
    },
    "working-memory": {
      1: {
        title: "The Beaver's Path",
        question: "Sammy the tortoise walks through: Rock -> Tree Trunk -> River. What is the correct order of Sammy's path?",
        options: ["River -> Rock -> Tree Trunk", "Rock -> Tree Trunk -> River", "Tree Trunk -> River -> Rock"],
        correctAnswer: "Rock -> Tree Trunk -> River"
      },
      2: {
        title: "Sparky's Color Flash",
        question: "Sparky turns on his light with colors: Yellow, then Green, then Red. What is the second color turned on?",
        options: ["Yellow", "Green", "Red"],
        correctAnswer: "Green"
      },
      3: {
        title: "The Missing Toy Hunt",
        question: "You put the robot in the drawer, the ball under the bed, and the book on the table. Where did you put the ball?",
        options: ["In the drawer", "On the table", "Under the bed"],
        correctAnswer: "Under the bed"
      },
      4: {
        title: "The Grocery Memory",
        question: "Mom asked you to buy: Apples, Milk, and Bread. At the supermarket, you bought Apples and Bread. What is the third item you forgot?",
        options: ["Cheese", "Milk", "Honey"],
        correctAnswer: "Milk"
      },
      5: {
        title: "The Animal Parade",
        question: "Three animals are lined up: Rabbit in front, Elephant in the middle, Ant in the back. Who is in the very back?",
        options: ["Rabbit", "Elephant", "Ant"],
        correctAnswer: "Ant"
      },
      6: {
        title: "Magic Safe Combination",
        question: "The secret safe code is: 3 - 7 - 2. What is the middle number of the code?",
        options: ["3", "7", "2"],
        correctAnswer: "7"
      },
      7: {
        title: "Dino's Breakfast",
        question: "Dino eats green leaves in the morning and red berries in the afternoon. What does Dino eat in the morning?",
        options: ["Red berries", "Green leaves", "Fresh fish"],
        correctAnswer: "Green leaves"
      },
      8: {
        title: "The Magic Sound Pattern",
        question: "Listen to the clapping sound: Clap! Clap! Bum! Clap! Clap! Bum! What is the sound after the next two Claps?",
        options: ["Clap!", "Boom!", "Ssshh!"],
        correctAnswer: "Boom!"
      },
      9: {
        title: "The Backwards Word",
        question: "If the word 'B-A-C-A' is read backwards from back to front, what does the first letter become?",
        options: ["B", "C", "A"],
        correctAnswer: "A"
      },
      10: {
        title: "The Ultra Memory Champion",
        question: "The hero remembers 4 clues: North, South, East, West. Which is the second direction mentioned?",
        options: ["North", "South", "East"],
        correctAnswer: "South"
      }
    },
    "focus-shift": {
      1: {
        title: "The 3-Breath Inhale",
        question: "When your mind starts drifting, what is the fastest way to regain focus?",
        options: ["Watch TV", "Take 3 deep breaths", "Run around the room"],
        correctAnswer: "Take 3 deep breaths"
      },
      2: {
        title: "Color-Shape Shift Quest",
        question: "First, look for a Red object. Then immediately shift focus to look for a Round object. If there is a round red apple, it matches...",
        options: ["Color only", "Shape only", "Both (Color & Shape)"],
        correctAnswer: "Both (Color & Shape)"
      },
      3: {
        title: "Bubble Balloon Sort",
        question: "Group flying balloons: Red balloons to the left, yellow balloons to the right. If a red balloon appears, where does it go?",
        options: ["Left", "Right", "Up"],
        correctAnswer: "Left"
      },
      4: {
        title: "The Heavy Rain Focus",
        question: "Heavy rain is falling with a loud sound. To keep reading your adventure book, we must...",
        options: ["Close the window & focus on the book page", "Shout louder than the rain", "Stop reading forever"],
        correctAnswer: "Close the window & focus on the book page"
      },
      5: {
        title: "The Day & Night Switch",
        question: "When the image shows the SUN, you must shout 'Morning!'. When it shows the MOON, shout 'Night!'. If the image suddenly changes from sun to moon, what is your new shout?",
        options: ["Morning!", "Night!", "Afternoon!"],
        correctAnswer: "Night!"
      },
      6: {
        title: "The Inhale Balloon",
        question: "Imagine there is a balloon in your tummy. When you inhale, that balloon becomes...",
        options: ["Expanded big", "Deflated small", "Popped"],
        correctAnswer: "Expanded big"
      },
      7: {
        title: "The Left-Right Brain Tap",
        question: "Touch your right knee with your left hand, then your left knee with your right hand. This cross-exercise helps...",
        options: ["Both sides of the brain work together & focus", "Eyes become sleepy", "Legs grow tall"],
        correctAnswer: "Both sides of the brain work together & focus"
      },
      8: {
        title: "The Focus Filter",
        question: "There is a dog barking outside, a TV sound in the living room, and Mom reading a story in front of you. Whose voice should you listen to?",
        options: ["Dog's voice", "TV sound", "Mom's voice"],
        correctAnswer: "Mom's voice"
      },
      9: {
        title: "Cloud Shape Detective",
        question: "A cloud in the sky changes from a Rabbit shape to a Ship shape. You must quickly adapt to the change. This ability is called...",
        options: ["Mental rigidity", "Thinking flexibility (Flexibility)", "Running speed"],
        correctAnswer: "Thinking flexibility (Flexibility)"
      },
      10: {
        title: "The Zen Mind Master",
        question: "Congratulations! You completed the focus adventure. The best way to keep your mind calm all day is...",
        options: ["Regulate your breathing & smile", "Eat lots of sweet candy", "Get angry when upset"],
        correctAnswer: "Regulate your breathing & smile"
      }
    }
  };

  const transSub = submoduleTranslations[sub.id];
  if (!transSub) return sub;

  const translatedActivities = sub.activities.map(act => {
    const transAct = activityTranslations[sub.id]?.[act.id];
    if (!transAct) return act;
    return {
      ...act,
      title: transAct.title,
      question: transAct.question,
      options: transAct.options,
      correctAnswer: transAct.correctAnswer,
      hint: transAct.hint || act.hint
    };
  });

  return {
    ...sub,
    title: transSub.title,
    desc: transSub.desc,
    level: transSub.level,
    activities: translatedActivities
  };
};
