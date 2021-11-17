import React, { useEffect, useState } from 'react';
import Button from './Button';
import MultiRangeSlider from "multi-range-slider-react";

const ClipMenu = ({onStartChange, onEndChange, saveClip}) => {
    const [minValue] = useState(0.1);
    const [maxValue] = useState(5.0);
    const handleInput = (e) => {
        onStartChange(e.minValue);
        onEndChange(e.maxValue);
    };

    return (
        <div className=" text-center display:flex flex-direction:row mt-3 mw8">
            <MultiRangeSlider 
			min={0}
			max={5}
			step={0.1}
			ruler={false}
			label={true}
			preventWheel={false}
			minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
			}}
		/>
            <Button color="#FE6C59" hoverColor="#F08C99" text="Save Clip" onClick={saveClip} />
        </div>
    )
}

export default ClipMenu
