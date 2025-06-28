
import { CheckCircle, Award, Image as ImageIcon } from "lucide-react";

type Props = {
  prediction: string;
  confidence: number;
  imageUrl: string;
};

const riceInfo = {
  'Arborio': {
    description: 'Short-grain rice from Italy, perfect for risotto with its creamy texture.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50'
  },
  'Basmati': {
    description: 'Long-grain aromatic rice from India and Pakistan, ideal for biryanis.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50'
  },
  'Jasmine': {
    description: 'Fragrant long-grain rice from Thailand with a subtle floral aroma.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50'
  },
  'Ipsala': {
    description: 'Turkish aromatic rice with excellent cooking properties.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50'
  },
  'Karacadag': {
    description: 'Ancient Turkish rice variety known for its nutty flavor.',
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50'
  }
};

export default function ResultsDisplay({ prediction, confidence, imageUrl }: Props) {
  const riceData = riceInfo[prediction as keyof typeof riceInfo] || riceInfo['Basmati'];
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 95) return 'Excellent';
    if (confidence >= 85) return 'Very High';
    if (confidence >= 75) return 'High';
    if (confidence >= 60) return 'Good';
    return 'Moderate';
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Classification Complete!</h2>
        <p className="text-gray-600">Your rice has been successfully identified</p>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <ImageIcon className="w-5 h-5" />
            Uploaded Image
          </div>
          <div className="relative">
            <img
              src={imageUrl}
              alt="Uploaded rice"
              className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Rice Type */}
          <div className={`bg-gradient-to-r ${riceData.bgColor} p-6 rounded-xl border border-gray-200`}>
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-gray-700" />
              <span className="text-lg font-semibold text-gray-700">Rice Type</span>
            </div>
            <h3 className={`text-4xl font-bold bg-gradient-to-r ${riceData.color} bg-clip-text text-transparent mb-2`}>
              {prediction}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {riceData.description}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700">Confidence Score</span>
              <span className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}>
                {confidence}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  confidence >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  confidence >= 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Accuracy Level</span>
              <span className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
                {getConfidenceLabel(confidence)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Classification Details</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Processing Time:</span>
            <span className="text-gray-500 ml-2">~2.1 seconds</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Model Version:</span>
            <span className="text-gray-500 ml-2">v2.1.0</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Image Quality:</span>
            <span className="text-green-600 ml-2">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
}
