import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'

import Mux from '@mux/mux-node';
import StreamKey from './StreamKey';
import Button from '../Button';
import Player from '../Player';
import ClipMenu from '../ClipMenu';

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
    const [startTime, setStartTime] = useState(0.0);
    const [endTime, setEndTime] = useState(0.0);


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

    const onStartChange = (event) => {
        setStartTime(event.target.value);
        console.log(startTime);
    }

    const onEndChange = (event) => {
        setEndTime(event.target.value);
        console.log(endTime);
    }

    const saveClip = () => {
        var reqBody = {
            "input": [{
                "url": "mux://assets/" + playBackId,
                "start_time": startTime,
                "end_time": endTime
            }],
            "playback_policy": [
                "public"
            ]
        }
        fetch('https://api.mux.com/video/v1/assets', reqBody)
            .then(response => response.json())
            .then(body => setPlayBackId(body.playback_ids[0].id))
            .catch(err => console.log(err));
        setVideoPlayer(true);
    }

    //THIS IS NOT DEFAULT VIEW 
    if(callVideoPlayer){
        return (
            <>
                <Container>
                    <Row>
                        <StreamKey message={streamKey} />
                        <Player playBackId={playBackId} /> 
                        <ClipMenu 
                            onStartChange={onStartChange}
                            onEndChange={onEndChange}
                            saveClip={saveClip}
                        />
                        <div className="text-center">
                            <Button color="#FE6C59" hoverColor="#F08C99" text={"Load Stream"} onClick={onButtonClick} />
                        </div>
                    </Row>
                </Container>
            </>
        )
    }

    // THIS IS DEFAULT VIEW BEFORE CLICKING CLIP
    return (
        <>
            <Container>
                <Row>
                    <StreamKey message={streamKey} />
                    <Player playBackId={playBackId} />  
                    <div className="text-center">
                        <Button color="#FE6C59" hoverColor="#F08C99" text="Clip" onClick={onButtonClick} />
                    </div>

                    <div className="text-center">
                        <Button color="#FE6C59" hoverColor="#F08C99" text="Load Stream" onClick={onButtonClick} />
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default StreamPlayer
