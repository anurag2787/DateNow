// Utility functions for question selection
import { questionBank } from './questionBank';

/**
 * Initialize questions intelligently based on key categories
 * @returns {Array} - Array of initial questions
 */
export const getInitialQuestions = () => {
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
  
  return allQuestions;
};

/**
 * Find the best next question based on current traits and previous responses
 * @param {Object} currentTraits - Object containing current trait scores
 * @param {Array} responses - Array of previous responses
 * @returns {Object} - Next best question object or null if none found
 */
export const selectNextBestQuestion = (currentTraits, responses) => {
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