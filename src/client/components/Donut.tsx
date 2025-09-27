import { Component } from "solid-js";

interface DonutPieProps {

    percentage: number; // 0 to 100

    size?: number; // width and height of the SVG in pixels

    strokeWidth?: number; // thickness of the donut ring in pixels

    color?: string;

    backgroundColor?: string;

}


const PixelArtDonutPie: Component<DonutPieProps> = (props) => {

    const size = props.size ?? 100;

    const strokeWidth = props.strokeWidth ?? 16;

    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (props.percentage / 100) * circumference;


    // To get pixel art edges, use shape-rendering="crispEdges"

    // Also, the stroke will be aligned to the center, so exact pixel perfect edges

    // We use viewBox to keep SVG crisp



    return (

        <svg

            width={size}

            height={size}

            viewBox={`0 0 ${size} ${size}`}

            style={{ "image-rendering": "pixelated" }}

            aria-label={`Donut pie chart showing ${props.percentage}%`}

        >

            {/* Background ring */}

            <circle

                cx={size / 2}

                cy={size / 2}

                r={radius}

                stroke={props.backgroundColor ?? "#ccc"}

                stroke-width={strokeWidth}

                fill="transparent"

                shape-rendering="crispEdges"

            />

            {/* Filled arc */}

            <circle

                cx={size / 2}

                cy={size / 2}

                r={radius}

                stroke={props.color ?? "#4caf50"}

                stroke-width={strokeWidth}

                fill="transparent"

                stroke-dasharray={`${circumference}`}
                stroke-dashoffset={`${offset}`}

                stroke-linecap="butt"

                transform={`rotate(-90 ${size / 2} ${size / 2})`}

                shape-rendering="crispEdges"

            />

            {/* Center hollow area to create donut, filled with background */}

            <circle

                cx={size / 2}

                cy={size / 2}

                r={radius - strokeWidth / 1.5}

                fill="white"

                shape-rendering="crispEdges"

            />

        </svg>

    );

};


export default PixelArtDonutPie;