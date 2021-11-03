import { useState, useEffect } from 'react'

import GetLiveStream from '../Api/GetLiveStream';
import StreamPlay from './StreamPlay';

function StreamPlayer() {
    const [streamKey, setStreamKey] = useState(0);
    const [playBackId, setPlayBackId] = useState(0);
    const [callVideoPlayer, setVideoPlayer] = useState(false);

    useEffect(() => {
        const result = GetLiveStream();
        result.then(response => {
            console.log(response)
            setStreamKey(response.stream_key)
            setPlayBackId(response.playback_ids[0].id)
        })
    }, [])

    const onButtonClick = () => {
        setVideoPlayer(!callVideoPlayer)
    }
    
    return (
        <>
            <StreamPlay streamKey={streamKey} playBackId={playBackId} onButtonClick={onButtonClick} />
        </>
    )
}

export default StreamPlayer
