import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Hls from 'hls.js'
import React from 'react'

import Player from './Generic/Player';
import Button from './Generic/Button';
import ClipMenu from './Generic/ClipMenu';
import CreateAClip from './Api/CreateAClip';
import GetPlayBackId from './Api/GetPlayBackId';
import MessageBox from './Stream/StreamKey';

const VideoPlayer = ({ playbackId, AssetId, isStream }) => {

	//Used to Toggle Clipping
	const [showClipping, setShowClipping] = useState(false);
	//Timing for Clip
    const [startTime, setStartTime] = useState(0.0);
    const [endTime, setEndTime] = useState(0.0);

	//Mux Playback ID used to play in Video Player
    const [PlaybackId, setPlaybackId] = useState(0);

	//AssetID of the new clip
	const [newAssetId, setNewAssetId] = useState('');

	const videoRef = useRef(null)

	useEffect(() => {
		if(AssetId)
		{
			const result = GetPlayBackId(AssetId);
			result.then(response => {
				console.log(response)
				setPlaybackId(response.playback_ids[0].id)
			})
		}
    }, [AssetId])

	let src
	if(AssetId)
		src = 'https://stream.mux.com/' + PlaybackId + '.m3u8'
	else
		src = 'https://stream.mux.com/' + playbackId + '.m3u8'

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
		const result = CreateAClip(AssetId, startTime, endTime);
		result.then(response => {
			console.log(response)
			setNewAssetId(response.id)
		})
        setShowClipping(!showClipping)
    }

	//Clipping Feature Video Player
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
	} 

	//Show New Asset ID Video Player
	if(newAssetId)
		return (
			<>
				<MessageBox message={newAssetId} />
				<Player videoRef={videoRef} />
				<div className="text-center">
					<Button color="#FE6C59" hoverColor="#F08C99" text={"Clip"} onClick={onClipClick} />
				</div>
			</>
		)
	//Stream Player

	if(isStream) {
		return (
			<>
				<Player videoRef={videoRef} />
			</>
		)
	}

	//Regular Video Player
	return (
		<>
			<Player videoRef={videoRef} />
			<div className="text-center">
				<Button color="#FE6C59" hoverColor="#F08C99" text={"Clip"} onClick={onClipClick} />
			</div>
		</>
	)
}

export default VideoPlayer