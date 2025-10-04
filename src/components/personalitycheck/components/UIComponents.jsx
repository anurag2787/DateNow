// UI Components for Personality Check
import React from 'react';

/**
 * Render the welcome/intro message
 * @param {string} displayedText - The text to display
 * @returns {JSX.Element} - The rendered intro component
 */
export const RenderIntro = ({ displayedText }) => (
  <div className="bg-gray-100 rounded-lg p-4 mb-4">
    <p className="text-gray-700">{displayedText}<span className="animate-pulse">|</span></p>
  </div>
);

/**
 * Render the personality result
 * @param {Object} personalityResult - The personality result object
 * @param {number} userResponsesLength - Number of user responses
 * @param {Function} handleStartOver - Function to handle starting over
 * @returns {JSX.Element} - The rendered result component
 */
export const RenderPersonalityResult = ({ personalityResult, userResponsesLength, handleStartOver }) => (
  <div className="text-center">
    <div className="mb-4 p-5 bg-[#ffdad7] rounded-lg">
      <h3 className="text-xl font-bold text-black mb-2">Your Dating Personality:</h3>
      <div className="inline-block bg-orange-700 text-white px-4 py-2 rounded-full font-bold text-lg mb-3">
        {personalityResult.tag}
      </div>
      <p className="text-gray-700">{personalityResult.description}</p>
      
      {/* Confidence indicator */}
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
        <p className="text-xs text-gray-500 mt-1">Based on {userResponsesLength} questions</p>
      </div>
    </div>
    
    <div className="flex flex-col space-y-3 mt-6">
      <button 
        onClick={handleStartOver}
        className="bg-white border border-orange-700 text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
);

/**
 * Render the analyzing spinner
 * @returns {JSX.Element} - The rendered analyzing component
 */
export const RenderAnalyzing = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700 mb-4"></div>
    <p className="text-gray-700 font-medium">Analyzing your personality...</p>
    <p className="text-gray-500 text-sm mt-2">This might take a moment</p>
  </div>
);

/**
 * Render the questions and options
 * @param {Array} questionsQueue - Array of questions in the queue
 * @param {string} selectedOption - Currently selected option value
 * @param {Function} handleOptionSelect - Function to handle option selection
 * @param {Function} handleNextQuestion - Function to handle going to next question
 * @param {Array} userResponses - Array of user responses
 * @param {boolean} minQuestionsAsked - Whether minimum questions have been asked
 * @returns {JSX.Element} - The rendered questions component
 */
export const RenderQuestions = ({ 
  questionsQueue, 
  selectedOption, 
  handleOptionSelect, 
  handleNextQuestion, 
  userResponses, 
  minQuestionsAsked 
}) => (
  <>
    {questionsQueue.length > 0 && (
      <>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-semibold">{questionsQueue[0].question}</p>
        </div>
        
        <div className="mb-4  space-y-2">
          {questionsQueue[0].options.map((option, index) => (
            <div 
              key={index} 
              className={`p-3  rounded-lg border-rose-400 border-2 cursor-pointer transition duration-200 ${
                selectedOption === option.value 
                  ? 'border-orange-700 bg-orange-50' 
                  : 'border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => handleOptionSelect(option)}
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
            onClick={handleNextQuestion}
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
            <div key={index} className="bg-rose-200 p-2 rounded text-sm">
              <span className="text-rose-700 font-medium">{index + 1}. {response.question}</span>
              
              <p className="text-gray-700 mt-1 ">{response.answer}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

/**
 * Render progress indicator
 * @param {number} userResponsesLength - Number of user responses
 * @param {number} confidenceLevel - Current confidence level
 * @param {boolean} personalityResult - Whether there's a personality result
 * @param {boolean} isAnalyzing - Whether analysis is in progress
 * @returns {JSX.Element|null} - The rendered progress indicator or null
 */
export const RenderProgressIndicator = ({ userResponsesLength, confidenceLevel, personalityResult, isAnalyzing }) => (
  !personalityResult && !isAnalyzing && userResponsesLength > 0 ? (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-full shadow-lg">
      <div className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-bold">
          {userResponsesLength}
        </div>
        <div className="ml-2 text-xs text-gray-700">
          {confidenceLevel < 0.5 ? "Still getting to know you..." : 
           confidenceLevel < 0.8 ? "Almost there!" : 
           "High confidence!"}
        </div>
      </div>
    </div>
  ) : null
);