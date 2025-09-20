import { removeBackground, loadImage } from './backgroundRemoval';
import logoImage from '@/assets/everything-baby-logo.jpeg';

let transparentLogoCache: string | null = null;

export const getTransparentLogo = async (): Promise<string> => {
  if (transparentLogoCache) {
    return transparentLogoCache;
  }

  try {
    // Convert the imported logo to a blob first
    const response = await fetch(logoImage);
    const blob = await response.blob();
    
    // Load the image
    const imageElement = await loadImage(blob);
    
    // Remove background
    const transparentBlob = await removeBackground(imageElement);
    
    // Create data URL for the processed image
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const dataUrl = reader.result as string;
        transparentLogoCache = dataUrl;
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(transparentBlob);
    });
    
  } catch (error) {
    console.error('Error processing logo:', error);
    // Fallback to original logo
    return logoImage;
  }
};