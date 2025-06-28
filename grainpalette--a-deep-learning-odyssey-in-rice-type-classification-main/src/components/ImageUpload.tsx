
import { useState, useRef } from "react";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { classifyRice } from "../services/riceClassifier";

type Props = {
  onUploadComplete: (result: { prediction: string; confidence: number; imageUrl: string }) => void;
};

export default function ImageUpload({ onUploadComplete }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await classifyRice(image);
      onUploadComplete({
        prediction: result.prediction,
        confidence: result.confidence,
        imageUrl: preview
      });
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-amber-400 bg-amber-50/50' 
              : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={fileInputRef}
          />
          
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-xl shadow-lg"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-full">
                  <Upload className="w-12 h-12 text-amber-600" />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Upload Rice Image
                </p>
                <p className="text-gray-500">
                  Drag and drop your image here, or click to browse
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        {image && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Classifying Rice...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Camera className="w-5 h-5" />
                <span>Classify Rice Type</span>
              </div>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
