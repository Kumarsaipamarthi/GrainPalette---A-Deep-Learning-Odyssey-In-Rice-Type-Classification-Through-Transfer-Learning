
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ResultsDisplay from "../components/ResultsDisplay";
import { Upload, Cpu, Camera } from "lucide-react";

const Index = () => {
  const [prediction, setPrediction] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const handlePredictionComplete = (result: { prediction: string; confidence: number; imageUrl: string }) => {
    setPrediction(result.prediction);
    setConfidence(result.confidence);
    setUploadedImage(result.imageUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Rice Type Classifier
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2 text-lg">
            Upload an image of rice to identify its variety using AI
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Upload className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Upload</h3>
              <p className="text-gray-600">Drag and drop or click to upload your rice images</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Cpu className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Classification</h3>
              <p className="text-gray-600">Advanced machine learning identifies rice varieties</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Camera className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Results</h3>
              <p className="text-gray-600">Get immediate classification with confidence scores</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200/50 mb-8">
            <ImageUpload onUploadComplete={handlePredictionComplete} />
          </div>

          {/* Results Section */}
          {prediction && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200/50">
              <ResultsDisplay 
                prediction={prediction} 
                confidence={confidence}
                imageUrl={uploadedImage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-amber-200/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>Powered by AI • Classify 5+ rice varieties with high accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
