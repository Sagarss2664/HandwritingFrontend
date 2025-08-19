// import React from 'react';

// const WeightSlider = ({ weight, onChange }) => {
//   return (
//     <div className="weight-slider-container">
//       <h2>Adjust Weightage</h2>
//       <div className="slider-description">
//         <span>Script: {weight}%</span>
//         <span>Questionnaire: {100 - weight}%</span>
//       </div>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={weight}
//         onChange={(e) => onChange(parseInt(e.target.value))}
//         className="slider"
//       />
//       <div className="slider-labels">
//         <span>0%</span>
//         <span>25%</span>
//         <span>50%</span>
//         <span>75%</span>
//         <span>100%</span>
//       </div>
//     </div>
//   );
// };

// export default WeightSlider;
import React, { useState, useEffect } from 'react';

const WeightSlider = ({ weight, onChange }) => {
  const [localWeight, setLocalWeight] = useState(weight);
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    setLocalWeight(weight);
  }, [weight]);

  const handleSliderChange = (e) => {
    const newWeight = parseInt(e.target.value);
    setLocalWeight(newWeight);
    setIsAdjusting(true);
  };

  const handleMouseUp = () => {
    if (isAdjusting) {
      onChange(localWeight);
      setIsAdjusting(false);
    }
  };

  const handlePresetClick = (presetWeight) => {
    setLocalWeight(presetWeight);
    onChange(presetWeight);
  };

  const getRecommendation = (scriptWeight) => {
    if (scriptWeight >= 70) {
      return {
        text: "Script-focused analysis - Great for detailed handwriting insights",
        icon: "✍️",
        color: "#6366f1"
      };
    } else if (scriptWeight >= 30) {
      return {
        text: "Balanced approach - Combines both analysis methods effectively",
        icon: "⚖️",
        color: "#10b981"
      };
    } else {
      return {
        text: "Questionnaire-focused - Emphasizes psychological assessment",
        icon: "📋",
        color: "#f59e0b"
      };
    }
  };

  const presets = [
    { label: "Script Only", value: 100, color: "#6366f1" },
    { label: "Script Heavy", value: 75, color: "#8b5cf6" },
    { label: "Balanced", value: 50, color: "#10b981" },
    { label: "Survey Heavy", value: 25, color: "#f59e0b" },
    { label: "Survey Only", value: 0, color: "#ef4444" }
  ];

  const recommendation = getRecommendation(localWeight);

  return (
    <div className="weight-slider-container">
      <div className="weight-header">
        <h2 className="weight-title">
          <span className="title-icon">⚖️</span>
          Analysis Weight Configuration
        </h2>
        <p className="weight-subtitle">
          Adjust the balance between handwriting analysis and questionnaire assessment
        </p>
      </div>

      <div className="weight-display-cards">
        <div className="weight-card script-card">
          <div className="card-icon">✍️</div>
          <div className="card-content">
            <h3>Handwriting Analysis</h3>
            <div className="weight-percentage script-weight">{localWeight}%</div>
            <div className="weight-bar">
              <div 
                className="weight-fill script-fill"
                style={{ width: `${localWeight}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="weight-card questionnaire-card">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>Questionnaire Assessment</h3>
            <div className="weight-percentage questionnaire-weight">{100 - localWeight}%</div>
            <div className="weight-bar">
              <div 
                className="weight-fill questionnaire-fill"
                style={{ width: `${100 - localWeight}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-section">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={localWeight}
            onChange={handleSliderChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="weight-slider"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #f59e0b 25%, #10b981 50%, #8b5cf6 75%, #6366f1 100%)`
            }}
          />
          <div className="slider-thumb-indicator" style={{ left: `${localWeight}%` }}>
            <div className="thumb-tooltip">{localWeight}%</div>
          </div>
        </div>

        <div className="slider-labels">
          <span className="label-item">
            <span className="label-color questionnaire-color"></span>
            Questionnaire Focus
          </span>
          <span className="label-item">
            <span className="label-color script-color"></span>
            Handwriting Focus
          </span>
        </div>
      </div>

      <div className="preset-buttons">
        <h4>Quick Presets:</h4>
        <div className="preset-grid">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`preset-btn ${localWeight === preset.value ? 'active' : ''}`}
              style={{ 
                '--preset-color': preset.color,
                borderColor: localWeight === preset.value ? preset.color : '#e5e7eb'
              }}
            >
              <span className="preset-label">{preset.label}</span>
              <span className="preset-value">{preset.value}% / {100 - preset.value}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="recommendation-card">
        <div className="recommendation-header">
          <span className="recommendation-icon">{recommendation.icon}</span>
          <h4>Current Configuration</h4>
        </div>
        <p 
          className="recommendation-text"
          style={{ color: recommendation.color }}
        >
          {recommendation.text}
        </p>
        <div className="configuration-details">
          <div className="detail-item">
            <span className="detail-label">Impact on Results:</span>
            <span className="detail-value">
              {localWeight > 60 ? "Handwriting patterns will dominate" : 
               localWeight < 40 ? "Psychological assessment will dominate" : 
               "Balanced influence from both methods"}
            </span>
          </div>
        </div>
      </div>

      {isAdjusting && (
        <div className="adjustment-indicator">
          <div className="indicator-content">
            <div className="adjustment-spinner"></div>
            <span>Adjusting weights...</span>
          </div>
        </div>
      )}

      <div className="weight-info">
        <h4>Understanding Weight Configuration:</h4>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon script-bg">✍️</div>
            <div className="info-content">
              <h5>Handwriting Analysis</h5>
              <p>Based on actual writing patterns, stroke analysis, and character formation</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon questionnaire-bg">📋</div>
            <div className="info-content">
              <h5>Questionnaire Assessment</h5>
              <p>Based on self-reported psychological and behavioral assessments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSlider;