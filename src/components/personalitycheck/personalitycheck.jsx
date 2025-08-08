import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import '../../index.css';

const PersonalityCheck = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [questionsQueue, setQuestionsQueue] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [minQuestionsAsked, setMinQuestionsAsked] = useState(false);
  
  const [text] = useTypewriter({
    words: [
      "Personality",
      "Character",
      "Dating Style",
      "Love Language",
      "Romantic Type",
    ],
    loop: {},
    typeSpeed: 200,
    deleteSpeed: 80,
  });

  // Potential questions bank with multiple choices and category tags
  const questionBank = [
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

  // Welcome message
  const welcomeMessage = "Hey! 👋 Before I send you out into the dating jungle, I wanna know you a little better. Ready? 😉 First question coming up...";

  // Personality trait tracking
  const [traitScores, setTraitScores] = useState({});

  // Initialize with welcome message and prepare first questions
  useEffect(() => {
    const textToType = welcomeMessage;
    let timer;

    if (typingIndex < textToType.length) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + textToType[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 30); // typing speed
    } else {
      setIsTyping(false);
      
      // If we haven't initialized questions yet, do it now
      if (questionsQueue.length === 0 && !personalityResult) {
        initializeQuestions();
      }
    }

    return () => clearTimeout(timer);
  }, [typingIndex, questionsQueue.length, personalityResult]);

  // Initialize questions intelligently
  const initializeQuestions = () => {
    // Start with key personality assessment questions
    const initialCategoriesNeeded = ['sociability', 'approach', 'values', 'expression', 'conflict'];
    
    // Get one question from each important category
    const initialQuestions = initialCategoriesNeeded.map(category => {
      const categoryQuestions = questionBank.filter(q => q.category === category);
      // Pick the highest weighted question from each category
      return categoryQuestions.sort((a, b) => b.weight - a.weight)[0];
    }).filter(q => q); // Remove any undefined items (in case a category wasn't found)
    
    // Fill remaining spots with high-weighted questions from other categories
    const remainingQuestions = questionBank
      .filter(q => !initialCategoriesNeeded.includes(q.category))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10);
    
    // Combine and shuffle slightly to avoid predictability while keeping important questions early
    const allQuestions = [...initialQuestions, ...remainingQuestions];
    
    // Fisher-Yates shuffle with bias toward keeping initial questions early
    for (let i = allQuestions.length - 1; i > 0; i--) {
      // Less shuffling for early questions (important categories)
      const randomFactor = i < initialQuestions.length ? 0.3 : 1;
      if (Math.random() < randomFactor) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
      }
    }
    
    // Start with the most insightful question, then queue the rest
    if (allQuestions.length > 0) {
      setQuestionsQueue(allQuestions);
    }
  };



  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    // Get current question and selected option
    const currentQuestion = questionsQueue[0];
    const selectedOptionObj = currentQuestion.options.find(opt => opt.value === selectedOption);
    
    // Record response
    const newResponse = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      question: currentQuestion.question,
      answer: selectedOptionObj.text,
      value: selectedOption,
      traits: selectedOptionObj.traits
    };
    
    const newResponses = [...userResponses, newResponse];
    setUserResponses(newResponses);
    
    // Update trait scores
    const updatedTraits = {...traitScores};
    
    // Add traits from this answer with weighting
    selectedOptionObj.traits.forEach(trait => {
      const currentScore = updatedTraits[trait] || 0;
      updatedTraits[trait] = currentScore + (currentQuestion.weight || 1);
    });
    
    setTraitScores(updatedTraits);
    
    // Calculate confidence level in personality assessment
    updateConfidenceLevel(updatedTraits, newResponses.length);
    
    // Check if we've asked minimum number of questions
    if (newResponses.length >= 5) {
      setMinQuestionsAsked(true);
    }
    
    // Reset selection for next question
    setSelectedOption(null);
    
    // Determine if we should continue or finish
    if (newResponses.length < 5 || (confidenceLevel < 0.8 && newResponses.length < 8)) {
      // Remove the current question from the queue
      const remainingQuestions = [...questionsQueue.slice(1)];
      
      // Find the next best question based on traits so far
      const nextBestQuestion = selectNextBestQuestion(updatedTraits, newResponses);
      
      // If we found a tailored follow-up question, add it to the front of the queue
      if (nextBestQuestion && !newResponses.some(r => r.questionId === nextBestQuestion.id)) {
        setQuestionsQueue([nextBestQuestion, ...remainingQuestions]);
      } else {
        setQuestionsQueue(remainingQuestions);
      }
      
      // If we've somehow run out of questions, analyze what we have
      if (remainingQuestions.length === 0 && !nextBestQuestion) {
        startAnalysis(newResponses, updatedTraits);
      }
      
    } else {
      // We have enough questions and confidence
      startAnalysis(newResponses, updatedTraits);
    }
  };
  
  // Helper function to update confidence level
  const updateConfidenceLevel = (traits, questionCount) => {
    const traitEntries = Object.entries(traits);
    if (traitEntries.length > 0) {
      // Sort traits by score
      const sortedTraits = traitEntries.sort((a, b) => b[1] - a[1]);
      
      // If we have a clear top trait (significantly higher than the rest)
      if (sortedTraits.length >= 2) {
        const topScore = sortedTraits[0][1];
        const runnerUpScore = sortedTraits[1][1];
        const scoreDifferential = topScore - runnerUpScore;
        
        // Calculate confidence based on:
        // 1. How many questions we've asked (more = higher confidence)
        // 2. How distinct the top trait is from others
        const questionCountFactor = Math.min(questionCount / 10, 1); // Max out at 10 questions
        const traitDistinctness = scoreDifferential / topScore;
        
        const newConfidence = Math.min(
          questionCountFactor * 0.6 + traitDistinctness * 0.4,
          1.0
        );
        
        setConfidenceLevel(newConfidence);
      }
    }
  };
  
  // Find the best next question based on current traits
  const selectNextBestQuestion = (currentTraits, responses) => {
    // Get the top 3 traits so far
    const topTraits = Object.entries(currentTraits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => trait);
    
    // Find questions that follow up on these traits that we haven't asked yet
    const askedQuestionIds = responses.map(r => r.questionId);
    
    // Look for follow-up questions for our top traits
    const followUpQuestions = questionBank.filter(q => 
      q.followUpFor && // Has follow-up trait definitions
      q.followUpFor.some(trait => topTraits.includes(trait)) && // Matches one of our top traits
      !askedQuestionIds.includes(q.id) // Haven't asked this yet
    );
    
    if (followUpQuestions.length > 0) {
      // Return the highest weighted follow-up question
      return followUpQuestions.sort((a, b) => b.weight - a.weight)[0];
    }
    
    // If no specific follow-ups, get a question from an under-represented category
    const categories = responses.map(r => r.category);
    const underRepresentedQuestions = questionBank.filter(q => 
      !categories.includes(q.category) && 
      !askedQuestionIds.includes(q.id)
    );
    
    if (underRepresentedQuestions.length > 0) {
      return underRepresentedQuestions.sort((a, b) => b.weight - a.weight)[0];
    }
    
    // If all else fails, pick any unasked high-weight question
    const remainingQuestions = questionBank.filter(q => !askedQuestionIds.includes(q.id));
    if (remainingQuestions.length > 0) {
      return remainingQuestions.sort((a, b) => b.weight - a.weight)[0];
    }
    
    return null; // No more questions available
  };
  
  // Start the analysis phase
  const startAnalysis = (responses, traits) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      analyzePersonality(responses, traits);
    }, 1500);
  };

  const analyzePersonality = (responses, finalTraits) => {
    // Advanced trait-based analysis using weighted responses
    
    // Get top 3 traits based on scores
    const topTraits = Object.entries(finalTraits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => trait);
    
    // Comprehensive personality mapping based on trait combinations
    const personalityProfiles = [
      {
        tag: "Social Butterfly",
        traits: ["outgoing", "energetic", "social"],
        description: "You shine in social settings! Your outgoing nature draws people to you naturally, making first dates exciting and memorable."
      },
      {
        tag: "Thoughtful Observer",
        traits: ["reflective", "deep", "observant"],
        description: "You value deeper connections and take time to truly understand others. Your thoughtful approach creates meaningful relationships."
      },
      {
        tag: "Balanced Connector",
        traits: ["adaptable", "ambivert", "flexible"],
        description: "You masterfully blend sociability with reflection, creating authentic connections while maintaining your inner peace."
      },
      {
        tag: "Adventurous Spirit",
        traits: ["spontaneous", "explorer", "curious"],
        description: "You're always ready for new experiences! Your adventurous approach to dating keeps things exciting and never predictable."
      },
      {
        tag: "Compassionate Heart",
        traits: ["empathetic", "warm", "supportive"],
        description: "Your genuine care for others creates deep emotional bonds. Partners feel truly seen and valued in your presence."
      },
      {
        tag: "Expressive Romantic",
        traits: ["verbal", "expressive", "romantic"],
        description: "You wear your heart on your sleeve and aren't afraid to express your feelings. Your authenticity in love is refreshing."
      },
      {
        tag: "Steady Companion",
        traits: ["reliable", "consistent", "patient"],
        description: "You provide a stable, comforting presence in relationships. Your dependability creates trust and security."
      },
      {
        tag: "Playful Charmer",
        traits: ["humorous", "playful", "lighthearted"],
        description: "Your wit and humor make every interaction delightful. You know how to keep things fun while creating genuine connections."
      },
      {
        tag: "Ambitious Visionary",
        traits: ["driven", "focused", "future-oriented"],
        description: "You approach relationships with purpose and direction. Partners appreciate your clarity and determination."
      },
      {
        tag: "Intuitive Connector",
        traits: ["perceptive", "understanding", "intuitive"],
        description: "You have a natural ability to understand others on a deeper level, often knowing what they need before they do."
      },
      {
        tag: "Harmonious Diplomat",
        traits: ["harmonious", "diplomatic", "balanced"],
        description: "You excel at creating peace and finding compromises that satisfy everyone. Your relationships feel balanced and fair."
      },
      {
        tag: "Loyal Confidant",
        traits: ["trustworthy", "private", "devoted"],
        description: "Once you commit, you're all in. Your loyalty and discretion make you an exceptional partner who can be counted on."
      },
      {
        tag: "Passionate Enthusiast",
        traits: ["passionate", "energetic", "expressive"],
        description: "You bring intensity and excitement to relationships. Your enthusiasm is contagious and makes partners feel alive."
      },
      {
        tag: "Thoughtful Planner",
        traits: ["organized", "thoughtful", "attentive"],
        description: "You put care into the details of your relationships. Your thoughtful planning shows partners they matter to you."
      },
      {
        tag: "Authentic Original",
        traits: ["unique", "nonconformist", "creative"],
        description: "You're uniquely you - not fitting into any standard mold. Your authenticity is refreshing in the dating world!"
      }
    ];
    
    // Find best matching personality profile based on trait overlap
    let bestMatch = null;
    let highestMatchScore = 0;
    
    personalityProfiles.forEach(profile => {
      // Calculate how many of the profile's traits match the user's top traits
      const matchingTraits = profile.traits.filter(trait => topTraits.includes(trait));
      const matchScore = matchingTraits.length / profile.traits.length;
      
      if (matchScore > highestMatchScore) {
        highestMatchScore = matchScore;
        bestMatch = profile;
      }
    });
    
    // If no good match, use a default profile based on the single strongest trait
    if (highestMatchScore < 0.3) {
      const topTrait = topTraits[0];
      
      // Map single traits to profiles
      const traitToProfile = {
        "outgoing": personalityProfiles.find(p => p.tag === "Social Butterfly"),
        "reflective": personalityProfiles.find(p => p.tag === "Thoughtful Observer"),
        "adaptable": personalityProfiles.find(p => p.tag === "Balanced Connector"),
        "spontaneous": personalityProfiles.find(p => p.tag === "Adventurous Spirit"),
        "empathetic": personalityProfiles.find(p => p.tag === "Compassionate Heart"),
        "expressive": personalityProfiles.find(p => p.tag === "Expressive Romantic"),
        "reliable": personalityProfiles.find(p => p.tag === "Steady Companion"),
        "playful": personalityProfiles.find(p => p.tag === "Playful Charmer"),
        "driven": personalityProfiles.find(p => p.tag === "Ambitious Visionary"),
        "perceptive": personalityProfiles.find(p => p.tag === "Intuitive Connector"),
        // Default
        "default": personalityProfiles.find(p => p.tag === "Authentic Original")
      };
      
      bestMatch = traitToProfile[topTrait] || traitToProfile["default"];
    }
    
    // Set the final result
    setPersonalityResult({
      tag: bestMatch.tag,
      description: bestMatch.description,
      confidence: Math.round(confidenceLevel * 100) // For display purposes
    });
    
    setIsAnalyzing(false);
  };

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setUserResponses([]);
    setSelectedOption(null);
    setIsAnalyzing(false);
    setPersonalityResult(null);
    setQuestionsQueue([]);
    setTraitScores({});
    setConfidenceLevel(0);
    setMinQuestionsAsked(false);
    setIsTyping(true);
    setDisplayedText('');
    setTypingIndex(0);
    
    // Re-initialize questions
    // This will happen when isTyping becomes false
  };

  const handleContinue = () => {
    // Navigate to the next part of the app
    navigate('/match');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffdad7] py-10 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-700"></div>
        
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Find Your <span className="text-red-500 font-extrabold">{text}</span>
          <span className="text-green-800">
            <Cursor cursorStyle="❤️" />
          </span>
        </h2>
        
        {isTyping ? (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-700">{displayedText}<span className="animate-pulse">|</span></p>
          </div>
        ) : personalityResult ? (
          <div className="text-center">
            <div className="mb-4 p-5 bg-[#ffdad7] rounded-lg">
              <h3 className="text-xl font-bold text-black mb-2">Your Dating Personality:</h3>
              <div className="inline-block bg-orange-700 text-white px-4 py-2 rounded-full font-bold text-lg mb-3">
                {personalityResult.tag}
              </div>
              <p className="text-gray-700">{personalityResult.description}</p>
              
              {/* New confidence indicator */}
              <div className="mt-4 bg-white bg-opacity-50 p-2 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Analysis Confidence</span>
                  <span className="text-xs font-medium text-gray-700">{personalityResult.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${personalityResult.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Based on {userResponses.length} questions</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 mt-6">
              <button 
                onClick={handleStartOver}
                className="bg-white border border-orange-700 text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition duration-200"
              >
                Try Again
              </button>
              <button 
                onClick={handleContinue}
                className="bg-orange-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-200"
              >
                Continue to Matches
              </button>
            </div>
          </div>
        ) : isAnalyzing ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700 mb-4"></div>
            <p className="text-gray-700 font-medium">Analyzing your personality...</p>
            <p className="text-gray-500 text-sm mt-2">This might take a moment</p>
          </div>
        ) : (
          <>
            {questionsQueue.length > 0 && (
              <>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 font-semibold">{questionsQueue[0].question}</p>
                </div>
                
                <div className="mb-4 space-y-2">
                  {questionsQueue[0].options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-2 cursor-pointer transition duration-200 ${
                        selectedOption === option.value 
                          ? 'border-orange-700 bg-orange-50' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => handleSelectOption(option.value)}
                    >
                      <p className="text-gray-700">{option.text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="mr-1">Question {userResponses.length + 1}</span>
                    {minQuestionsAsked && 
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                        min. reached
                      </span>
                    }
                  </div>
                  <button
                    className="bg-orange-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-200 disabled:opacity-50"
                    onClick={handleSubmitResponse}
                    disabled={selectedOption === null}
                  >
                    Next Question
                  </button>
                </div>
              </>
            )}
            
            {userResponses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Your previous answers:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto flex-hidescroll">
                  {userResponses.map((response, index) => (
                    <div key={index} className="bg-[#ffdad7] p-2 rounded text-sm">
                      <span className="font-medium">{index + 1}. {response.question}</span>
                      <p className="text-gray-700 mt-1">{response.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Dynamic Question Progress Indicator */}
      {!personalityResult && !isAnalyzing && userResponses.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-full shadow-lg">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-bold">
              {userResponses.length}
            </div>
            <div className="ml-2 text-xs text-gray-700">
              {confidenceLevel < 0.5 ? "Still getting to know you..." : 
               confidenceLevel < 0.8 ? "Almost there!" : 
               "High confidence!"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityCheck;