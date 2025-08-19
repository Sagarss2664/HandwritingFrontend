import React, { useRef, useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, BarChart3 } from 'lucide-react';

const ModernResults = ({ scriptScores, questionnaireScores, combinedScores, mImages }) => {
  const barChartRef = useRef(null);
  const radarChartRef = useRef(null);
  const reportRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!scriptScores) return null;

  const chartColors = {
    script: {
      background: 'rgba(99, 102, 241, 0.8)',
      border: 'rgb(99, 102, 241)'
    },
    combined: {
      background: 'rgba(16, 185, 129, 0.8)',
      border: 'rgb(16, 185, 129)'
    }
  };

  // Data and options omitted here for brevity — keep from your existing code

  const handleDownloadReport = async () => {
    if (!barChartRef.current || !radarChartRef.current || !reportRef.current) {
      alert('Charts are not fully loaded yet.');
      return;
    }
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Cover Page
      pdf.setFontSize(28);
      pdf.setTextColor(40);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Handwriting Analysis Report', pageWidth / 2, 120, { align: 'center' });

      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'normal');
      pdf.text('AI-powered personality insights', pageWidth / 2, 160, { align: 'center' });

      pdf.setFontSize(14);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 200, { align: 'center' });

      // Utility to add section from a DOM element
      const addSectionToPDF = async (element, title) => {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#fff',
          logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth - 80;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addPage();
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, pageWidth / 2, 40, { align: 'center' });

        pdf.addImage(imgData, 'PNG', 40, 60, pdfWidth, pdfHeight);
      };

      // Add charts and report
      await addSectionToPDF(barChartRef.current, 'Script Analysis Overview');
      await addSectionToPDF(radarChartRef.current, 'Comprehensive Analysis');
      await addSectionToPDF(reportRef.current, 'Detailed Analysis');

      pdf.save('handwriting-analysis-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="results-section" ref={reportRef}>
      <div className="results-header">
        <BarChart3 className="results-icon" />
        <h2>Analysis Results</h2>
        {combinedScores && (
          <button
            onClick={handleDownloadReport}
            className="download-report-button"
            disabled={isGeneratingPDF || !barChartRef.current || !radarChartRef.current}
          >
            {isGeneratingPDF ? (
              <>
                <div className="spinner"></div>
                Generating...
              </>
            ) : (
              <>
                <FileText className="button-icon" />
                Download Report
              </>
            )}
          </button>
        )}
      </div>

      <div className="results-grid">
        <div className="chart-card" ref={barChartRef}>
          <h3>Script Analysis Overview</h3>
          <div className="chart-container">
            <Bar
              data={{
                labels: Object.keys(scriptScores),
                datasets: [
                  {
                    label: 'Script Analysis',
                    data: Object.values(scriptScores),
                    backgroundColor: chartColors.script.background,
                    borderColor: chartColors.script.border,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, max: 100 },
                  x: { grid: { display: false } }
                }
              }}
              redraw
            />
          </div>
          <div className="scores-grid">
            {Object.entries(scriptScores).map(([pattern, score]) => (
              <div key={pattern} className="score-card">
                <span className="score-pattern">{pattern}</span>
                <span className="score-value">{score.toFixed(1)}%</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {combinedScores && (
          <div className="chart-card" ref={radarChartRef}>
            <h3>Comprehensive Analysis</h3>
            <div className="chart-container">
              <Radar
                data={{
                  labels: Object.keys(combinedScores),
                  datasets: [
                    {
                      label: 'Script Analysis',
                      data: Object.keys(combinedScores).map(key => scriptScores[key] || 0),
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      borderColor: 'rgb(99, 102, 241)',
                      pointBackgroundColor: 'rgb(99, 102, 241)'
                    },
                    {
                      label: 'Combined Analysis',
                      data: Object.values(combinedScores),
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      borderColor: 'rgb(16, 185, 129)',
                      pointBackgroundColor: 'rgb(16, 185, 129)'
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } }
                  }
                }}
                redraw
              />
            </div>
            <div className="scores-grid">
              {Object.entries(combinedScores).map(([pattern, score]) => (
                <div key={pattern} className="score-card combined">
                  <span className="score-pattern">{pattern}</span>
                  <span className="score-value">{score.toFixed(1)}%</span>
                  <div className="score-bar">
                    <div className="score-fill combined" style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {questionnaireScores && (
          <div className="questionnaire-results">
            <h3>Questionnaire Scores</h3>
            <div className="scores-grid">
              {Object.entries(questionnaireScores).map(([pattern, score]) => (
                <div key={pattern} className="score-card questionnaire">
                  <span className="score-pattern">{pattern}</span>
                  <span className="score-value">{score}%</span>
                  <div className="score-bar">
                    <div className="score-fill questionnaire" style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernResults;
