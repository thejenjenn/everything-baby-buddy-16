import { MessageCircle } from "lucide-react";
import { useState } from "react";

const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/2349036791181", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-8 h-8 text-white drop-shadow-sm" />
        
        {/* Subtle glow effect instead of aggressive ripple */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* Hover Tooltip */}
        <div
          className={`absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-200 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          Chat with us!
          <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-[6px] border-l-gray-900 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
        </div>
      </button>
      
      {/* Floating notification badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">1</span>
      </div>
    </div>
  );
};

export default FloatingWhatsAppButton;