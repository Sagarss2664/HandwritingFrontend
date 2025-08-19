// import React, { useState } from 'react';

// const Questionnaire = ({ onSubmit }) => {
//   const [scores, setScores] = useState({
//     Cumulative: 0,
//     Investigative: 0,
//     Comprehensive: 0,
//     Analytical: 0
//   });

//   const handleScoreChange = (pattern, value) => {
//     const numValue = parseFloat(value) || 0;
//     setScores(prev => ({
//       ...prev,
//       [pattern]: numValue
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(scores);
//   };

//   return (
//     <div className="questionnaire-container">
//       <h2>Questionnaire Scores</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="score-input">
//           <label>Cumulative Score:</label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={scores.Cumulative}
//             onChange={(e) => handleScoreChange('Cumulative', e.target.value)}
//           />
//         </div>
//         <div className="score-input">
//           <label>Investigative Score:</label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={scores.Investigative}
//             onChange={(e) => handleScoreChange('Investigative', e.target.value)}
//           />
//         </div>
//         <div className="score-input">
//           <label>Comprehensive Score:</label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={scores.Comprehensive}
//             onChange={(e) => handleScoreChange('Comprehensive', e.target.value)}
//           />
//         </div>
//         <div className="score-input">
//           <label>Analytical Score:</label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={scores.Analytical}
//             onChange={(e) => handleScoreChange('Analytical', e.target.value)}
//           />
//         </div>
//         <button type="submit">Submit Scores</button>
//       </form>
//     </div>
//   );
// };

// export default Questionnaire;
import React, { useState } from 'react';

const Questionnaire = ({ onSubmit }) => {
  const [scores, setScores] = useState({
    Cumulative: 0,
    Investigative: 0,
    Comprehensive: 0,
    Analytical: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const scoreCategories = [
    {
      key: 'Cumulative',
      label: 'Cumulative Score',
      description: 'Overall cumulative assessment',
      icon: '📊',
      color: '#6366f1'
    },
    {
      key: 'Investigative',
      label: 'Investigative Score',
      description: 'Detail-oriented investigation ability',
      icon: '🔍',
      color: '#f59e0b'
    },
    {
      key: 'Comprehensive',
      label: 'Comprehensive Score',
      description: 'Holistic understanding capability',
      icon: '🧠',
      color: '#10b981'
    },
    {
      key: 'Analytical',
      label: 'Analytical Score',
      description: 'Logical analysis and reasoning',
      icon: '⚡',
      color: '#ef4444'
    }
  ];

  const validateScore = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      return 'Score must be between 0 and 100';
    }
    return null;
  };

  const handleScoreChange = (pattern, value) => {
    const numValue = parseFloat(value) || 0;
    
    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [pattern]: null
    }));

    setScores(prev => ({
      ...prev,
      [pattern]: numValue
    }));
  };

  const handleBlur = (pattern, value) => {
    const error = validateScore(value);
    setErrors(prev => ({
      ...prev,
      [pattern]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all scores
    const newErrors = {};
    Object.entries(scores).forEach(([key, value]) => {
      const error = validateScore(value);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(scores);
      setIsSubmitting(false);
    }, 1000);
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', color: '#10b981' };
    if (score >= 60) return { level: 'Good', color: '#f59e0b' };
    if (score >= 40) return { level: 'Average', color: '#6b7280' };
    return { level: 'Needs Improvement', color: '#ef4444' };
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / Object.keys(scores).length;

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-header">
        <h2 className="questionnaire-title">
          <span className="title-icon">📝</span>
          Assessment Questionnaire
        </h2>
        <p className="questionnaire-subtitle">
          Enter your psychological assessment scores for each category
        </p>
      </div>

      <form onSubmit={handleSubmit} className="questionnaire-form">
        <div className="score-inputs-grid">
          {scoreCategories.map((category) => (
            <div key={category.key} className="score-input-card">
              <div className="card-header">
                <div className="category-info">
                  <span className="category-icon">{category.icon}</span>
                  <div>
                    <h3 className="category-label">{category.label}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <div className="input-wrapper">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={scores[category.key]}
                    onChange={(e) => handleScoreChange(category.key, e.target.value)}
                    onBlur={(e) => handleBlur(category.key, e.target.value)}
                    className={`score-input ${errors[category.key] ? 'error' : ''}`}
                    placeholder="0-100"
                  />
                  <span className="input-suffix">%</span>
                </div>
                
                {scores[category.key] > 0 && (
                  <div className="score-indicator">
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ 
                          width: `${scores[category.key]}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                    <span 
                      className="score-level"
                      style={{ color: getScoreLevel(scores[category.key]).color }}
                    >
                      {getScoreLevel(scores[category.key]).level}
                    </span>
                  </div>
                )}
                
                {errors[category.key] && (
                  <div className="error-text">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors[category.key]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalScore > 0 && (
          <div className="score-summary">
            <div className="summary-card">
              <h4>Assessment Summary</h4>
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Score:</span>
                  <span className="stat-value">{totalScore.toFixed(1)}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average Score:</span>
                  <span className="stat-value">{averageScore.toFixed(1)}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Overall Level:</span>
                  <span 
                    className="stat-value"
                    style={{ color: getScoreLevel(averageScore).color }}
                  >
                    {getScoreLevel(averageScore).level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="btn-spinner"></div>
              Processing Scores...
            </>
          ) : (
            <>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit Assessment
            </>
          )}
        </button>
      </form>

      <div className="questionnaire-tips">
        <h4>Scoring Guidelines:</h4>
        <ul>
          <li><strong>80-100%:</strong> Excellent performance in this area</li>
          <li><strong>60-79%:</strong> Good performance with room for growth</li>
          <li><strong>40-59%:</strong> Average performance, consider development</li>
          <li><strong>0-39%:</strong> Area needs significant improvement</li>
        </ul>
      </div>
    </div>
  );
};

export default Questionnaire;