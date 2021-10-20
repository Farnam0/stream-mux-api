import { useState, useEffect } from 'react'
import Mux from '@mux/mux-node';

import StreamPlay from './StreamPlay';

const { Video } = new Mux("4a875045-e081-416d-bfb6-193498df9553", "9s1nVYdsRPapK/J07idbqYhYO3RJ5lDGgtd7fDg/SDY/hEeLaERwH1gw0Qtkg+UMCeAy6r5eXjY");

function StreamPlayer() {
    async function CreateStreamKey() {
        return await Video.LiveStreams.create({
            playback_policy: 'public',
            new_asset_settings: { playback_policy: 'public' }
        })
    }

    const [streamKey, setStreamKey] = useState(0);
    const [playBackId, setPlayBackId] = useState(0);
    const [callVideoPlayer, setVideoPlayer] = useState(false);


    useEffect(() => {
        const result = CreateStreamKey();
        result.then(response => {
            console.log(response)
            setStreamKey(response.stream_key)
            setPlayBackId(response.playback_ids[0].id)
        })

    }, [])

    const onButtonClick = () => {
        setVideoPlayer(!callVideoPlayer)
    }

    if(callVideoPlayer){
        return (
            <>
                <StreamPlay streamKey={streamKey} playBackId={playBackId} onButtonClick={onButtonClick}/>
            </>
        )
    }

    return (
        <>
            <StreamPlay streamKey={streamKey} playBackId={playBackId} onButtonClick={onButtonClick}/>
        </>
    )
}

export default StreamPlayer
