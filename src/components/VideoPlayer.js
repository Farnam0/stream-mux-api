import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Hls from 'hls.js'
import React from 'react'

import Player from './Player';
import Button from './Button';
import ClipMenu from './ClipMenu';
import CreateAClip from './Api/CreateAClip';

const VideoPlayer = ({ PlaybackId }) => {

	const [showClipping, setShowClipping] = useState(false);
    const [startTime, setStartTime] = useState(0.0);
    const [endTime, setEndTime] = useState(0.0);

	const videoRef = useRef(null)
	const src = 'https://stream.mux.com/' + PlaybackId + '.m3u8'

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
		}
	})

	const onClipClick = () => {
        setShowClipping(!showClipping)
    }

	const OnSaveClip = () => {
		const result = CreateAClip();
		result.then(response => {
			console.log(response)
		})
    }

	if (showClipping) {
		return (
			<>
				<Player videoRef={videoRef} />
				<ClipMenu
					onStartChange={(event) => {setStartTime(event.target.value)}}
					onEndChange={(event) => {setEndTime(event.target.value)}}
					saveClip={OnSaveClip}
				/>
			</>
		)
	} else {
		return (
			<>
				<Player videoRef={videoRef} />
				<div className="text-center">
					<Button color="#FE6C59" hoverColor="#F08C99" text={"Clip"} onClick={onClipClick} />
				</div>
			</>
		)
	}

}

export default VideoPlayer