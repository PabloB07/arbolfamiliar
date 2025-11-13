export default function WaveDivider() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg 
        className="w-full h-auto" 
        viewBox="0 0 1440 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Onda de fondo (más oscura) */}
        <path 
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
          fill="currentColor"
          className="text-emerald-100 dark:text-gray-800 opacity-50"
        />
        
        {/* Onda media */}
        <path 
          d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,144C672,149,768,139,864,128C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
          fill="currentColor"
          className="text-emerald-50 dark:text-gray-850 opacity-70"
        />
        
        {/* Onda principal (frente) */}
        <path 
          d="M0,160L48,165.3C96,171,192,181,288,181.3C384,181,480,171,576,154.7C672,139,768,117,864,117.3C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
          fill="currentColor"
          className="text-white dark:text-gray-900"
        />
      </svg>
    </div>
  );
}

