export default function CloudsDivider() {
    return (
        <div className="relative w-full h-24 overflow-hidden pointer-events-none">
            {/* Nubes SVG decorativas */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1440 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                {/* Nube 1 - Izquierda */}
                <ellipse cx="120" cy="60" rx="80" ry="35" fill="white" opacity="0.8" />
                <ellipse cx="100" cy="50" rx="60" ry="30" fill="white" opacity="0.9" />
                <ellipse cx="150" cy="55" rx="70" ry="32" fill="white" opacity="0.85" />

                {/* Nube 2 */}
                <ellipse cx="350" cy="40" rx="90" ry="38" fill="white" opacity="0.75" />
                <ellipse cx="320" cy="32" rx="70" ry="32" fill="white" opacity="0.85" />
                <ellipse cx="380" cy="35" rx="75" ry="35" fill="white" opacity="0.8" />

                {/* Nube 3 - Centro */}
                <ellipse cx="720" cy="55" rx="100" ry="40" fill="white" opacity="0.8" />
                <ellipse cx="690" cy="45" rx="80" ry="35" fill="white" opacity="0.9" />
                <ellipse cx="750" cy="50" rx="85" ry="37" fill="white" opacity="0.85" />

                {/* Nube 4 */}
                <ellipse cx="980" cy="35" rx="85" ry="36" fill="white" opacity="0.78" />
                <ellipse cx="950" cy="28" rx="65" ry="30" fill="white" opacity="0.88" />
                <ellipse cx="1010" cy="32" rx="70" ry="33" fill="white" opacity="0.82" />

                {/* Nube 5 - Derecha */}
                <ellipse cx="1280" cy="58" rx="95" ry="38" fill="white" opacity="0.8" />
                <ellipse cx="1250" cy="48" rx="75" ry="33" fill="white" opacity="0.9" />
                <ellipse cx="1310" cy="53" rx="80" ry="35" fill="white" opacity="0.85" />

                {/* Nubes pequeñas adicionales para llenar espacios */}
                <ellipse cx="550" cy="70" rx="50" ry="22" fill="white" opacity="0.7" />
                <ellipse cx="1150" cy="65" rx="55" ry="24" fill="white" opacity="0.72" />
            </svg>
        </div>
    );
}
