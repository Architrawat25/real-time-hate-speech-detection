import React, { useState } from 'react';
import { Github, ExternalLink, MessageSquare, AlertTriangle, CheckCircle, Loader2, Sparkles } from 'lucide-react';

interface PredictionResult {
  label: string;
  confidence: number;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://architrawat25-real-time-hate-speech-detection.hf.space/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the text.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  const getResultColor = (label: string) => {
    return label === 'HATE' 
      ? 'from-red-500 via-red-600 to-red-700' 
      : 'from-emerald-500 via-emerald-600 to-emerald-700';
  };

  const getResultIcon = (label: string) => {
    return label === 'HATE' 
      ? <AlertTriangle className="w-6 h-6" />
      : <CheckCircle className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-violet-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-300/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-white/20">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-violet-600" />
              <h1 className="text-5xl font-bold gradient-text tracking-tight">
                Welcome
              </h1>
            </div>
            <p className="text-slate-700 text-xl mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
              This hate speech detection model is developed by Archit Rawat.
            </p>
            
            {/* Profile Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/Architrawat25"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 font-semibold"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>GitHub</span>
              </a>
              <a
                href="https://huggingface.co/architrawat25"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white rounded-2xl hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 font-semibold"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Hugging Face</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="glass-effect rounded-3xl shadow-2xl p-10 mb-10 floating">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-6 tracking-tight">
              Hate Speech Detection
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Enter any text below to analyze it for hate speech. My AI model will classify the content 
              and provide a confidence score for the prediction.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="text-input" className="block text-base font-semibold text-slate-700 mb-4">
                Text to Analyze
              </label>
              <div className="relative group">
                <textarea
                  id="text-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full px-6 py-5 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 ease-out resize-none min-h-40 text-slate-700 text-base shadow-lg hover:shadow-xl hover:border-violet-300 group-hover:border-violet-300 bg-white/80 backdrop-blur-sm"
                  disabled={isLoading}
                />
                <MessageSquare className="absolute top-5 right-5 w-6 h-6 text-slate-400 group-hover:text-violet-500 transition-colors duration-300" />
              </div>
            </div>

            {error && (
              <div className="p-5 bg-red-50/80 backdrop-blur-sm border-2 border-red-100 rounded-2xl animate-fade-in">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            <div className="flex gap-5">
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="flex-1 bg-gradient-to-r from-violet-600 via-violet-700 to-purple-700 text-white px-8 py-5 rounded-2xl font-bold hover:from-violet-700 hover:via-violet-800 hover:to-purple-800 focus:ring-4 focus:ring-violet-500/30 focus:ring-offset-2 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin inline mr-3" />
                    Analyzing...
                  </>
                ) : (
                  'Check Text'
                )}
              </button>
              
              {(result || error) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-5 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-violet-300 focus:ring-4 focus:ring-slate-500/20 focus:ring-offset-2 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="glass-effect rounded-3xl shadow-2xl p-10 animate-fade-in floating">
            <h3 className="text-3xl font-bold text-slate-800 mb-10 text-center tracking-tight">
              Analysis Results
            </h3>
            
            <div className="space-y-8">
              <div className="text-center">
                <div className={`inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r ${getResultColor(result.label)} text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
                  {getResultIcon(result.label)}
                  <span className="text-xl font-bold">
                    {result.label === 'HATE' ? 'Hate Speech Detected' : 'No Hate Speech Detected'}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-violet-50/50 rounded-2xl p-8 border border-slate-200/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-slate-700">Confidence Score</span>
                  <span className="text-lg font-bold text-slate-900">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-4 rounded-full bg-gradient-to-r ${getResultColor(result.label)} transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-violet-50/50 rounded-2xl p-8 border border-slate-200/50">
                <h4 className="font-bold text-slate-900 mb-4 text-lg">Analyzed Text:</h4>
                <p className="text-slate-600 italic leading-relaxed text-base">"{inputText}"</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;