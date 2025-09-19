import { MessageCircle } from "lucide-react";
import { useState } from "react";

const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Try direct navigation first
    const whatsappUrl = "https://wa.me/2349036791181";
    
    // For mobile devices, try the whatsapp:// protocol first
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = `whatsapp://send?phone=2349036791181`;
      // Fallback to web version after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 1000);
    } else {
      // For desktop, use web version
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer touch-manipulation"
        aria-label="Chat with us on WhatsApp"
        type="button"
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-8 h-8 text-white drop-shadow-sm relative z-10" />
        
        {/* Subtle glow effect - made non-interactive */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* Hover Tooltip - made non-interactive */}
        <div
          className={`pointer-events-none absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-200 ${
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