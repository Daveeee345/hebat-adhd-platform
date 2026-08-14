export interface ReadingActivity {
  id: number;
  title: string;
  text: string;
  image: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ReadingSubmodule {
  id: string;
  title: string;
  desc: string;
  level: string;
  activities: ReadingActivity[];
}

export interface WritingActivity {
  id: number;
  title: string;
  prompt: string;
  image: string;
  helperWords: string[];
  startingText?: string;
}

export interface WritingSubmodule {
  id: string;
  title: string;
  desc: string;
  level: string;
  activities: WritingActivity[];
}

export interface MathActivity {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
  pattern?: string;
  display?: string;
  skill?: string;
  hint?: string;
}

export interface MathSubmodule {
  id: string;
  title: string;
  desc: string;
  level: string;
  activities: MathActivity[];
}

export interface ExecutiveActivity {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
  type?: 'dance' | 'memory' | 'breathing' | 'choice';
  hint?: string;
}

export interface ExecutiveSubmodule {
  id: string;
  title: string;
  desc: string;
  level: string;
  activities: ExecutiveActivity[];
}

export const readingSubmodules: ReadingSubmodule[] = [
  {
    id: "read-to-clip",
    title: "Read to the Clip",
    desc: "Read very short, bite-sized paragraphs with colorful visuals. Spot the hidden gems!",
    level: "Level 1: Novice Hunter",
    activities: [
      {
        id: 1,
        title: "Sparky the Brave Firefly",
        text: "Sparky is a tiny, bright firefly who lives in the Great Whisper Woods. But Sparky has a little secret: his glowing amber light shifts colors whenever he is super excited!",
        image: "⚡",
        question: "What is Sparky's special secret?",
        options: ["He flies backwards", "His light changes colors", "He sleeps in the river", "He has blue wings"],
        correctAnswer: "His light changes colors"
      },
      {
        id: 2,
        title: "The Neon Moonflower",
        text: "While other fireflies glow steady yellow, Sparky splashes neon purple and electric turquoise! Today, he is going on a quest to locate the Legendary Moonflower.",
        image: "🌸",
        question: "What is Sparky looking for today?",
        options: ["The Golden River", "The Hungry Frog", "The Legendary Moonflower", "A giant sticky tree"],
        correctAnswer: "The Legendary Moonflower"
      },
      {
        id: 3,
        title: "The Whispering River",
        text: "To find it, Sparky must follow the whispering blue river. 'Stay calm, deep breaths, and watch the water patterns,' his grandmother said. Sparky takes a slow breath, focusing his light.",
        image: "🧭",
        question: "What advised Sparky to stay calm and follow the river?",
        options: ["A wise old tortoise", "His grandmother", "A talking map", "A colorful bird"],
        correctAnswer: "His grandmother"
      },
      {
        id: 4,
        title: "Sammy's Slow Shell",
        text: "Sammy the tortoise carries a colorful shell painted with shiny yellow stars. Whenever he feels rushed, he stops and counts three stars on his back to feel completely calm.",
        image: "🐢",
        question: "How does Sammy feel calm when he runs too fast or gets rushed?",
        options: ["He drinks honey water", "He hops into a lake", "He stops and counts three stars on his back", "He sleeps for a week"],
        correctAnswer: "He stops and counts three stars on his back"
      },
      {
        id: 5,
        title: "The Chattering Squirrel",
        text: "Coco the brown squirrel loves acorns, but she forgets where she hides them! Today, she uses shiny violet pebbles to mark her underground acorn treasure boxes.",
        image: "🐿️",
        question: "What does Coco use to mark her secret acorn boxes?",
        options: ["Bright green leaves", "Shiny violet pebbles", "Salty peanut shells", "Clues drawn on bark"],
        correctAnswer: "Shiny violet pebbles"
      },
      {
        id: 6,
        title: "The Golden Honeycomb",
        text: "Buzzy the golden bumblebee flies in loop-de-loops. When it is time to pollinate, he stays on one red flower for a full minute to practice his ultra bees focus.",
        image: "🐝",
        question: "How does Buzzy practice his focus?",
        options: ["He sits on one red flower for a minute", "He sleeps on a cloud", "He counts sand grains", "He flies backwards"],
        correctAnswer: "He sits on one red flower for a minute"
      },
      {
        id: 7,
        title: "The Sleepy Owl",
        text: "Professor Hoot is a wise, grey owl who only reads at midnight. He uses a cute magnifying glass carved of pine wood to read ancient scrolls about forest stars.",
        image: "🦉",
        question: "What tool does Professor Hoot use to read scrolls?",
        options: ["A glowing candle", "A pine wood magnifying glass", "A magic telescope", "A pair of round glasses"],
        correctAnswer: "A pine wood magnifying glass"
      },
      {
        id: 8,
        title: "The Dancing Mushroom",
        text: "Deep in the glowing moss valley, a tiny pink mushroom named Pip shakes whenever music plays. Pip only dances when the wind blows through hollow bamboo tubes.",
        image: "🍄",
        question: "When does Pip the pink mushroom start dancing?",
        options: ["When the rain sets in", "When frogs croak", "When the wind blows through hollow bamboo", "When people shout"],
        correctAnswer: "When the wind blows through hollow bamboo"
      },
      {
        id: 9,
        title: "Lulu's Lucky Coin",
        text: "Lulu the raccoon found a silver coin near the waterfall. She polished it with soft moss until it reflected the blue sky like a tiny pocket mirror.",
        image: "🦝",
        question: "How did Lulu polish her shiny silver coin?",
        options: ["With river water", "With coarse sand", "With soft moss", "With her sharp claws"],
        correctAnswer: "With soft moss"
      },
      {
        id: 10,
        title: "The Magic Moonflower Blooms",
        text: "Under the silver glow of the moon, Sparky finally finds the Moonflower! It opens slowly, revealing sparkling pollen that smells sweet like forest honey.",
        image: "✨",
        question: "What does the Legendary Moonflower reveal when it opens?",
        options: ["Gold coins", "Sparkling pollen that smells like honey", "A magic wand", "A sleepy little ladybug"],
        correctAnswer: "Sparkling pollen that smells like honey"
      }
    ]
  },
  {
    id: "main-idea-hunter",
    title: "Main Idea Hunter",
    desc: "Uncover the grand message of stories. Wear your explorer's helmet!",
    level: "Level 2: Scope Explorer",
    activities: [
      {
        id: 1,
        title: "The Beaver's Bridge",
        text: "Benny the beaver wanted to build a bridge across the stream so his friends could cross safely. Even though his logs kept washing away, Benny did not give up. He adjusted the logs and tried again until the bridge stood firm.",
        image: "🦫",
        question: "What is the main idea of Benny's story?",
        options: ["Water streams are cold", "Beavers have sharp teeth", "Persistence pays off when facing challenges", "Bridges are fun to paint"],
        correctAnswer: "Persistence pays off when facing challenges"
      },
      {
        id: 2,
        title: "Sacha's Painting",
        text: "Sacha tried to paint a sunset but spilled dark blue paint all over her paper. Instead of throwing it away, she turned the spill into a starry night sky. Everyone loved her creative night painting!",
        image: "🎨",
        question: "What lesson can we learn from Sacha's spill?",
        options: ["Spill paint often", "Mistakes can be turned into beautiful creative ideas", "Sunsets are hard to draw", "Blue is the best color"],
        correctAnswer: "Mistakes can be turned into beautiful creative ideas"
      },
      {
        id: 3,
        title: "The Ants' Cargo",
        text: "A single ant could not lift the giant seed back to the anthill. But instead of leaving it, she hummed a sweet tune to call ten other ants. Working as one, they easily carried the seed home.",
        image: "🐜",
        question: "What is the core message of this ant team?",
        options: ["Giant seeds are delicious", "Working together makes big tasks easy", "Ants are very noisy", "Humming helps you walk faster"],
        correctAnswer: "Working together makes big tasks easy"
      },
      {
        id: 4,
        title: "The Slow Seed",
        text: "Tara planted a sunflower seed but got impatient when it did not grow on day two. Her grandfather explained that beautiful flowers take time to develop deep roots. Tara watered it quietly every day until a massive yellow blossom appeared.",
        image: "🌻",
        question: "What is the main message about Tara's plant?",
        options: ["Green leaves are bitter", "Grandfathers are very old", "Patience and daily care yield glorious results", "Watering plants is exhausting"],
        correctAnswer: "Patience and daily care yield glorious results"
      },
      {
        id: 5,
        title: "The Echoing Cave",
        text: "Leo yelled 'Hello' into a cave and heard a friendly voice echo back. Next, he yelled 'Go away' and heard a harsh echo. He realized that the world often reflects back the attitude and feelings we put out.",
        image: "⛰️",
        question: "What is the cave teaching Leo?",
        options: ["Caves have monsters", "Echoes can be heard only at night", "What we put out into the world comes back to us", "Yelling is good for health"],
        correctAnswer: "What we put out into the world comes back to us"
      },
      {
        id: 6,
        title: "Ollie's Old Toy",
        text: "Ollie had a broken robot that he thought was useless. Instead of leaving it in the trash, he cleaned the wheels and gave it to his baby brother as a spinning racing car. His brother was ecstatic!",
        image: "🤖",
        question: "What is the primary theme of Ollie's choice?",
        options: ["Racing cars are expensive", "Unusable items can find new life with creativity", "Robots are better than blocks", "Old toys must be thrown away"],
        correctAnswer: "Unusable items can find new life with creativity"
      },
      {
        id: 7,
        title: "The Squirrel's Map",
        text: "Squeaky the squirrel drew a colorful map to remember where he buried his winter nuts. He didn't have to worry about cold days anymore because his organization kept his acorns safe.",
        image: "🗺️",
        question: "What is Squeaky's story highlighting?",
        options: ["Winter is too cold", "Squirrels like to run", "Being organized saves future stress and worry", "Drawing is hard on bark"],
        correctAnswer: "Being organized saves future stress and worry"
      },
      {
        id: 8,
        title: "The Brave Little Bird",
        text: "Pip was too afraid to fly down from the tall branch because his wings felt shaky. After watching a butterfly glide smoothly, he closed his eyes, took a deep breath, and discovered that action conquers fear.",
        image: "🐦",
        question: "What did Pip discover?",
        options: ["Branches are safe", "Butterflies fly faster than birds", "Closing your eyes makes you fly", "Taking action and breathing helps overcome fear"],
        correctAnswer: "Taking action and breathing helps overcome fear"
      },
      {
        id: 9,
        title: "The Frog's Clean Pond",
        text: "Flippy the frog noticed bits of plastic leaves polluting his pond. He started collecting one piece every morning. His frog neighbor saw him and joined, until the water sparkled clean again.",
        image: "🐸",
        question: "What is the central theme of Flippy's morning routine?",
        options: ["Frogs can swim well", "Small daily efforts can inspire others and make big changes", "Plastic is useful for frogs", "Ponds are full of bugs"],
        correctAnswer: "Small daily efforts can inspire others and make big changes"
      },
      {
        id: 10,
        title: "The Quiet Library",
        text: "Milo was feeling anxious and scattered from the noisy playground outside. He sat in a cozy corner of the library, opened a picture book, and felt his breathing turn deep and serene.",
        image: "📚",
        question: "What does Milo find in the quiet library?",
        options: ["More games to play", "A peaceful place that calms an anxious mind", "A broken toy rocket", "A loud drum kit"],
        correctAnswer: "A peaceful place that calms an anxious mind"
      }
    ]
  },
  {
    id: "keyword-detective",
    title: "Keyword Detective",
    desc: "Search and highlight critical signal words like 'because', 'first', or 'suddenly' to solve cases.",
    level: "Level 3: Clue Tracker",
    activities: [
      {
        id: 1,
        title: "The Missing Compass",
        text: "Lilly was lost because her golden compass suddenly stopped spinning. First, she climbed a maple tree to look around. Then, she saw the glowing red lighthouse guiding her home.",
        image: "🧭",
        question: "Which keyword explains WHY Lilly was lost?",
        options: ["suddenly", "because", "First", "Then"],
        correctAnswer: "because"
      },
      {
        id: 2,
        title: "The Baking Disaster",
        text: "Max wanted to bake cookies. However, he forgot the baking powder. Consequently, the cookies baked flat as sheets!",
        image: "🍪",
        question: "Which transition keyword shows the consequence of forgetting baking powder?",
        options: ["wanted", "Consequently", "However", "flat"],
        correctAnswer: "Consequently"
      },
      {
        id: 3,
        title: "The Forest Chase",
        text: "The fox ran quickly. Suddenly, a huge pinecone dropped on his tail. Therefore, he had to stop and rest.",
        image: "🦊",
        question: "Which keyword tells us that something unexpected happened instantly?",
        options: ["quickly", "Suddenly", "Therefore", "ran"],
        correctAnswer: "Suddenly"
      },
      {
        id: 4,
        title: "The Map Quest",
        text: "First, you must walk past the mossy rock. Next, hop three times on the log. Finally, dig under the mushroom.",
        image: "🗺️",
        question: "Which word signals the very last action you need to perform?",
        options: ["First", "Next", "Finally", "hop"],
        correctAnswer: "Finally"
      },
      {
        id: 5,
        title: "The Secret Key",
        text: "Maya tried to open the iron gate. Alternatively, she could climb the vine rope to get inside the hidden garden.",
        image: "🔑",
        question: "Which word signals a second choice or options?",
        options: ["Alternatively", "tried", "open", "inside"],
        correctAnswer: "Alternatively"
      },
      {
        id: 6,
        title: "The Bird Nest",
        text: "The bird gathered straw because she was building a warm home. Subsequently, she laid three tiny blue eggs.",
        image: "🥚",
        question: "Which keyword shows that an action happened directly after another action?",
        options: ["gathered", "because", "Subsequently", "three"],
        correctAnswer: "Subsequently"
      },
      {
        id: 7,
        title: "The Rain Shelter",
        text: "The sky turned dark. Meanwhile, the squirrels rushed to collect pinecones before the rain wet everything.",
        image: "🐿️",
        question: "Which keyword tells you two things are happening at the exact same time?",
        options: ["dark", "Meanwhile", "rushed", "before"],
        correctAnswer: "Meanwhile"
      },
      {
        id: 8,
        title: "The Sweet Honey",
        text: "The bear wanted sweet honey. Indeed, it was the tastiest honeycomb he had found all summer.",
        image: "🐻",
        question: "Which keyword is used to emphasize or confirm a fact?",
        options: ["wanted", "Indeed", "tastiest", "found"],
        correctAnswer: "Indeed"
      },
      {
        id: 9,
        title: "The Cold Winter",
        text: "The hedgehog found a pile of warm leaves. Otherwise, he would have felt chilly sleeping in the winter gale.",
        image: "🦔",
        question: "Which keyword indicates what would happen if the conditions were different?",
        options: ["found", "pile", "Otherwise", "chilly"],
        correctAnswer: "Otherwise"
      },
      {
        id: 10,
        title: "The Balloon Pop",
        text: "The kitten patted the red balloon. Unexpectedly, it popped with a loud BANG, sending her jumping back!",
        image: "🎈",
        question: "Which keyword signals that the outcome was surprising?",
        options: ["patted", "red", "Unexpectedly", "BANG"],
        correctAnswer: "Unexpectedly"
      }
    ]
  },
  {
    id: "sequence-builder",
    title: "Sequence Builder",
    desc: "Rearrange scrambled storylines into their logical chronological order.",
    level: "Level 4: Master Organizer",
    activities: [
      {
        id: 1,
        title: "Sammy's Star Soup",
        text: "To prepare Sammy's star soup: First, boil pure spring water. Next, add three shiny carrot stars. Finally, stir with a pine twig.",
        image: "🍲",
        question: "What is the correct order of making star soup?",
        options: ["Stir first, boil last", "Boil water → Add carrots → Stir with twig", "Add carrots → Boil water → Stir with twig", "twig first → stir → carrots"],
        correctAnswer: "Boil water → Add carrots → Stir with twig"
      },
      {
        id: 2,
        title: "The Seed's Journey",
        text: "First, a tiny seed is buried in the loam. Next, rain waters it thoroughly. Then, green sprouts reach for the hot sun.",
        image: "🌱",
        question: "How does a plant sprout grow in sequence?",
        options: ["Rain → Seed → Sprouts", "Seed → Rain → Sprouts", "Sprouts → Rain → Seed", "Sprouts → Seed → Rain"],
        correctAnswer: "Seed → Rain → Sprouts"
      },
      {
        id: 3,
        title: "The Caterpillar's Flight",
        text: "First, a chubby caterpillar eats green leaves. Then, it spins a hard chrysalis cocoon. Finally, it spreads beautiful colorful wings.",
        image: "🦋",
        question: "What are the stages of a butterfly in order?",
        options: ["Cocoon → Caterpillar → Butterfly", "Caterpillar → Cocoon → Wings", "Wings → Cocoon → Caterpillar", "Cocoon → wings → eats"],
        correctAnswer: "Caterpillar → Cocoon → Wings"
      },
      {
        id: 4,
        title: "Building a Birdhouse",
        text: "First, cut three planks of cedar wood. Afterward, nail them together. Lastly, paint the exterior with bright blue water paint.",
        image: "🏡",
        question: "What is the proper sequence for building a birdhouse?",
        options: ["Nail → Cut → Paint", "Cut planks → Nail together → Paint blue", "Paint → Cut → Nail", "Nail → paint → cut planks"],
        correctAnswer: "Cut planks → Nail together → Paint blue"
      },
      {
        id: 5,
        title: "Cleaning the Room",
        text: "First, gather all your toys scattered on the rug. Next, place them neatly in the toy box. Finally, sweep the floor clean.",
        image: "🧹",
        question: "How should you clean your room in order?",
        options: ["Sweep → Gather toys → Box them", "Gather toys → Put in box → Sweep floor", "Put in box → Sweep → Gather toys", "Sweep → Put in box → Gather toys"],
        correctAnswer: "Gather toys → Put in box → Sweep floor"
      },
      {
        id: 6,
        title: "The Frog's Daily Leap",
        text: "First, Flippy sits on a wet leaf. Next, he spots a juicy fly. Finally, he leaps into the air with tongue outstretched.",
        image: "🐸",
        question: "What is Flippy's attack sequence?",
        options: ["Spot fly → Sit on leaf → Leap", "Sit on leaf → Spot fly → Leap", "Leap → Spot fly → Sit on leaf", "Leap → Sit on leaf → Spot fly"],
        correctAnswer: "Sit on leaf → Spot fly → Leap"
      },
      {
        id: 7,
        title: "A Sleepy Evening",
        text: "First, play a game. Afterward, brush your teeth. Lastly, lay in bed and listen to a peaceful story.",
        image: "🛌",
        question: "What is the golden bedtime sequence?",
        options: ["Brush teeth → Lay in bed → Play game", "Play game → Brush teeth → Lay in bed", "Lay in bed → Brush teeth → Play game", "Brush teeth → Play game → Lay in bed"],
        correctAnswer: "Play game → Brush teeth → Lay in bed"
      },
      {
        id: 8,
        title: "Painting a Leaf",
        text: "First, pick up a dry maple leaf. Next, apply bright red paint. Finally, press the leaf onto white paper.",
        image: "🍁",
        question: "What is the correct step-by-step leaf print path?",
        options: ["Pick leaf → Paint red → Press on paper", "Paint red → Press on paper → Pick leaf", "Press on paper → Paint red → Pick leaf", "Pick leaf → Press on paper → Paint red"],
        correctAnswer: "Pick leaf → Paint red → Press on paper"
      },
      {
        id: 9,
        title: "Finding Shells",
        text: "First, walk to the sandy seashore. Next, scoop up wet sand. Finally, wash the sand off to find red shells.",
        image: "🐚",
        question: "How do you find beach shells in order?",
        options: ["Scoop sand → Seashore → Wash off", "Walk to seashore → Scoop sand → Wash sand to find shells", "Wash sand → Walk to seashore → Scoop sand", "Seashore → Wash sand → Scoop sand"],
        correctAnswer: "Walk to seashore → Scoop sand → Wash sand to find shells"
      },
      {
        id: 10,
        title: "Washing Hands",
        text: "First, wet your hands with warm water. Next, rub them with dynamic soap bubbles. Finally, rinse and dry with a soft towel.",
        image: "🧼",
        question: "What is the safe handwashing sequence?",
        options: ["Soap → Wet hands → Dry", "Wet hands → Soap bubbles → Rinse and dry", "Dry → Wet hands → Soap", "Soap → Rinse → Wet hands"],
        correctAnswer: "Wet hands → Soap bubbles → Rinse and dry"
      }
    ]
  },
  {
    id: "story-detective",
    title: "Story Detective",
    desc: "Read mysterious logs of forest animals and deduce the solution to puzzles.",
    level: "Level 5: Detective Master",
    activities: [
      {
        id: 1,
        title: "The Missing Star Berry",
        text: "Squeaky buried the Star Berry under the greenest moss. But overnight, the grass turned purple near the stream. Squeaky must dig near the stream. Where is the Star Berry?",
        image: "🫐",
        question: "Where did Squeaky bury his precious Star Berry?",
        options: ["Under the tall oak", "Near the swamp", "Under the purple moss near the stream", "Behind Grandma's chimney"],
        correctAnswer: "Under the purple moss near the stream"
      },
      {
        id: 2,
        title: "The Echo Whisperer",
        text: "The whisperer cave returns the word 'Joy' as 'Yoj', reversing every letter. If Pip yells the word 'Calm', what will the cave echo back?",
        image: "⛰️",
        question: "What is the cave echo of 'Calm'?",
        options: ["Calm", "Mlac", "Macl", "Yoj"],
        correctAnswer: "Mlac"
      },
      {
        id: 3,
        title: "The Hidden Rainbow Key",
        text: "The red key opens the gate of clouds. The yellow key opens the gate of wind. The blue key opens the gate of waterfalls. Maya wants to open the waterfall gate. Which key does she need?",
        image: "🔑",
        question: "Which key is needed for the waterfall gate?",
        options: ["Red key", "Yellow key", "Blue key", "Rainbow key"],
        correctAnswer: "Blue key"
      },
      {
        id: 4,
        title: "The Sleepy Bear's Clock",
        text: "Barnaby the bear wakes up whenever the sun shines on his cave. Since his cave entrance faces the east, does Barnaby wake up in the morning, noon, or evening?",
        image: "☀️",
        question: "When does Barnaby the bear wake up?",
        options: ["In the morning", "At noon", "In the evening", "At midnight"],
        correctAnswer: "In the morning"
      },
      {
        id: 5,
        title: "The Snail's Great Race",
        text: "Slippy the snail crawls 1 meter per hour. The red clover is 3 meters away. Slippy started crawled at 1 PM. What time does he reach the clover?",
        image: "🐌",
        question: "What time will Slippy reach his sweet destination?",
        options: ["2 PM", "3 PM", "4 PM", "5 PM"],
        correctAnswer: "4 PM"
      },
      {
        id: 6,
        title: "The Squirrel's Shadow",
        text: "Nutty noticed his tree shadow pointed towards the left in the morning, but pointed right in the late afternoon. If he wants to sit in the shade in the late afternoon, should he sit on the left or the right side of the tree?",
        image: "🌳",
        question: "Where should Nutty sit for afternoon shade?",
        options: ["On the left side", "On the right side", "On top of the tree branch", "In the tree hollow"],
        correctAnswer: "On the right side"
      },
      {
        id: 7,
        title: "The Owl's secret code",
        text: "Professor Hoot writes codes. A = 1, B = 2, C = 3. What secret word does the code number pattern '3-1-2' represent?",
        image: "🦉",
        question: "What word is '3-1-2' in Hoot's code?",
        options: ["CAB", "BAC", "ABC", "BCA"],
        correctAnswer: "CAB"
      },
      {
        id: 8,
        title: "The Golden Beehive",
        text: "The bees place honey only on octagonal cells. Flippy found three cells: a triangle cell, a square cell, and an 8-sided cell. Which cell is full of sweet honey?",
        image: "🍯",
        question: "Which cell houses the delicious honey?",
        options: ["The triangle cell", "The square cell", "The 8-sided cell", "Both square and triangle"],
        correctAnswer: "The 8-sided cell"
      },
      {
        id: 9,
        title: "The Beaver's Secret Log",
        text: "Benny hides his map in a hollow log that has green clover painted on it. There are three logs: Log A with a yellow star, Log B with red paint, and Log C with green clover. Where is the map?",
        image: "🦫",
        question: "Identify the map's hiding location:",
        options: ["Log A", "Log B", "Log C", "No log at all"],
        correctAnswer: "Log C"
      },
      {
        id: 10,
        title: "The Friendly Firefly",
        text: "Sparky flashes his light twice for 'Yes', and once for 'No'. He flashes his light twice when Sacha asks if he wants some sweet nectar. Does Sparky want the nectar?",
        image: "⚡",
        question: "What is Sparky's response to Sacha?",
        options: ["No, thank you", "Yes, please", "He is too sleepy", "He flew away instead"],
        correctAnswer: "Yes, please"
      }
    ]
  }
];

export const writingSubmodules: WritingSubmodule[] = [
  {
    id: "picture-to-sentence",
    title: "Picture to Sentence",
    desc: "Look at the playful graphics. Tap on the word bubbles to form a perfect sentence about them!",
    level: "Level 1: Words Connect",
    activities: [
      {
        id: 1,
        title: "The Frog Leaps",
        prompt: "Build an active sentence describing the green jumper!",
        image: "🐸",
        helperWords: ["The", "happy", "frog", "leaps", "high", "on", "the", "leaf"],
        startingText: "The happy ..."
      },
      {
        id: 2,
        title: "The Honey Bear",
        prompt: "Help the sleepy bear get his sweet morning food!",
        image: "🐻",
        helperWords: ["Sleepy", "bear", "eats", "sweet", "honey", "under", "the", "tree"],
        startingText: "Sleepy bear ..."
      },
      {
        id: 3,
        title: "A Bright Star",
        prompt: "Create a shiny description of the high sky!",
        image: "⭐",
        helperWords: ["A", "bright", "star", "shines", "calmly", "in", "the", "night"],
        startingText: "A bright ..."
      },
      {
        id: 4,
        title: "The Flying Rocket",
        prompt: "Help Leo blast the rocket to space!",
        image: "🚀",
        helperWords: ["The", "fast", "rocket", "blasts", "into", "deep", "blue", "space"],
        startingText: "The fast ..."
      },
      {
        id: 5,
        title: "Puppy Plays Ball",
        prompt: "Describe this floppy puppy chasing some fun!",
        image: "🐶",
        helperWords: ["The", "playful", "puppy", "chases", "the", "red", "bouncy", "ball"],
        startingText: "The playful ..."
      },
      {
        id: 6,
        title: "The Fluffy Cat",
        prompt: "Express what this cozy kitten is doing on the rug!",
        image: "🐱",
        helperWords: ["The", "cozy", "kitten", "purrs", "warmly", "on", "the", "carpet"],
        startingText: "The cozy ..."
      },
      {
        id: 7,
        title: "Sprouting Seed",
        prompt: "Help this baby plant find the light!",
        image: "🌱",
        helperWords: ["A", "small", "green", "shoot", "grows", "toward", "the", "sun"],
        startingText: "A small ..."
      },
      {
        id: 8,
        title: "The Red Car",
        prompt: "Build an exciting path for this speeding wheel climber!",
        image: "🚗",
        helperWords: ["A", "shiny", "red", "car", "races", "up", "the", "steep", "hill"],
        startingText: "A shiny ..."
      },
      {
        id: 9,
        title: "Rainy Umbrella",
        prompt: "Keep Lulu dry in this cloudy forecast!",
        image: "☔",
        helperWords: ["The", "purple", "umbrella", "keeps", "the", "small", "raccoon", "dry"],
        startingText: "The purple ..."
      },
      {
        id: 10,
        title: "Glowing Rainbow",
        prompt: "Frame this colorful arc in the woods!",
        image: "🌈",
        helperWords: ["A", "vibrant", "rainbow", "arcs", "peacefully", "across", "the", "mountains"],
        startingText: "A vibrant ..."
      }
    ]
  },
  {
    id: "finish-the-sentence",
    title: "Finish the Sentence",
    desc: "Unleash your fantasy. Finish sentences using characters and funny objects.",
    level: "Level 2: Story Finisher",
    activities: [
      {
        id: 1,
        title: "The Magic Forest",
        prompt: "Complete the sentence to tell us about the hidden trees!",
        image: "🌲",
        helperWords: ["sparkles", "with", "pixie", "dust", "at", "night", "glows", "softly"],
        startingText: "The secret bamboo forest always..."
      },
      {
        id: 2,
        title: "My Super power",
        prompt: "What is your main wizard skill today?",
        image: "✨",
        helperWords: ["helps", "people", "breathe", "calmly", "under", "sudden", "winds"],
        startingText: "My super focus power today..."
      },
      {
        id: 3,
        title: "A Sleepy Rabbit",
        prompt: "Where does the hopper lay down to dream?",
        image: "🐰",
        helperWords: ["snuggles", "deep", "into", "warm", "moss", "dreaming", "of", "carrots"],
        startingText: "The tiny velvet rabbit..."
      },
      {
        id: 4,
        title: "The Lost Balloon",
        prompt: "Where did the wind take our floaty toy?",
        image: "🎈",
        helperWords: ["drifts", "high", "towards", "the", "fluffy", "white", "castle", "clouds"],
        startingText: "The glowing red balloon happily..."
      },
      {
        id: 5,
        title: "The Friendly Whale",
        prompt: "What song does the giant swimmer sing?",
        image: "🐋",
        helperWords: ["sings", "a", "deep", "ocean", "melody", "for", "the", "baby", "fish"],
        startingText: "Under the blue waves, the whale..."
      },
      {
        id: 6,
        title: "The Snail's Shield",
        prompt: "How does Slippy protect himself from rain?",
        image: "🐌",
        helperWords: ["hides", "safely", "inside", "his", "spiral", "house", "decorated", "with", "stars"],
        startingText: "When heavy drops drop, the snail..."
      },
      {
        id: 7,
        title: "A Secret Book",
        prompt: "What happens when you flip the dusty page?",
        image: "📚",
        helperWords: ["reveals", "a", "map", "of", "glowing", "islands", "and", "flying", "ships"],
        startingText: "Opening the ancient leather journal..."
      },
      {
        id: 8,
        title: "The Wind Giant",
        prompt: "What did the mountain breeze do to the trees?",
        image: "💨",
        helperWords: ["gently", "whispers", "funny", "stories", "to", "the", "rustling", "leaves"],
        startingText: "The friendly evening breeze..."
      },
      {
        id: 9,
        title: "The Sparky Nectar",
        prompt: "Nectar tastes wonderful to forest bugs...",
        image: "🍯",
        helperWords: ["gives", "the", "happy", "bees", "extra", "energy", "for", "focused", "loops"],
        startingText: "Drinking the magical flower juice..."
      },
      {
        id: 10,
        title: "Space Adventure",
        prompt: "Leo landed on the candy planet...",
        image: "🪐",
        helperWords: ["floats", "sweetly", "with", "chocolate", "gravity", "and", "sugar", "rings"],
        startingText: "Landing on the bubblegum planet..."
      }
    ]
  },
  {
    id: "story-builder",
    title: "Story Builder",
    desc: "Build a beautiful bedtime epic by connecting story milestones! Choose Dino, Robot, or Fairy voice character templates.",
    level: "Level 3: Epic Creator",
    activities: [
      {
        id: 1,
        title: "Dino's Lava Lake Adventure",
        prompt: "Write about Dino finding the cool blue lava lake!",
        image: "🦖",
        helperWords: ["Dino", "roars", "gently", "blue", "lava", "cold", "refreshing", "lake"],
        startingText: "Once upon a time, a gentle dinosaur named Rex..."
      },
      {
        id: 2,
        title: "Robot's Metallic Garden",
        prompt: "Help Rusty the robot plant brass rose twigs!",
        image: "🤖",
        helperWords: ["Rusty", "beep", "boop", "brass", "roses", "screwdriver", "oil", "can"],
        startingText: "In the cybernetic valley, a little copper robot..."
      },
      {
        id: 3,
        title: "Fairy's Moonlight Swing",
        prompt: "Help Flora sprinkle glitter powder over sleepers!",
        image: "🧚",
        helperWords: ["Flora", "sparkles", "bedtime", "swing", "dream", "dust", "happy", "sleep"],
        startingText: "Sailing through the silver clouds, Flora the fairy..."
      },
      {
        id: 4,
        title: "The Chocolate Waterfall",
        prompt: "What happens when they slide down the creamy stream?",
        image: "🍫",
        helperWords: ["slide", "sweet", "creamy", "splash", "fudge", "cacao", "mountains"],
        startingText: "With wooden helmets, the forest animals decided to..."
      },
      {
        id: 5,
        title: "The Castle in the Cloud",
        prompt: "Help the eagle reach the feather tower!",
        image: "🏰",
        helperWords: ["feather", "tower", "gate", "cloud", "gold", "harp", "peaceful", "sky"],
        startingText: "Soaring higher than the autumn rain, a brave eagle saw..."
      },
      {
        id: 6,
        title: "The Cozy Snow Lodge",
        prompt: "Write about sipping hot vanilla chocolate by the wood log fire!",
        image: "🪵",
        helperWords: ["cocoa", "vanilla", "fire", "hearth", "cozy", "mittens", "snow", "flakes"],
        startingText: "As white snow floated past the window pane, Barnaby sat..."
      },
      {
        id: 7,
        title: "The Coral Concert",
        prompt: "Help the crab play the shell trumpet under water!",
        image: "🦀",
        helperWords: ["trumpet", "notes", "coral", "reef", "octopus", "drum", "sea", "ballad"],
        startingText: "Inside the glowing warm coral reef, a band of crabs..."
      },
      {
        id: 8,
        title: "The Clockmaker's Secret",
        prompt: "Help Tick-Tock adjust the dream gear!",
        image: "⚙️",
        helperWords: ["tick-tock", "brass", "gears", "springs", "dream", "hour", "calming", "music"],
        startingText: "Deep inside the brass grandfather clock, a small pocket watch..."
      },
      {
        id: 9,
        title: "The Star Compass Rescue",
        prompt: "Guide Lilly back from the spinning mist valley!",
        image: "🧭",
        helperWords: ["compass", "star", "mist", "glow", "path", "beacon", "happy", "arrival"],
        startingText: "Lost inside the sweet-scented eucalyptus fog, Lilly..."
      },
      {
        id: 10,
        title: "Grandma Beaver's Quilt",
        prompt: "Write about stitches of clover and forest peace!",
        image: "🦫",
        helperWords: ["quilt", "cushion", "stitches", "clover", "piles", "soft", "moss", "nap"],
        startingText: "Weaving wool with pine needles, Grandma Beaver created..."
      }
    ]
  },
  {
    id: "mind-map-creator",
    title: "Mind Map Creator",
    desc: "Map characters, locations, and actions. Visual templates made easy!",
    level: "Level 4: Concept Cartographer",
    activities: [
      {
        id: 1,
        title: "Sparky's Map",
        prompt: "Map Sparky's goal to find the Moonflower inside Whisper Woods.",
        image: "⚡",
        helperWords: ["Sparky", "Whisper Woods", "Goal: Moonflower", "Obstacle: Blue River"],
        startingText: "Let's connect Sparky to his home and objective..."
      },
      {
        id: 2,
        title: "Dino's Volcano Map",
        prompt: "Map Dino's path to find the ice crystal in the warm crater.",
        image: "🦖",
        helperWords: ["Dino", "Hot Crater", "Goal: Ice Crystal", "Action: Jump safe"],
        startingText: "Dino needs to reach the crystal..."
      },
      {
        id: 3,
        title: "Fairy's Sparkle Map",
        prompt: "Map Flora's deliveries across the sleepy forest cabins.",
        image: "🧚",
        helperWords: ["Flora", "Sleepy Cabins", "Goal: Deliver Nectar", "Action: Fly gently"],
        startingText: "Flora prepares her daily delivery flight..."
      },
      {
        id: 4,
        title: "Benny's Dam Map",
        prompt: "Map out the resources Benny the beaver needs to secure the creek.",
        image: "🦫",
        helperWords: ["Benny", "Log Pile", "Clay paste", "Goal: Stop flow", "Action: Chomp"],
        startingText: "Benny organizes his construction site..."
      },
      {
        id: 5,
        title: "The Baker's Recipe Map",
        prompt: "Plan the ingredients and pans needed for the sweet star muffins.",
        image: "🧁",
        helperWords: ["Baker Milo", "Oat flour", "Honey jar", "Goal: Bake muffins", "Oven heat"],
        startingText: "Milo starts his morning baking mind map..."
      },
      {
        id: 6,
        title: "The Submarine's Path",
        prompt: "Map out depths, oxygen bubbles and glowing fish patterns.",
        image: "🤿",
        helperWords: ["Submarine", "Deep Abyss", "Neon Squid", "Goal: Take photos", "Bubbles"],
        startingText: "Plunging deep under the sapphire waves, Captain Max..."
      },
      {
        id: 7,
        title: "The Orchard Picnic",
        prompt: "Organize apples, check blankets and invite the bunny clan.",
        image: "🧺",
        helperWords: ["Picnic Blanket", "Red Apples", "Bunny Friends", "Goal: Laugh and rest"],
        startingText: "Preparing a delightful afternoon session..."
      },
      {
        id: 8,
        title: "The Kitten's Yarn Maze",
        prompt: "Map the path of the rolling pink wool through the cozy armchair.",
        image: "🧶",
        helperWords: ["Coco", "Armchair", "Yarn Ball", "Goal: Untangle", "Joyful claws"],
        startingText: "A soft wool yarn starts rolling across the oak floor..."
      },
      {
        id: 9,
        title: "The Mountain Ascent",
        prompt: "Map out the walking ropes, map tags and the peak victory flagpole.",
        image: "🧗",
        helperWords: ["Peak", "Rope clips", "Snow goggles", "Goal: Plant flag", "Safe steps"],
        startingText: "As clouds float beneath their timber boots, the team..."
      },
      {
        id: 10,
        title: "The Moon Flower Festival",
        prompt: "Plan the colorful paper lanterns and sweet honey juices.",
        image: "🏮",
        helperWords: ["Festival", "Paper Lanterns", "Sweet Juices", "Goal: Celebrate bloom"],
        startingText: "To honor the grand magical blossoming, the wood crew..."
      }
    ]
  },
  {
    id: "guided-writing",
    title: "Guided Writing",
    desc: "Fill-in essay visual outlines. Form coherent, detailed essays effortlessly.",
    level: "Level 5: Visual Essayist",
    activities: [
      {
        id: 1,
        title: "My Happiest Dream",
        prompt: "Write a short visual essay describing a sweet dream of flying.",
        image: "💭",
        helperWords: ["First, I flew", "sky", "clouds", "Then, I saw", "Finally, I landed", "soft"],
        startingText: "In my happier dreams, I am sailing through the... First, I flew... Then, I saw... Finally, I landed..."
      },
      {
        id: 2,
        title: "A Hero's Journey",
        prompt: "Describe an animal helping a lost forest traveler.",
        image: "🦁",
        helperWords: ["Suddenly, a traveler", "lost", "The brave lion", "led them", "Finally, safe"],
        startingText: "When the traveler could not see the path... Suddenly, a traveler... The brave lion... Finally, safe..."
      },
      {
        id: 3,
        title: "How to Grow a Flower",
        prompt: "Write a detailed guide for growing sweet morning lilies.",
        image: "🌸",
        helperWords: ["First, dig a hole", "seed", "Water daily", "sunshine", "Finally, a bud opens"],
        startingText: "Growing a lily is a beautiful task! First, dig a hole... Afterward, water daily... Finally, a bud opens..."
      },
      {
        id: 4,
        title: "My Favorite Forest Friend",
        prompt: "Introduce Squeaky or Flippy to a visitor.",
        image: "🐿️",
        helperWords: ["My favorite ally", "Squeaky", "He is special because", "Together, we love to"],
        startingText: "If you visit our magical woods, you will meet my favorite ally... He is special because... Together, we love to..."
      },
      {
        id: 5,
        title: "The Calm Wave Secret",
        prompt: "Explain how slow breathing helps you overcome tough task locks.",
        image: "🌊",
        helperWords: ["When tasks feel hard", "I take five breaths", "It works because", "Now I feel"],
        startingText: "Let me share a wizard secret! When tasks feel hard... I take five breaths... It works because... Now I feel..."
      },
      {
        id: 6,
        title: "A Day in Space Camp",
        prompt: "Tell us about tasting gravity soup and floating on chairs.",
        image: "🛸",
        helperWords: ["Space soup", "goggles", "Zero gravity", "floating", "Happy astronauts"],
        startingText: "Waking up inside the orbit station is ultra cool... In zero gravity... We slept because..."
      },
      {
        id: 7,
        title: "The Perfect Treehouse",
        prompt: "Design a visual blueprint for a treehouse of peace and calm.",
        image: "🪜",
        helperWords: ["Hammock", "Lantern light", "Book stack", "Window view", "Warm breeze"],
        startingText: "My ideal rest treehouse rests on a thick oak trunk... Inside, there is a hammock... For lighting, we use..."
      },
      {
        id: 8,
        title: "The Kind Beaver Clan",
        prompt: "Explore how beavers share winter bark soup with neighbor rabbits.",
        image: "🦫",
        helperWords: ["Benny", "Bark soup", "Kindness", "Sharing", "Cozy dinner"],
        startingText: "When frosty winds blow under the frozen creek... Benny's clan gathers... They share bark soup..."
      },
      {
        id: 9,
        title: "Conquering the Math Mountain",
        prompt: "Explain how breaking math sums into tiny visual dots makes you a wizard.",
        image: "➗",
        helperWords: ["Math sums", "Visual dots", "Tiny steps", "Math wizard", "Felt easy"],
        startingText: "Multiplications used to make my wings feel super shaky... But by drawing visual dots... Now I feel..."
      },
      {
        id: 10,
        title: "The Grand Star Sparkle",
        prompt: "Summarize the grand forest celebration where everyone shared points.",
        image: "✨",
        helperWords: ["Grand celebration", "Stamps", "Points", "Laughter", "Proud moments"],
        startingText: "At the end of our great focus quest... The forest light turned bright... Everyone shared points..."
      }
    ]
  }
];

export const mathSubmodules: MathSubmodule[] = [
  {
    id: "num-adv-jr",
    title: "🧸 Petualangan Angka (Junior)",
    desc: "Mulai petualangan berhitung dengan balon, permen, dan apel bersama karakter lucu!",
    level: "Tingkat Dasar • Level 1",
    activities: [
      {
        id: 1,
        title: "Apple Count",
        question: "There are 3 apples on the table. Mom adds 2 more apples. How many apples are there now?",
        options: ["4", "5", "6"],
        correctAnswer: "5",
        image: "🍎"
      },
      {
        id: 2,
        title: "Toy Cars",
        question: "Liam has 7 toy cars. He gives 3 cars to his friend. How many cars does he have left?",
        options: ["4", "5", "6"],
        correctAnswer: "4",
        image: "🏎️"
      },
      {
        id: 3,
        title: "Balloon Party",
        question: "There are 5 red balloons and 4 blue balloons. How many balloons are there altogether?",
        options: ["8", "9", "10"],
        correctAnswer: "9",
        image: "🎈"
      },
      {
        id: 4,
        title: "Ice Cream Shop",
        question: "Emma buys 8 ice creams. She shares 2 with her cousins. How many ice creams remain?",
        options: ["5", "6", "7"],
        correctAnswer: "6",
        image: "🍦"
      },
      {
        id: 5,
        title: "Classroom Pencils",
        question: "There are 6 pencils in one box and 3 pencils in another box. How many pencils are there in total?",
        options: ["8", "9", "10"],
        correctAnswer: "9",
        image: "✏️"
      },
      {
        id: 6,
        title: "Ducks in the Pond",
        question: "Nine ducks are swimming. Four ducks fly away. How many ducks are left?",
        options: ["5", "6", "7"],
        correctAnswer: "5",
        image: "🦆"
      },
      {
        id: 7,
        title: "Soccer Balls",
        question: "There are 4 soccer balls. The coach brings 5 more. How many soccer balls are there now?",
        options: ["8", "9", "10"],
        correctAnswer: "9",
        image: "⚽"
      },
      {
        id: 8,
        title: "Library Books",
        question: "A shelf has 10 books. A student borrows 2 books. How many books remain?",
        options: ["8", "7", "6"],
        correctAnswer: "8",
        image: "📚"
      },
      {
        id: 9,
        title: "Birthday Candies",
        question: "Maya has 6 candies. Her grandmother gives her 3 more. How many candies does Maya have now?",
        options: ["8", "9", "10"],
        correctAnswer: "9",
        image: "🍬"
      },
      {
        id: 10,
        title: "Pet Fish",
        question: "There are 10 fish in a tank. Three fish are moved to another tank. How many fish stay in the tank?",
        options: ["6", "7", "8"],
        correctAnswer: "7",
        image: "🐠"
      }
    ]
  },
  {
    id: "pattern-det",
    title: "🔍 Detektif Pola",
    desc: "Ayo temukan rahasia pola warna, bentuk, dan lompatan angka yang seru!",
    level: "Tingkat Dasar • Level 2",
    activities: [
      {
        id: 1,
        title: "Color Train",
        pattern: "Red – Blue – Red – Blue – ?",
        question: "What comes next in this train?",
        options: ["Red", "Green", "Yellow"],
        correctAnswer: "Red",
        image: "🚂"
      },
      {
        id: 2,
        title: "Shape Detective",
        pattern: "Circle – Square – Circle – Square – ?",
        question: "What comes next?",
        options: ["Triangle", "Circle", "Rectangle"],
        correctAnswer: "Circle",
        image: "📐"
      },
      {
        id: 3,
        title: "Number Path",
        pattern: "1 – 2 – 3 – 4 – ?",
        question: "What comes next?",
        options: ["5", "6", "7"],
        correctAnswer: "5",
        image: "🛣️"
      },
      {
        id: 4,
        title: "Animal Parade",
        pattern: "Dog – Cat – Dog – Cat – ?",
        question: "What comes next?",
        options: ["Rabbit", "Dog", "Bird"],
        correctAnswer: "Dog",
        image: "🐾"
      },
      {
        id: 5,
        title: "Growing Numbers",
        pattern: "2 – 4 – 6 – 8 – ?",
        question: "What comes next?",
        options: ["9", "10", "12"],
        correctAnswer: "10",
        image: "📈"
      },
      {
        id: 6,
        title: "Fruit Pattern",
        pattern: "Apple – Banana – Apple – Banana – ?",
        question: "What comes next?",
        options: ["Apple", "Orange", "Grape"],
        correctAnswer: "Apple",
        image: "🍉"
      },
      {
        id: 7,
        title: "Jumping Numbers",
        pattern: "5 – 10 – 15 – 20 – ?",
        question: "What comes next?",
        options: ["22", "24", "25"],
        correctAnswer: "25",
        image: "🦘"
      },
      {
        id: 8,
        title: "Shape Size",
        pattern: "Small Circle – Big Circle – Small Circle – Big Circle – ?",
        question: "What comes next?",
        options: ["Big Circle", "Small Circle", "Triangle"],
        correctAnswer: "Small Circle",
        image: "🔘"
      },
      {
        id: 9,
        title: "Counting Backwards",
        pattern: "10 – 9 – 8 – 7 – ?",
        question: "What comes next?",
        options: ["5", "6", "7"],
        correctAnswer: "6",
        image: "⏳"
      },
      {
        id: 10,
        title: "Rainbow Pattern",
        pattern: "Red – Orange – Yellow – Red – Orange – ?",
        question: "What comes next?",
        options: ["Yellow", "Green", "Blue"],
        correctAnswer: "Yellow",
        image: "🌈"
      }
    ]
  },
  {
    id: "visual-math",
    title: "🍕 Matematika Visual",
    desc: "Belajar fraksi pizza, grafik balok, serta membandingkan jumlah bintang!",
    level: "Tingkat Menengah • Level 3",
    activities: [
      {
        id: 1,
        title: "Apple Count",
        display: "🍎🍎🍎🍎 (Left) | 🍎🍎🍎 (Right)",
        question: "How many apples are there altogether?",
        options: ["6", "7", "8"],
        correctAnswer: "7",
        image: "🧺"
      },
      {
        id: 2,
        title: "Which Group Has More?",
        display: "Group A: ⭐⭐⭐⭐⭐⭐⭐⭐ (8 stars) | Group B: ⭐⭐⭐⭐⭐ (5 stars)",
        question: "Which group has more stars?",
        options: ["Group A", "Group B", "Same amount"],
        correctAnswer: "Group A",
        image: "🌟"
      },
      {
        id: 3,
        title: "Missing Shape",
        pattern: "Circle | Square | Circle | Square | ?",
        question: "Which shape is missing?",
        options: ["Circle", "Triangle", "Rectangle"],
        correctAnswer: "Circle",
        image: "🔮"
      },
      {
        id: 4,
        title: "Count the Animals",
        display: "🐕🐕🐕 (3 Dogs) | 🐈🐈🐈🐈 (4 Cats)",
        question: "How many animals are there in total?",
        options: ["6", "7", "8"],
        correctAnswer: "7",
        image: "🐱"
      },
      {
        id: 5,
        title: "Fraction Pizza",
        display: "A delicious pizza cut into 4 slices. 2 slices are already eaten/shaded.",
        question: "What fraction of the pizza is shaded?",
        options: ["1/4", "2/4", "3/4"],
        correctAnswer: "2/4",
        image: "🍕"
      },
      {
        id: 6,
        title: "Tallest Tower",
        display: "Tower A (4 blocks) | Tower B (6 blocks) | Tower C (5 blocks)",
        question: "Which tower is the tallest?",
        options: ["Tower A", "Tower B", "Tower C"],
        correctAnswer: "Tower B",
        image: "🏰"
      },
      {
        id: 7,
        title: "Shape Hunt",
        display: "Shapes scattered: Circle, Triangle, Square, Triangle, Circle",
        question: "How many triangles are there?",
        options: ["1", "2", "3"],
        correctAnswer: "2",
        image: "🔺"
      },
      {
        id: 8,
        title: "Half Full",
        display: "A glassy bottle filled exactly halfway with sparkling water.",
        question: "What fraction of the glass is filled?",
        options: ["1/4", "1/2", "3/4"],
        correctAnswer: "1/2",
        image: "🥤"
      },
      {
        id: 9,
        title: "Count the Coins",
        display: "🪙 🪙 🪙 (3 coins labeled $1 each)",
        question: "How much money is shown?",
        options: ["$2", "$3", "$4"],
        correctAnswer: "$3",
        image: "💰"
      },
      {
        id: 10,
        title: "Find the Rectangle",
        display: "Shapes shown: Circle, Rectangle, Triangle, Pentagon",
        question: "Which shape is the rectangle?",
        options: ["First", "Second", "Third"],
        correctAnswer: "Second",
        image: "📦"
      }
    ]
  },
  {
    id: "times-tables-fun",
    title: "⚡ Tabel Perkalian Asyik",
    desc: "Skip-counting dengan kelinci, kodok, dan kelompok kue yang bergerak seru!",
    level: "Tingkat Menengah • Level 4",
    activities: [
      {
        id: 1,
        title: "Jump Count",
        question: "Let's skip count by 2: 2, 4, 6, 8, ?",
        options: ["9", "10", "12"],
        correctAnswer: "10",
        skill: "Skip counting by 2",
        image: "🚀"
      },
      {
        id: 2,
        title: "Bunny Hops",
        question: "A cute bunny jumps 3 spaces each time: 3, 6, 9, ?",
        options: ["10", "12", "15"],
        correctAnswer: "12",
        skill: "Skip counting by 3",
        image: "🐰"
      },
      {
        id: 3,
        title: "Frog Pond",
        question: "A green frog jumps 5 lily pads each turn: 5, 10, 15, ?",
        options: ["20", "25", "30"],
        correctAnswer: "20",
        skill: "Skip counting by 5",
        image: "🐸"
      },
      {
        id: 4,
        title: "Equal Groups",
        question: "There are 2 baskets. Each basket has 4 sweet apples. How many apples are there in total?",
        options: ["6", "8", "10"],
        correctAnswer: "8",
        skill: "2 × 4",
        image: "🧺"
      },
      {
        id: 5,
        title: "Toy Boxes",
        question: "There are 3 cardboard boxes. Each box contains 3 toys. How many toys are there?",
        options: ["6", "9", "12"],
        correctAnswer: "9",
        skill: "3 × 3",
        image: "🧸"
      },
      {
        id: 6,
        title: "Egg Cartons",
        question: "There are 4 cartons. Each carton holds 2 organic eggs. How many eggs are there?",
        options: ["6", "8", "10"],
        correctAnswer: "8",
        skill: "4 × 2",
        image: "🥚"
      },
      {
        id: 7,
        title: "Flower Garden",
        question: "There are 5 neat rows. Each row has 2 flowers. How many flowers are there?",
        options: ["8", "10", "12"],
        correctAnswer: "10",
        skill: "5 × 2",
        image: "🌻"
      },
      {
        id: 8,
        title: "Cookie Trays",
        question: "There are 2 baking trays. Each tray holds 6 choco cookies. How many cookies are there?",
        options: ["10", "12", "14"],
        correctAnswer: "12",
        skill: "2 × 6",
        image: "🍪"
      },
      {
        id: 9,
        title: "Sticker Packs",
        question: "Each shiny pack has 5 stickers. Emma buys 3 packs. How many stickers does she have?",
        options: ["10", "15", "20"],
        correctAnswer: "15",
        skill: "3 × 5",
        image: "🎟️"
      },
      {
        id: 10,
        title: "Star Collector",
        question: "There are 4 boxes. Each box contains 5 stars. How many stars are there in total?",
        options: ["15", "20", "25"],
        correctAnswer: "20",
        skill: "4 × 5",
        image: "⭐"
      }
    ]
  },
  {
    id: "logic-quest",
    title: "🧩 Misi Logika Kreatif",
    desc: "Temukan puppy yang hilang, pecahkan teka-teki urutan rutinitas, dan bangun menara!",
    level: "Tingkat Lanjut • Level 5",
    activities: [
      {
        id: 1,
        title: "The Lost Puppy",
        question: "A puppy is hiding behind one of three boxes. Hint: The puppy is NOT behind the red box. Which box could the puppy be behind?",
        options: ["Red Box", "Blue Box", "Green Box"],
        correctAnswer: "Blue Box",
        hint: "Tap to make the puppy come out!",
        image: "🐶"
      },
      {
        id: 2,
        title: "Snack Time",
        question: "Lily has one apple and one banana. She eats the apple. What fruit does she still have?",
        options: ["Apple", "Banana", "None"],
        correctAnswer: "Banana",
        image: "🍌"
      },
      {
        id: 3,
        title: "Find the Odd One Out",
        question: "Which of these does not belong to the group?",
        options: ["Dog", "Rabbit", "Car"],
        correctAnswer: "Car",
        image: "🚗"
      },
      {
        id: 4,
        title: "Which Comes First?",
        question: "What happens first when you want to eat your lunch?",
        options: ["Eat lunch", "Open lunchbox", "Throw away trash"],
        correctAnswer: "Open lunchbox",
        image: "🍱"
      },
      {
        id: 5,
        title: "Build the Tower",
        question: "A tower is built with a Red block on the bottom and a Blue block on the top. Which picture shows the correct order?",
        options: ["Blue under Red", "Red under Blue", "Red only"],
        correctAnswer: "Red under Blue",
        image: "🧱"
      },
      {
        id: 6,
        title: "The Missing Toy",
        question: "Emma looked under the bed and in the closet. She did NOT look on the shelf. Where might the toy still be?",
        options: ["Under the bed", "Closet", "Shelf"],
        correctAnswer: "Shelf",
        image: "🪁"
      },
      {
        id: 7,
        title: "Animal Homes",
        question: "Fish live in water. Birds live in nests. Where do rabbits usually live?",
        options: ["Burrows", "Water", "Trees"],
        correctAnswer: "Burrows",
        image: "🐰"
      },
      {
        id: 8,
        title: "What's Different?",
        question: "Look at the items: Apple, Apple, Apple, Banana. Which is different?",
        options: ["Apple", "Banana", "None"],
        correctAnswer: "Banana",
        image: "🍌"
      },
      {
        id: 9,
        title: "The Shortest Route",
        question: "Look at the maze. There are three possible paths (A, B, C). Path B is straight, A and C are winding. Which is shortest?",
        options: ["Path A", "Path B", "Path C"],
        correctAnswer: "Path B",
        image: "🧭"
      },
      {
        id: 10,
        title: "Morning Routine",
        question: "Choose the best order for: (1) Wake up, (2) Brush teeth, (3) Go to school.",
        options: ["1 → 2 → 3", "2 → 1 → 3", "3 → 2 → 1"],
        correctAnswer: "1 → 2 → 3",
        image: "⏰"
      }
    ]
  },
  {
    id: "num-adv-sr",
    title: "🪐 Petualangan Angka (Advanced)",
    desc: "Tantangan angka ratusan yang seru untuk melatih kemampuan matematika hebatmu!",
    level: "Tingkat Lanjut • Level 6",
    activities: [
      {
        id: 1,
        title: "School Carnival",
        question: "Your class sold 127 tickets in the morning and 146 tickets in the afternoon. How many tickets were sold in total?",
        options: ["263", "273", "283"],
        correctAnswer: "273",
        image: "🎟️"
      },
      {
        id: 2,
        title: "Library Challenge",
        question: "The school library had 425 books. 67 books were borrowed this week. How many books remain in the library?",
        options: ["348", "358", "368"],
        correctAnswer: "358",
        image: "📖"
      },
      {
        id: 3,
        title: "Aquarium Visitors",
        question: "An aquarium welcomed 235 visitors before lunch and 184 visitors after lunch. How many visitors came altogether?",
        options: ["409", "419", "429"],
        correctAnswer: "419",
        image: "🐬"
      },
      {
        id: 4,
        title: "Science Camp",
        question: "There are 8 cabins. Each cabin can hold 6 students. How many students can stay at the camp?",
        options: ["42", "48", "54"],
        correctAnswer: "48",
        image: "🏕️"
      },
      {
        id: 5,
        title: "Charity Drive",
        question: "Students collected 315 cans. They donated 128 cans. How many cans remain?",
        options: ["177", "187", "197"],
        correctAnswer: "187",
        image: "🥫"
      },
      {
        id: 6,
        title: "School Garden",
        question: "There are 24 rows of flowers. Each row contains 5 flowers. How many flowers are there?",
        options: ["110", "120", "130"],
        correctAnswer: "120",
        image: "🌺"
      },
      {
        id: 7,
        title: "Reading Challenge",
        question: "Emma read 16 books in the first semester and 21 books in the second semester. How many books did she read altogether?",
        options: ["35", "37", "39"],
        correctAnswer: "37",
        image: "📘"
      },
      {
        id: 8,
        title: "Sports Day",
        question: "A race track is 250 meters long. Students run 4 laps. How many meters do they run?",
        options: ["900", "1000", "1100"],
        correctAnswer: "1000",
        image: "🏃"
      },
      {
        id: 9,
        title: "Saving Money",
        question: "Noah saved $300. He spent $145 on a bicycle. How much money does he have left?",
        options: ["$145", "$155", "$165"],
        correctAnswer: "$155",
        image: "💵"
      },
      {
        id: 10,
        title: "Museum Visit",
        question: "A museum welcomed 178 visitors on Saturday and 232 visitors on Sunday. How many visitors came during the weekend?",
        options: ["400", "410", "420"],
        correctAnswer: "410",
        image: "🏛️"
      }
    ]
  }
];

export const executiveSubmodules: ExecutiveSubmodule[] = [
  {
    id: "focus-control",
    title: "🛑 Pengendali Impuls & Kontrol Diri",
    desc: "Latih kemampuan mengerem tubuh dan menunda keinginan demi meraih piala emas!",
    level: "Tingkat Dasar • Level 1",
    activities: [
      {
        id: 1,
        title: "Slam the Brake!",
        question: "Lampu lalu lintas berubah MERAH! Apa yang harus kamu lakukan segera?",
        options: ["Lari kencang", "Berhenti & Diam", "Lompat-lompat"],
        correctAnswer: "Berhenti & Diam",
        image: "🛑",
        type: "dance",
        hint: "Self-control means knowing when to stop your body!"
      },
      {
        id: 2,
        title: "Sparky is Sleeping!",
        question: "Sparky si kunang-kunang sedang tidur nyenyak. Agar tidak membangunkannya, kita harus...",
        options: ["Berteriak keras", "Berjalan pelan & sunyi", "Menyanyi lagu ceria"],
        correctAnswer: "Berjalan pelan & sunyi",
        image: "🤫",
        type: "dance"
      },
      {
        id: 3,
        title: "Wait for the Star!",
        question: "Sebuah Bintang Emas akan jatuh. Kita harus menunggu sampai hitungan ke-5 baru boleh menangkapnya. Kapan kita menangkap?",
        options: ["Di hitungan ke-2", "Setelah hitungan ke-5", "Kapan saja bebas"],
        correctAnswer: "Setelah hitungan ke-5",
        image: "⭐",
        type: "dance"
      },
      {
        id: 4,
        title: "The Quiet Volcano",
        question: "Gunung berapi mini ini akan meletus jika kita berisik. Apa taktik terbaik agar gunung tetap tenang?",
        options: ["Tarik napas & tutup mulut rapat", "Berteriak bersama Dino", "Menari heboh"],
        correctAnswer: "Tarik napas & tutup mulut rapat",
        image: "🌋",
        type: "dance"
      },
      {
        id: 5,
        title: "The Slow Turtle Crossing",
        question: "Kura-kura Sammy berjalan sangat pelan menyeberang jalan. Apa yang harus kita lakukan?",
        options: ["Mendorongnya agar cepat", "Menunggu dengan sabar dan tenang", "Meninggalkannya pergi"],
        correctAnswer: "Menunggu dengan sabar dan tenang",
        image: "🐢",
        type: "dance"
      },
      {
        id: 6,
        title: "Balloon Pop Control",
        question: "Ada 3 balon biru dan 1 balon merah berduri. Balon mana yang TIDAK boleh kamu sentuh agar tidak meletus keras?",
        options: ["Balon biru kesatu", "Balon biru kedua", "Balon merah berduri"],
        correctAnswer: "Balon merah berduri",
        image: "🎈",
        type: "dance"
      },
      {
        id: 7,
        title: "Dino's Loud Sound",
        question: "Dino mengeluarkan suara raungan yang keras! Apa reaksi terbaik agar telingamu tetap aman?",
        options: ["Menutup telinga dengan tenang", "Ikut berteriak lebih keras", "Berlari panik"],
        correctAnswer: "Menutup telinga dengan tenang",
        image: "🦖",
        type: "dance"
      },
      {
        id: 8,
        title: "The Golden Marshmallow",
        question: "Jika kamu menunggu 1 menit tanpa memakan Marshmallow pertama, kamu mendapat 2 Marshmallow! Apa pilihan cerdasmu?",
        options: ["Langsung makan sekarang", "Menunggu dengan tenang demi dapat 2", "Membuangnya ke lantai"],
        correctAnswer: "Menunggu dengan tenang demi dapat 2",
        image: "🍡",
        type: "dance"
      },
      {
        id: 9,
        title: "Freeze on the Beat",
        question: "Saat musik pengiring mati tiba-tiba, tubuh kita harus seperti...",
        options: ["Patung es yang beku", "Kelinci melompat", "Burung terbang"],
        correctAnswer: "Patung es yang beku",
        image: "🎵",
        type: "dance"
      },
      {
        id: 10,
        title: "The Freeze Dance Final Quest",
        question: "Kamu sampai di babak final! Untuk memenangkan piala emas, saat instruktur berteriak 'FREEZE!', kamu harus...",
        options: ["Mengedipkan mata saja", "Diam membatu tanpa gerak sedikit pun", "Menggaruk kepala"],
        correctAnswer: "Diam membatu tanpa gerak sedikit pun",
        image: "🏆",
        type: "dance"
      }
    ]
  },
  {
    id: "working-memory",
    title: "🧠 Pelatihan Memori Kerja (Working Memory)",
    desc: "Ingat instruksi, jalur bintang, dan detail tersembunyi untuk melatih daya ingat kuatmu!",
    level: "Tingkat Menengah • Level 2",
    activities: [
      {
        id: 1,
        title: "The Beaver's Path",
        question: "Kura-kura Sammy berjalan melewati: Batu → Batang Pohon → Sungai. Mana urutan jalan Sammy yang benar?",
        options: ["Sungai → Batu → Pohon", "Batu → Batang Pohon → Sungai", "Pohon → Sungai → Batu"],
        correctAnswer: "Batu → Batang Pohon → Sungai",
        image: "🪵",
        type: "memory"
      },
      {
        id: 2,
        title: "Sparky's Color Flash",
        question: "Sparky menyalakan lampunya dengan warna: Kuning, lalu Hijau, lalu Merah. Apa warna kedua yang dinyalakan?",
        options: ["Kuning", "Hijau", "Merah"],
        correctAnswer: "Hijau",
        image: "💡",
        type: "memory"
      },
      {
        id: 3,
        title: "The Missing Toy Hunt",
        question: "Kamu menaruh robot di laci, bola di bawah kasur, dan buku di meja. Di mana kamu menaruh bola?",
        options: ["Di laci", "Di meja", "Di bawah kasur"],
        correctAnswer: "Di bawah kasur",
        image: "🧸",
        type: "memory"
      },
      {
        id: 4,
        title: "The Grocery Memory",
        question: "Ibu memintamu membeli: Apel, Susu, dan Roti. Di supermarket, kamu membeli Apel dan Roti. Apa barang ketiga yang terlupa?",
        options: ["Keju", "Susu", "Madu"],
        correctAnswer: "Susu",
        image: "🛒",
        type: "memory"
      },
      {
        id: 5,
        title: "The Animal Parade",
        question: "Ada tiga hewan berbaris: Kelinci di depan, Gajah di tengah, Semut di belakang. Siapa yang ada di paling belakang?",
        options: ["Kelinci", "Gajah", "Semut"],
        correctAnswer: "Semut",
        image: "🐘",
        type: "memory"
      },
      {
        id: 6,
        title: "Magic Safe Combination",
        question: "Kode rahasia peti adalah: 3 - 7 - 2. Berapa angka di tengah kode tersebut?",
        options: ["3", "7", "2"],
        correctAnswer: "7",
        image: "🔒",
        type: "memory"
      },
      {
        id: 7,
        title: "Dino's Breakfast",
        question: "Dino makan daun hijau di pagi hari dan buah beri merah di siang hari. Apa yang dimakan Dino di pagi hari?",
        options: ["Buah beri merah", "Daun hijau", "Ikan segar"],
        correctAnswer: "Daun hijau",
        image: "🌿",
        type: "memory"
      },
      {
        id: 8,
        title: "The Magic Sound Pattern",
        question: "Dengarkan ketukan suara: Plok! Plok! Bum! Plok! Plok! Bum! Apa suara setelah dua Plok! berikutnya?",
        options: ["Plok!", "Bum!", "Ssshh!"],
        correctAnswer: "Bum!",
        image: "🥁",
        type: "memory"
      },
      {
        id: 9,
        title: "The Backwards Word",
        question: "Jika kata 'B-A-C-A' dibaca terbalik dari belakang ke depan, huruf pertamanya menjadi apa?",
        options: ["B", "C", "A"],
        correctAnswer: "A",
        image: "✏️",
        type: "memory"
      },
      {
        id: 10,
        title: "The Ultra Memory Champion",
        question: "Pahlawan mengingat 4 petunjuk: Utara, Selatan, Timur, Barat. Mana arah kedua yang disebutkan?",
        options: ["Utara", "Selatan", "Timur"],
        correctAnswer: "Selatan",
        image: "🧭",
        type: "memory"
      }
    ]
  },
  {
    id: "focus-shift",
    title: "⚡ Fokus & Fleksibilitas Berpikir (Cognitive Shifting)",
    desc: "Latih kemampuan berpindah fokus dengan cepat, menyaring gangguan, dan bernapas tenang!",
    level: "Tingkat Semua Umur • Level 3",
    activities: [
      {
        id: 1,
        title: "The 3-Breath Inhale",
        question: "Saat pikiranmu mulai melayang, apa cara tercepat mengembalikan fokusmu?",
        options: ["Menonton TV", "Tarik napas dalam 3 kali", "Berlari keliling ruangan"],
        correctAnswer: "Tarik napas dalam 3 kali",
        image: "💨",
        type: "breathing"
      },
      {
        id: 2,
        title: "Color-Shape Shift Quest",
        question: "Pertama, cari benda berwarna Merah. Lalu segera ganti fokus mencari benda berbentuk Bulat. Jika ada apel merah bulat, ia cocok dengan...",
        options: ["Warna saja", "Bentuk saja", "Dua-duanya (Warna & Bentuk)"],
        correctAnswer: "Dua-duanya (Warna & Bentuk)",
        image: "🔴",
        type: "breathing"
      },
      {
        id: 3,
        title: "Bubble Balloon Sort",
        question: "Kelompokkan balon terbang: Balon merah ke kiri, balon kuning ke kanan. Jika muncul balon merah, ke mana ia pergi?",
        options: ["Kiri", "Kanan", "Atas"],
        correctAnswer: "Kiri",
        image: "🎈",
        type: "breathing"
      },
      {
        id: 4,
        title: "The Heavy Rain Focus",
        question: "Hujan deras turun dengan suara berisik. Agar bisa tetap membaca buku petualangan, kita harus...",
        options: ["Menutup jendela & fokus pada halaman buku", "Berteriak menandingi suara hujan", "Berhenti membaca selamanya"],
        correctAnswer: "Menutup jendela & fokus pada halaman buku",
        image: "🌧️",
        type: "breathing"
      },
      {
        id: 5,
        title: "The Day & Night Switch",
        question: "Saat gambar menunjukkan MATAHARI, kamu harus berteriak 'Pagi!'. Saat menunjukkan BULAN, teriak 'Malam!'. Jika gambar tiba-tiba berganti dari matahari ke bulan, apa teriakan barumu?",
        options: ["Pagi!", "Malam!", "Sore!"],
        correctAnswer: "Malam!",
        image: "☀️",
        type: "breathing"
      },
      {
        id: 6,
        title: "The Inhale Balloon",
        question: "Bayangkan ada balon di dalam perutmu. Saat menarik napas (Inhale), balon itu menjadi...",
        options: ["Mengembang besar", "Mengempis kecil", "Meletus"],
        correctAnswer: "Mengembang besar",
        image: "🧘",
        type: "breathing"
      },
      {
        id: 7,
        title: "The Left-Right Brain Tap",
        question: "Sentuh lutut kanan dengan tangan kiri, lalu lutut kiri dengan tangan kanan. Olahraga silang ini membantu...",
        options: ["Kedua belah otak bekerja sama & fokus", "Mata menjadi mengantuk", "Kaki tumbuh tinggi"],
        correctAnswer: "Kedua belah otak bekerja sama & fokus",
        image: "🤸",
        type: "breathing"
      },
      {
        id: 8,
        title: "The Focus Filter",
        question: "Ada suara anjing menggonggong di luar, suara TV di ruang tamu, dan suara Ibu membacakan cerita di depanmu. Suara siapa yang harus kamu dengarkan?",
        options: ["Suara anjing", "Suara TV", "Suara Ibu"],
        correctAnswer: "Suara Ibu",
        image: "🗣️",
        type: "breathing"
      },
      {
        id: 9,
        title: "Cloud Shape Detective",
        question: "Awan di langit berubah dari bentuk Kelinci menjadi bentuk Kapal. Kamu harus cepat beradaptasi mengikuti perubahan. Kemampuan ini disebut...",
        options: ["Kekakuan pikiran", "Kelenturan berpikir (Flexibility)", "Kecepatan berlari"],
        correctAnswer: "Kelenturan berpikir (Flexibility)",
        image: "☁️",
        type: "breathing"
      },
      {
        id: 10,
        title: "The Zen Mind Master",
        question: "Selamat! Kamu telah menyelesaikan petualangan fokus. Cara terbaik menjaga pikiran tenang sepanjang hari adalah...",
        options: ["Mengatur napas teratur & tersenyum", "Makan permen manis banyak-banyak", "Marah saat kesal"],
        correctAnswer: "Mengatur napas teratur & tersenyum",
        image: "✨",
        type: "breathing"
      }
    ]
  }
];
