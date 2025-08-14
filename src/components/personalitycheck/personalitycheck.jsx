import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import '../../index.css';

// Import data and utility functions
import { questionBank } from './data/questionBank';
import { getInitialQuestions, selectNextBestQuestion } from './data/questionUtils';
import { calculateConfidenceLevel, analyzePersonalityTraits } from './data/personalityUtils';

// Import UI components
import { 
  RenderIntro, 
  RenderPersonalityResult, 
  RenderAnalyzing, 
  RenderQuestions, 
  RenderProgressIndicator 
} from './components/UIComponents';

const PersonalityCheck = () => {
  const navigate = useNavigate();
  
  // State Management
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
  const [traitScores, setTraitScores] = useState({});
  
  // Typewriter animation for personality types
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
  // Welcome message
  const welcomeMessage = "Hey! 👋 Before I send you out into the dating jungle, I wanna know you a little better. Ready? 😉 First question coming up...";
  
  // =========================================================================
  // INITIALIZATION & SETUP
  // =========================================================================
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
    const initialQuestions = getInitialQuestions();
    
    // Start with the most insightful question, then queue the rest
    if (initialQuestions.length > 0) {
      setQuestionsQueue(initialQuestions);
    }
  };

  // =========================================================================
  // EVENT HANDLERS
  // =========================================================================
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
    const newConfidenceLevel = calculateConfidenceLevel(updatedTraits, newResponses.length);
    setConfidenceLevel(newConfidenceLevel);
    
    // Check if we've asked minimum number of questions
    if (newResponses.length >= 5) {
      setMinQuestionsAsked(true);
    }
    
    // Reset selection for next question
    setSelectedOption(null);
    
    // Determine if we should continue or finish
    if (newResponses.length < 5 || (newConfidenceLevel < 0.8 && newResponses.length < 8)) {
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

  const handleStartOver = () => {
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
  
  // =========================================================================
  // ANALYSIS FUNCTIONS
  // =========================================================================
  // Start the analysis phase
  const startAnalysis = (responses, traits) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzePersonalityTraits(traits, confidenceLevel);
      setPersonalityResult(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  // =========================================================================
  // MAIN RENDER
  // =========================================================================
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8A199] py-10 px-4">
      <div className="bg-[#ffdad7] rounded-xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-700"></div>
        
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Find Your <span className="text-red-500 font-extrabold">{text}</span>
          <span className="text-green-800">
            <Cursor cursorStyle="❤️" />
          </span>
        </h2>
        
        {isTyping ? (
          <RenderIntro displayedText={displayedText} />
        ) : personalityResult ? (
          <RenderPersonalityResult 
            personalityResult={personalityResult} 
            userResponsesLength={userResponses.length} 
            handleStartOver={handleStartOver} 
          />
        ) : isAnalyzing ? (
          <RenderAnalyzing />
        ) : (
          <RenderQuestions 
            questionsQueue={questionsQueue}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            handleNextQuestion={handleNextQuestion}
            userResponses={userResponses}
            minQuestionsAsked={minQuestionsAsked}
          />
        )}
      </div>
      
      <RenderProgressIndicator 
        userResponsesLength={userResponses.length}
        confidenceLevel={confidenceLevel}
        personalityResult={personalityResult}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default PersonalityCheck;