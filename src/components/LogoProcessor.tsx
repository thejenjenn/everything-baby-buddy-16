import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import logoImage from '@/assets/everything-baby-logo.jpeg';

const LogoProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  const processLogo = async () => {
    setIsProcessing(true);
    try {
      // Convert the imported logo to a blob first
      const response = await fetch(logoImage);
      const blob = await response.blob();
      
      // Load the image
      const imageElement = await loadImage(blob);
      
      // Remove background
      const transparentBlob = await removeBackground(imageElement);
      
      // Create URL for the processed image
      const url = URL.createObjectURL(transparentBlob);
      setProcessedLogo(url);
      
      // Download the processed image
      const a = document.createElement('a');
      a.href = url;
      a.download = 'everything-baby-logo-transparent.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Error processing logo:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Logo Background Removal</h3>
      
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Original Logo:</p>
          <img src={logoImage} alt="Original Logo" className="h-16 w-16 object-contain border" />
        </div>
        
        {processedLogo && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Processed Logo (Transparent):</p>
            <img src={processedLogo} alt="Processed Logo" className="h-16 w-16 object-contain border" />
          </div>
        )}
        
        <Button 
          onClick={processLogo} 
          disabled={isProcessing}
          className="w-fit"
        >
          {isProcessing ? 'Processing...' : 'Remove Background & Download'}
        </Button>
      </div>
    </div>
  );
};

export default LogoProcessor;