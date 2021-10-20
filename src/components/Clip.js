import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import React from 'react'

import Player from './Player'

const Clip = ( { onButtonClick } ) => {

const videoRef = useRef(null)
const src = "https://stream.mux.com/ieOreEoe28XlgtpNMPcBZcLELX9CNsAMj6g3d02NU7GU.m3u8" //stream token
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
  }, [src, videoRef])

    return (
      <>
        <Player onButtonClick={onButtonClick} videoRef={videoRef} buttonText={"Save Clip"}/>
      </>
    )
}

export default Clip
