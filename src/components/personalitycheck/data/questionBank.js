// Question bank with multiple choices and trait mapping
export const questionBank = [
  {
    id: 1,
    question: "What's your ideal first date? 🍷",
    category: "activities",
    weight: 1.2,
    options: [
      { text: "A cozy dinner with deep conversation", value: "deep thinker", traits: ["introvert", "intellectual"] },
      { text: "Something active and adventurous", value: "adventurer", traits: ["extrovert", "spontaneous"] },
      { text: "Netflix and chill at home", value: "homebody", traits: ["introvert", "relaxed"] },
      { text: "Bar hopping and meeting new people", value: "socialite", traits: ["extrovert", "social"] }
    ]
  },
  {
    id: 2,
    question: "How do you usually approach someone you're interested in? 😉",
    category: "approach",
    weight: 1.5,
    options: [
      { text: "Make the first move with confidence", value: "confident", traits: ["extrovert", "direct"] },
      { text: "Drop subtle hints and see if they notice", value: "subtle", traits: ["strategic", "patient"] },
      { text: "Ask mutual friends to help set us up", value: "strategic", traits: ["planner", "cautious"] },
      { text: "Wait for them to approach me first", value: "patient", traits: ["introvert", "cautious"] }
    ]
  },
  {
    id: 3,
    question: "What quality instantly attracts you to someone?",
    category: "preferences",
    weight: 1.3,
    options: [
      { text: "A great sense of humor", value: "humor", traits: ["playful", "relaxed"] },
      { text: "Intelligence and wit", value: "intellect", traits: ["intellectual", "deep"] },
      { text: "Kindness and compassion", value: "empathy", traits: ["empathetic", "warm"] },
      { text: "Confidence and ambition", value: "ambition", traits: ["driven", "focused"] }
    ]
  },
  {
    id: 4,
    question: "If your dating life was a movie genre, what would it be?",
    category: "self-perception",
    weight: 1.0,
    options: [
      { text: "Romantic comedy with awkward moments", value: "romcom", traits: ["playful", "optimistic"] },
      { text: "Drama with deep emotional connections", value: "drama", traits: ["deep", "emotional"] },
      { text: "Adventure with exciting new experiences", value: "adventure", traits: ["spontaneous", "explorer"] },
      { text: "Indie film that defies categorization", value: "unique", traits: ["creative", "nonconformist"] }
    ]
  },
  {
    id: 5,
    question: "What's your biggest green flag in someone? 💚",
    category: "values",
    weight: 1.4,
    options: [
      { text: "They're kind to service workers", value: "respectful", traits: ["empathetic", "observant"] },
      { text: "They make me laugh constantly", value: "humorous", traits: ["playful", "lighthearted"] },
      { text: "They're ambitious with clear goals", value: "ambitious", traits: ["driven", "focused"] },
      { text: "They're emotionally available", value: "available", traits: ["open", "communicative"] }
    ]
  },
  {
    id: 6,
    question: "When are you at your charming best? ✨",
    category: "timing",
    weight: 0.8,
    followUpFor: ["extrovert", "introvert"],
    options: [
      { text: "Morning - I'm an early bird", value: "morning", traits: ["organized", "energetic"] },
      { text: "Afternoon - post-coffee perfection", value: "afternoon", traits: ["balanced", "steady"] },
      { text: "Evening - dinner and drinks time", value: "evening", traits: ["social", "relaxed"] },
      { text: "Late night - the night owl hours", value: "night", traits: ["creative", "thoughtful"] }
    ]
  },
  {
    id: 7,
    question: "What's your typical texting style with someone you're dating?",
    category: "communication",
    weight: 1.2,
    followUpFor: ["communicative", "direct"],
    options: [
      { text: "Quick replies, constant conversation", value: "responsive", traits: ["attentive", "engaged"] },
      { text: "Thoughtful messages, may take time", value: "thoughtful", traits: ["reflective", "deliberate"] },
      { text: "Memes and GIFs - keeping it fun", value: "playful", traits: ["humorous", "lighthearted"] },
      { text: "Voice messages - text is too impersonal", value: "personal", traits: ["expressive", "direct"] }
    ]
  },
  {
    id: 8,
    question: "What's your primary love language?",
    category: "love-language",
    weight: 1.5,
    options: [
      { text: "Words of affirmation", value: "words", traits: ["verbal", "expressive"] },
      { text: "Quality time together", value: "time", traits: ["present", "attentive"] },
      { text: "Physical touch", value: "touch", traits: ["affectionate", "sensory"] },
      { text: "Acts of service", value: "service", traits: ["helpful", "practical"] },
      { text: "Receiving gifts", value: "gifts", traits: ["appreciative", "thoughtful"] }
    ]
  },
  {
    id: 9,
    question: "How would you describe your social energy?",
    category: "sociability",
    weight: 1.7,
    options: [
      { text: "Extroverted - love being around people", value: "extrovert", traits: ["outgoing", "energized-by-others"] },
      { text: "Introverted - need alone time to recharge", value: "introvert", traits: ["reflective", "self-sufficient"] },
      { text: "Ambivert - balanced between both", value: "ambivert", traits: ["adaptable", "flexible"] },
      { text: "Depends entirely on my mood that day", value: "variable", traits: ["unpredictable", "spontaneous"] }
    ]
  },
  {
    id: 10,
    question: "What's a deal-breaker that's non-negotiable for you?",
    category: "boundaries",
    weight: 1.3,
    followUpFor: ["values", "boundaries"],
    options: [
      { text: "Poor communication skills", value: "communication", traits: ["communicative", "direct"] },
      { text: "Lack of ambition or goals", value: "ambition", traits: ["driven", "future-oriented"] },
      { text: "Different values or beliefs", value: "values", traits: ["principled", "conviction"] },
      { text: "Rudeness to others", value: "kindness", traits: ["empathetic", "respectful"] }
    ]
  },
  {
    id: 11,
    question: "How do you handle disagreements in a relationship?",
    category: "conflict",
    weight: 1.4,
    followUpFor: ["communicative", "direct", "cautious"],
    options: [
      { text: "Talk it out calmly right away", value: "communicator", traits: ["direct", "problem-solver"] },
      { text: "Need space first, then discuss", value: "processor", traits: ["reflective", "deliberate"] },
      { text: "Try to see their perspective first", value: "empathetic", traits: ["understanding", "patient"] },
      { text: "Look for a compromise or middle ground", value: "diplomat", traits: ["adaptable", "harmonious"] }
    ]
  },
  {
    id: 12,
    question: "What role does social media play in your dating life?",
    category: "technology",
    weight: 0.9,
    followUpFor: ["extrovert", "introvert", "private"],
    options: [
      { text: "Very important - I share relationship moments", value: "public", traits: ["open", "expressive"] },
      { text: "I check it but keep relationships private", value: "private", traits: ["discreet", "boundaries"] },
      { text: "Minimal - I prefer real-life connections", value: "offline", traits: ["present", "traditional"] },
      { text: "I use it mainly for messaging", value: "practical", traits: ["functional", "pragmatic"] }
    ]
  },
  {
    id: 13,
    question: "How important is having similar interests with a partner?",
    category: "compatibility",
    weight: 1.1,
    followUpFor: ["balanced", "flexible"],
    options: [
      { text: "Very - we need common hobbies", value: "shared", traits: ["connected", "similar"] },
      { text: "Somewhat - a few shared interests is enough", value: "balanced", traits: ["flexible", "independent"] },
      { text: "Not very - opposites can attract", value: "contrast", traits: ["adventurous", "open-minded"] },
      { text: "I prefer someone who introduces me to new things", value: "explorer", traits: ["curious", "growth-oriented"] }
    ]
  },
  {
    id: 14,
    question: "What's your approach to planning dates?",
    category: "planning",
    weight: 1.2,
    followUpFor: ["organized", "spontaneous"],
    options: [
      { text: "I love planning every detail", value: "planner", traits: ["organized", "thoughtful"] },
      { text: "Go with the flow, see what happens", value: "spontaneous", traits: ["adaptable", "carefree"] },
      { text: "I prefer when the other person plans", value: "receptive", traits: ["appreciative", "flexible"] },
      { text: "Let's decide together what to do", value: "collaborative", traits: ["teamwork", "inclusive"] }
    ]
  },
  {
    id: 15,
    question: "How do you show someone you care about them?",
    category: "expression",
    weight: 1.5,
    options: [
      { text: "Tell them directly with words", value: "expressive", traits: ["verbal", "direct"] },
      { text: "Through thoughtful actions and gestures", value: "attentive", traits: ["considerate", "observant"] },
      { text: "Quality time and undivided attention", value: "present", traits: ["engaged", "focused"] },
      { text: "Physical affection and closeness", value: "affectionate", traits: ["tactile", "warm"] }
    ]
  },
  {
    id: 16,
    question: "How quickly do you open up to someone new?",
    category: "vulnerability",
    weight: 1.3,
    followUpFor: ["cautious", "open", "private"],
    options: [
      { text: "Quickly - I'm an open book", value: "open", traits: ["transparent", "trusting"] },
      { text: "Gradually - I test the waters first", value: "gradual", traits: ["cautious", "observant"] },
      { text: "Slowly - trust takes time to build", value: "guarded", traits: ["private", "selective"] },
      { text: "Depends on the connection we have", value: "intuitive", traits: ["perceptive", "responsive"] }
    ]
  },
  {
    id: 17,
    question: "What's your idea of a perfect weekend with a partner?",
    category: "lifestyle",
    weight: 1.2,
    followUpFor: ["relaxed", "adventurous", "social"],
    options: [
      { text: "Staying in, cooking together and watching movies", value: "cozy", traits: ["homebody", "intimate"] },
      { text: "Exploring new places and having adventures", value: "explorer", traits: ["curious", "active"] },
      { text: "Balance of social events and quiet time", value: "balanced", traits: ["flexible", "adaptable"] },
      { text: "Productive mix of fun and getting things done", value: "productive", traits: ["organized", "efficient"] }
    ]
  },
  {
    id: 18,
    question: "How would your friends describe your role in the group?",
    category: "social-role",
    weight: 1.1,
    followUpFor: ["outgoing", "reflective"],
    options: [
      { text: "The organizer who brings everyone together", value: "connector", traits: ["social", "leadership"] },
      { text: "The caring one who checks in on everyone", value: "nurturer", traits: ["empathetic", "supportive"] },
      { text: "The fun one who keeps things lively", value: "entertainer", traits: ["playful", "energetic"] },
      { text: "The wise one who gives thoughtful advice", value: "adviser", traits: ["reflective", "perceptive"] }
    ]
  },
  {
    id: 19,
    question: "What's most important to you in a long-term relationship?",
    category: "relationship-values",
    weight: 1.6,
    options: [
      { text: "Passionate connection and romance", value: "passion", traits: ["romantic", "expressive"] },
      { text: "Deep friendship and companionship", value: "friendship", traits: ["steady", "consistent"] },
      { text: "Growth and evolving together", value: "growth", traits: ["dynamic", "progressive"] },
      { text: "Stability and building a secure future", value: "stability", traits: ["reliable", "practical"] }
    ]
  },
  {
    id: 20,
    question: "How do you recharge after a stressful day?",
    category: "self-care",
    weight: 1.0,
    followUpFor: ["introvert", "extrovert"],
    options: [
      { text: "Alone time with a book or show", value: "solo", traits: ["introspective", "independent"] },
      { text: "Talking with friends or partner", value: "social", traits: ["communicative", "connected"] },
      { text: "Physical activity or exercise", value: "active", traits: ["energetic", "physical"] },
      { text: "Creative outlet like art or music", value: "creative", traits: ["expressive", "imaginative"] }
    ]
  }
];