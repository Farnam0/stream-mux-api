import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Hls from 'hls.js'
import React from 'react'

import Clip from './Clip';
import Player from './Player';

const VideoPlayer = ({playBackId}) => {

    const [showClipping, setShowClipping] = useState(false)

    const videoRef = useRef(null)
    //const src = "https://stream.mux.com/ieOreEoe28XlgtpNMPcBZcLELX9CNsAMj6g3d02NU7GU.m3u8" //stream token
    const src = 'https://stream.mux.com/' + playBackId + '.m3u8'
    // const assetID = "QIURDS36qh1sIBp36LbqNE01RslXHRxVX8NG01br9vSJw"
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
      });//, [videoRef]);
        
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



