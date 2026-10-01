import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  className?: string;
  theme?: 'indigo' | 'emerald' | 'gradient';
}

export const Visualizer: React.FC<VisualizerProps> = ({
  isPlaying,
  barCount = 16,
  className = '',
  theme = 'gradient',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const heights = Array.from({ length: barCount }, () => Math.random() * 0.4 + 0.1);
    const targetHeights = Array.from({ length: barCount }, () => Math.random() * 0.4 + 0.1);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        if (isPlaying) {
          // Lerp toward target height
          heights[i] += (targetHeights[i] - heights[i]) * 0.15;
          if (Math.abs(targetHeights[i] - heights[i]) < 0.05) {
            targetHeights[i] = Math.random() * 0.85 + 0.15;
          }
        } else {
          // Smoothly settle down
          heights[i] += (0.05 - heights[i]) * 0.1;
        }

        const barHeight = heights[i] * height;
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gradient coloring
        let grad = ctx.createLinearGradient(0, height, 0, 0);
        if (theme === 'gradient') {
          grad.addColorStop(0, '#6366f1');
          grad.addColorStop(0.5, '#06b6d4');
          grad.addColorStop(1, '#a855f7');
        } else if (theme === 'emerald') {
          grad.addColorStop(0, '#059669');
          grad.addColorStop(1, '#10b981');
        } else {
          grad.addColorStop(0, '#4338ca');
          grad.addColorStop(1, '#818cf8');
        }

        ctx.fillStyle = grad;
        // Rounded bar top
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, barCount, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 8}
      height={36}
      className={`h-9 w-auto ${className}`}
    />
  );
};
