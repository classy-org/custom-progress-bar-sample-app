import { useEffect, useState } from 'react';
import './CircleGraph.css';

/**
 * Function used to dynamically animate the circle graph upon rendering
 * Since the graph is drawn using SVG, this function creates a new CSS stylesheet on the fly
 * with a custom keyframe animation that sets the stroke-dasharray to the svg shape.
 * @param percentage numeric value between 0-100
 * @param percentageMissing 100 - percentage
 * @returns whether to show the graph or not (used during initialization)
 */
function useAnimateCircleBar(percentage?: number, percentageMissing?: number) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof percentage !== 'undefined') {
      setIsVisible(true);

      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes donut {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: ${percentage}, ${percentageMissing};
          }
        }
      `;

      document.head.appendChild(style);

      const element = document.querySelector('.donut-segment') as SVGCircleElement | null;
      if (element?.style) {
        element.style.animationName = 'donut';
        element.style.animationDuration = '2s';
      }
    }
  }, [percentage, percentageMissing]);

  return isVisible;
}

/**
 * Circle Graph component using SVG and CSS with a basic animation.
 * This is used as an example of a progress bar for fundraising goal completion using the Classy API.
 * You may render/draw the graph in many other ways or using other libraries.
 */
export function CircleGraph({
  size = 120,
  backgroundColor,
  chartColor = '#425CC3',
  percentage: percentageBase,
}: {
  size?: number;
  backgroundColor?: string;
  chartColor?: string;
  percentage?: number;
}) {
  const percentage = typeof percentageBase !== 'undefined' ? Math.min(100, percentageBase) : undefined;
  const percentageMissing = 100 - (percentage || 0);

  const isVisible = useAnimateCircleBar(percentage, percentageMissing);

  return (
    <div className="svg-item" style={{ opacity: isVisible ? 1 : 0 }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        {!!backgroundColor && <circle cx="20" cy="20" r="15.91549430918954" fill={backgroundColor} />}
        <circle className="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5" />
        <circle
          className="donut-segment"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke={chartColor}
          strokeWidth="3.5"
          strokeDasharray={`${percentage || 0} ${typeof percentage !== 'undefined' ? percentageMissing : 100}`}
          strokeDashoffset="25"
        />
        <g className="donut-text" fill={chartColor}>
          <text y="50%" transform="translate(0, 2)">
            <tspan x="50%" textAnchor="middle" className="donut-percent">
              {parseFloat(percentage?.toFixed(2) || '0')}%
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
