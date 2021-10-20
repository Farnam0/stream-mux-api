import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Hls from 'hls.js'
import React from 'react'

import Clip from './Clip';
import Player from './Player';

const VideoPlayer = () => {
    const [showClipping, setShowClipping] = useState(false)

    const videoRef = useRef(null)
    const src = "https://stream.mux.com/ieOreEoe28XlgtpNMPcBZcLELX9CNsAMj6g3d02NU7GU.m3u8" //stream token
    // const assetID = "QIURDS36qh1sIBp36LbqNE01RslXHRxVX8NG01br9vSJw"
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.controls = true
        let hls

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // This will run in safari, where HLS is supported natively
            video.src = src
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers
            hls = new Hls()
            hls.loadSource(src)
            hls.attachMedia(video)
        } else {
            console.error(
                'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
            )
        }

        return () => {
            if (hls) {
                hls.destroy()
            }
        }
    }, [src, videoRef]) //if you have this then this code will only run if those variables change, 
                        //remove this to allow the video player to reset when you leave clip 
        
    // async function createClip() {
    //     const response = await fetch()
    // }
    const onButtonClick = () => {
        setShowClipping(!showClipping)
    }

    if (showClipping) {
        return (
            <>
                <Clip onButtonClick={onButtonClick}/>
            </>
        )
    } else {
        return (
            <>
                <Player onButtonClick={onButtonClick} videoRef={videoRef} buttonText={"clip"}/>
            </>
        )
    }

}

export default VideoPlayer



