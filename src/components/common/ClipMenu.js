import React, { useEffect, useState } from 'react';
import Button from './Button';
import MultiRangeSlider from "multi-range-slider-react";

const ClipMenu = ({onStartChange, onEndChange, saveClip}) => {
    const [minValue, set_minValue] = useState(0.0);
    const [maxValue, set_maxValue] = useState(5.0);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    return (
        <div className=" mt-3 text-center display:flex; flex-direction:row">
            <MultiRangeSlider
			min={0}
			max={100}
			step={5}
			ruler={false}
			label={false}
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
