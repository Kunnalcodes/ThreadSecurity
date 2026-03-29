import React, { useRef, useEffect, useState, startTransition } from "react";

export default function AsciiEffect(props) {
    const {
        image = { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", alt: "Cyber Background" },
        characterSize = 10,
        blackAndWhite = true,
        backgroundColor = "transparent",
        textColor = "#0066cc",
        imageFit = "cover",
        // Default hero-style overlay content for the cybersecurity landing section
        overlayText = (
            <div className="max-w-3xl px-6 text-center md:text-left space-y-6">
                <p className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase">
                    Next-Gen Offensive Security
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                    Master Cybersecurity with{" "}
                    <span className="text-cyan-400">AI-Driven Training</span>
                </h1>
                <p className="text-sm md:text-base text-slate-200/80 max-w-xl">
                    Advanced threat simulation, automated red-teaming, and real-world methodologies
                    crafted by elite security researchers for the modern digital frontier.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 justify-center md:justify-start">
                    <button className="relative inline-flex items-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-500/10 px-6 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.45)] transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_35px_rgba(34,211,238,0.75)]">
                        <span>Explore Academy</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">
                            Training
                        </span>
                    </button>
                    <button className="relative inline-flex items-center gap-2 rounded-full border border-slate-500/70 bg-black/40 px-6 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:bg-slate-900/70">
                        <span>View Research</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    </button>
                </div>
            </div>
        ),
        overlayTextClassName = "",
    } = props;

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const resizeTimeoutRef = useRef(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (resizeTimeoutRef.current) {
                    clearTimeout(resizeTimeoutRef.current);
                }
                resizeTimeoutRef.current = window.setTimeout(() => {
                    startTransition(() => {
                        setDimensions({
                            width: Math.max(1, Math.floor(width)),
                            height: Math.max(1, Math.floor(height)),
                        });
                    });
                }, 16);
            }
        });
        resizeObserver.observe(container);
        return () => {
            resizeObserver.disconnect();
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true, alpha: true });
        if (!ctx) return;

        let animationFrameId;
        let cachedImageData = null;
        let hw = dimensions.width;
        let hh = dimensions.height;

        const prepareImage = () => {
            if (hw === 0 || hh === 0 || !img.complete || img.naturalWidth === 0) return false;

            const offscreen = document.createElement("canvas");
            offscreen.width = hw;
            offscreen.height = hh;
            const offCtx = offscreen.getContext("2d");

            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = hw / hh;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (imageFit === "fill") {
                drawWidth = hw;
                drawHeight = hh;
                offsetX = 0;
                offsetY = 0;
            } else if (imageFit === "contain") {
                if (canvasAspect > imgAspect) {
                    drawHeight = hh;
                    drawWidth = hh * imgAspect;
                    offsetX = (hw - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = hw;
                    drawHeight = hw / imgAspect;
                    offsetX = 0;
                    offsetY = (hh - drawHeight) / 2;
                }
            } else if (imageFit === "none") {
                drawWidth = img.naturalWidth;
                drawHeight = img.naturalHeight;
                offsetX = (hw - drawWidth) / 2;
                offsetY = (hh - drawHeight) / 2;
            } else {
                if (canvasAspect > imgAspect) {
                    drawWidth = hw;
                    drawHeight = hw / imgAspect;
                    offsetX = 0;
                    offsetY = (hh - drawHeight) / 2;
                } else {
                    drawHeight = hh;
                    drawWidth = hh * imgAspect;
                    offsetX = (hw - drawWidth) / 2;
                    offsetY = 0;
                }
            }

            offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            cachedImageData = offCtx.getImageData(0, 0, hw, hh);
            return true;
        };

        const render = (time) => {
            const width = dimensions.width;
            const height = dimensions.height;
            if (width === 0 || height === 0 || !img.complete || img.naturalWidth === 0) {
                return;
            }

            // Refresh cache if dimensions changed or cache is missing
            if (!cachedImageData || hw !== width || hh !== height) {
                hw = width;
                hh = height;
                if (!prepareImage()) return;
            }

            canvas.width = width;
            canvas.height = height;

            if (backgroundColor !== "transparent") {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, width, height);
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            const data = cachedImageData.data;
            const blockSize = Math.max(4, characterSize);

            const t = time * 0.001; // Convert to seconds

            for (let y = 0; y < height; y += blockSize) {
                for (let x = 0; x < width; x += blockSize) {
                    const sampleX = Math.min(Math.floor(x + blockSize / 2), width - 1);
                    const sampleY = Math.min(Math.floor(y + blockSize / 2), height - 1);
                    const pixelIndex = (sampleY * width + sampleX) * 4;
                    const r = data[pixelIndex] / 255;
                    const g = data[pixelIndex + 1] / 255;
                    const b = data[pixelIndex + 2] / 255;

                    // Add a beautiful flowing wave effect to the grayscale evaluation
                    // This causes the ASCII characters to shift dynamically in a cool cyber-liquid way
                    let wave = Math.sin(x * 0.005 + t) * Math.cos(y * 0.005 + t * 0.8) * 0.3;
                    let wave2 = Math.sin(x * 0.01 - y * 0.01 + t * 1.5) * 0.1;
                    let gray = (0.3 * r + 0.59 * g + 0.11 * b) + wave + wave2;

                    gray = Math.max(0, Math.min(1, gray)); // clamp

                    let blockColor = gray > 0.45 ? textColor : "#000000";

                    let n = 4096;
                    if (gray > 0.0233) n = 4096;
                    if (gray > 0.0465) n = 131200;
                    if (gray > 0.0698) n = 4329476;
                    if (gray > 0.093) n = 459200;
                    if (gray > 0.1163) n = 4591748;
                    if (gray > 0.1395) n = 12652620;
                    if (gray > 0.1628) n = 14749828;
                    if (gray > 0.186) n = 18393220;
                    if (gray > 0.2093) n = 15239300;
                    if (gray > 0.2326) n = 17318431;
                    if (gray > 0.2558) n = 32641156;
                    if (gray > 0.2791) n = 18393412;
                    if (gray > 0.3023) n = 18157905;
                    if (gray > 0.3256) n = 17463428;
                    if (gray > 0.3488) n = 14954572;
                    if (gray > 0.3721) n = 13177118;
                    if (gray > 0.3953) n = 6566222;
                    if (gray > 0.4186) n = 16269839;
                    if (gray > 0.4419) n = 18444881;
                    if (gray > 0.4651) n = 18400814;
                    if (gray > 0.4884) n = 33061392;
                    if (gray > 0.5116) n = 15255086;
                    if (gray > 0.5349) n = 32045584;
                    if (gray > 0.5581) n = 18405034;
                    if (gray > 0.5814) n = 15022158;
                    if (gray > 0.6047) n = 15018318;
                    if (gray > 0.6279) n = 16272942;
                    if (gray > 0.6512) n = 18415153;
                    if (gray > 0.6744) n = 32641183;
                    if (gray > 0.6977) n = 32540207;
                    if (gray > 0.7209) n = 18732593;
                    if (gray > 0.7442) n = 18667121;
                    if (gray > 0.7674) n = 16267326;
                    if (gray > 0.7907) n = 32575775;
                    if (gray > 0.814) n = 15022414;
                    if (gray > 0.8372) n = 15255537;
                    if (gray > 0.8605) n = 32032318;
                    if (gray > 0.8837) n = 32045617;
                    if (gray > 0.907) n = 33081316;
                    if (gray > 0.9302) n = 32045630;
                    if (gray > 0.9535) n = 33061407;
                    if (gray > 0.9767) n = 11512810;

                    const gridSize = 5;

                    for (let py = 0; py < blockSize; py++) {
                        for (let px = 0; px < blockSize; px++) {
                            const normX = px / blockSize;
                            const normY = py / blockSize;
                            const charX = Math.floor((1 - normX) * gridSize * 2 - gridSize + 2.5);
                            const charY = Math.floor(normY * gridSize * 2 - gridSize + 2.5);
                            if (charX >= 0 && charX < gridSize && charY >= 0 && charY < gridSize) {
                                const bitIndex = charX + gridSize * charY;
                                if (((n >> bitIndex) & 1) === 1) {
                                    const pixX = x + px;
                                    const pixY = y + py;
                                    if (pixX < width && pixY < height) {
                                        if (!blackAndWhite) {
                                            ctx.fillStyle = `rgb(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)})`;
                                        } else {
                                            ctx.fillStyle = blockColor;
                                        }
                                        ctx.fillRect(pixX, pixY, 1, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const loop = (time) => {
            render(time);
            animationFrameId = requestAnimationFrame(loop);
        };

        const handleImageLoad = () => {
            startTransition(() => setImageLoaded(true));
            // Invalidate cache
            cachedImageData = null;
        };

        if (img.complete && img.naturalWidth > 0) {
            startTransition(() => setImageLoaded(true));
        }

        img.addEventListener("load", handleImageLoad);
        animationFrameId = requestAnimationFrame(loop);

        return () => {
            img.removeEventListener("load", handleImageLoad);
            cancelAnimationFrame(animationFrameId);
        };
    }, [
        image.src,
        characterSize,
        blackAndWhite,
        backgroundColor,
        textColor,
        dimensions,
        imageFit,
    ]);

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...props.style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor,
                minWidth: "1px",
                minHeight: "1px",
            }}
        >
            <img
                ref={imageRef}
                src={image.src}
                alt={image.alt || ""}
                style={{ display: "none" }}
                crossOrigin="anonymous"
            />
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    imageRendering: "pixelated",
                }}
            />
            {overlayText && (
                <div 
                    className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none ${overlayTextClassName}`}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    {overlayText}
                </div>
            )}

            {/* ASCII-style shield that appears on hover to signify cybersecurity */}
            <div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background:
                        "radial-gradient(circle at center, rgba(34,211,238,0.18), transparent 60%)",
                }}
            >
                <pre className="text-[9px] md:text-[11px] leading-3 font-mono text-cyan-300/90 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] select-none">
{String.raw`          /########\          
        /############\        
       /##############\       
      /#######  #######\      
      |###### /####### |      
      |##### /######## |      
      |#### /#######  |      
      |### /######   /       
      |## /#####   /         
      |# /####   /           
      | /###   /             
       \##   /               
        \#  /                
         \/                  `}
                </pre>
            </div>
        </div>
    );
}
