import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Hls from 'hls.js'
import React from 'react'

import Mux from './Player';
import Button from './Button';
import ClipMenu from './ClipMenu';
import { Video } from '@mux/mux-node';

const { Video } = new Mux("4a875045-e081-416d-bfb6-193498df9553", "9s1nVYdsRPapK/J07idbqYhYO3RJ5lDGgtd7fDg/SDY/hEeLaERwH1gw0Qtkg+UMCeAy6r5eXjY");


const VideoPlayer = ({ AssetId, PlaybackId }) => {

	const [showClipping, setShowClipping] = useState(false);
	const [startTime, setStartTime] = useState(0.0);
    const [endTime, setEndTime] = useState(0.0);
	const [playBackId, setPlayBackId] = useState(PlaybackId);
	const [assetId, setAssetId] = useState(AssetId);

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

	const onButtonClick = () => {
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

    async function SaveClip() {
        Video.ClipMenu.create({

        })
        return await Video.LiveStreams.create({
            playback_policy: 'public',
            new_asset_settings: { playback_policy: 'public' }
        })
    }

    const saveClip = () => {
        var reqBody = {
            method: 'POST',
            input: [{
                url: "mux://assets/" + assetId,
                start_time: startTime,
                end_time: endTime
            }],
            playback_policy: [
                "public"
            ]
        }
        fetch('https://api.mux.com/video/v1/assets', reqBody)
            .then(response => response.json())
            .then(body => setPlayBackId(body.playback_ids[0].id))
            .catch(err => console.log(err));
        setShowClipping(true);
    }

	if (showClipping) {
		return (
			<>
				<>
					<Player videoRef={videoRef} />
					<ClipMenu
						onStartChange={onStartChange}
						onEndChange={onEndChange}
						saveClip={saveClip}
					/>
				</>
			</>
		)
	} else {
		return (
			<>
				<Player videoRef={videoRef} />
				<div className="text-center">
					<Button color="#FE6C59" hoverColor="#F08C99" text={"Clip"} onClick={onButtonClick} />
				</div>
			</>
		)
	}

}

export default VideoPlayer



