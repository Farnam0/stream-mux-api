import { useState, useEffect, useRef } from 'react'
import { Container, Row } from 'react-bootstrap'
import Hls from 'hls.js'

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
    const [assetId, setAssetId] = useState(0);

    const [playBackId, setPlayBackId] = useState(0);
    const [callVideoPlayer, setVideoPlayer] = useState(false);
    const [startTime, setStartTime] = useState(0.0);
    const [endTime, setEndTime] = useState(0.0);
	const [showClipping, setShowClipping] = useState(false);


    useEffect(() => {
        const result = CreateStreamKey();
        result.then(response => {
            console.log(response)
            setStreamKey(response.stream_key)
            setPlayBackId(response.playback_ids[0].id)
            setAssetId(response.id)
        })

    }, [])

    const onButtonClick = () => {
        setVideoPlayer(!callVideoPlayer)
    }

    const onClipClick = () => {
        setShowClipping(!showClipping)
    }

    const onStartChange = (event) => {
        setStartTime(event.target.value);
        console.log(startTime);
    }

    const onEndChange = (event) => {
        setEndTime(event.target.value);
        console.log(endTime);
    }
    console.log(assetId)
    const saveClip = () => {
        var reqBody = {
            "input": [{
                "url": "mux://assets/" + assetId,
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

	const videoRef = useRef(null)
	const src = 'https://stream.mux.com/' + playBackId + '.m3u8'
	useEffect(() => {
		let hls;
		if (videoRef.current) {
			const video = videoRef.current;

			if (video.canPlayType("application/vnd.apple.mpegurl")) {
				// Some browers (safari and ie edge) support HLS natively
				video.src = src;
			} else if (Hls.isSupported()) {
				// This will run in all other modern browsers
				hls = new Hls();
				hls.loadSource(src);
				hls.attachMedia(video);
			} else {
				console.error("This is a legacy browser that doesn't support MSE");
			}
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	});

    //THIS IS NOT DEFAULT VIEW 
    if(callVideoPlayer){
        return (
            <>
                <Container>
                    <Row>
                        <StreamKey message={streamKey} />
                        <Player videoRef={videoRef} />  
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

    
	// if (showClipping) {
	// 	return (
	// 		<>
	// 			<>
	// 				<Player videoRef={videoRef} />
	// 				<ClipMenu
	// 					onStartChange={onStartChange}
	// 					onEndChange={onEndChange}
	// 					saveClip={saveClip}
	// 				/>
	// 			</>
	// 		</>
	// 	)
    // }

    // THIS IS DEFAULT VIEW BEFORE CLICKING CLIP
    return (
        <>
            <Container>
                <Row>
                    <StreamKey message={streamKey} />
                    <Player videoRef={videoRef} />  
                    <div className="text-center">
                        <Button color="#FE6C59" hoverColor="#F08C99" text="Clip" onClick={onClipClick} />
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
