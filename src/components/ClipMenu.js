import React from 'react';
import Button from './Button';


const ClipMenu = ({onStartChange, onEndChange, saveClip}) => {

    return (
        <div className=" mt-3 text-center display:flex; flex-direction:row">
            <div>
                <input type="text" name="startTime" placeholder="Start Time" onChange={onStartChange} />
            </div>
            <div>
                <input type="text" name="endtime" placeholder="End Time" onChange={onEndChange} />
            </div>
            <Button color="#FE6C59" hoverColor="#F08C99" text="Save Clip" onClick={saveClip} />
        </div>
    )
}

export default ClipMenu
