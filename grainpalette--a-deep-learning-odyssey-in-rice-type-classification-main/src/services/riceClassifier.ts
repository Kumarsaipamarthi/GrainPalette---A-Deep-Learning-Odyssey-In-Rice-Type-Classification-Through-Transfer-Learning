
// Mock rice classification service
const riceTypes = [
  { name: 'Arborio', probability: 0.18 },
  { name: 'Basmati', probability: 0.22 },
  { name: 'Jasmine', probability: 0.20 },
  { name: 'Ipsala', probability: 0.20 },
  { name: 'Karacadag', probability: 0.20 }
];

export const classifyRice = async (imageFile: File): Promise<{ prediction: string; confidence: number }> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock classification logic - in real app, this would send to your backend
  const randomIndex = Math.floor(Math.random() * riceTypes.length);
  const selectedRice = riceTypes[randomIndex];
  
  // Generate realistic confidence score
  const baseConfidence = Math.floor(Math.random() * 25) + 75; // 75-99%
  const confidence = Math.min(99, baseConfidence + (Math.random() > 0.5 ? 5 : -5));
  
  console.log(`Classified image as: ${selectedRice.name} with ${confidence}% confidence`);
  
  return {
    prediction: selectedRice.name,
    confidence: Math.round(confidence)
  };
};

// Additional utility functions for the classifier
export const getSupportedRiceTypes = () => {
  return riceTypes.map(rice => rice.name);
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};
