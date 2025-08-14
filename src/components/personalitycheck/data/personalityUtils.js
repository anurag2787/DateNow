// Helper functions for personality analysis
import { personalityProfiles } from './personalityProfiles';

/**
 * Calculate confidence level based on trait scores and questions asked
 * @param {Object} traits - Object containing trait scores
 * @param {Number} questionCount - Number of questions asked so far
 * @returns {Number} - Confidence level between 0 and 1
 */
export const calculateConfidenceLevel = (traits, questionCount) => {
  const traitEntries = Object.entries(traits);
  if (traitEntries.length === 0) return 0;
  
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
    
    return Math.min(
      questionCountFactor * 0.6 + traitDistinctness * 0.4,
      1.0
    );
  }
  
  return Math.min(questionCount / 15, 0.5); // Lower confidence if we don't have clear traits
};

/**
 * Analyze personality based on trait scores
 * @param {Object} finalTraits - Object containing final trait scores
 * @param {Number} confidenceLevel - Confidence level in the analysis
 * @returns {Object} - Personality result with tag, description and confidence
 */
export const analyzePersonalityTraits = (finalTraits, confidenceLevel) => {
  // Get top 3 traits based on scores
  const topTraits = Object.entries(finalTraits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait]) => trait);
  
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
  
  // Return the final result
  return {
    tag: bestMatch.tag,
    description: bestMatch.description,
    confidence: Math.round(confidenceLevel * 100) // For display purposes
  };
};