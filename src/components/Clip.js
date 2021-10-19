import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Button from './Button'

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
      <Container>
          <Row>
              <div className="text-center pt-5">
                  <video controls ref={videoRef} style={{ width: "100%", maxWidth: "1500px" }} />
              </div>
          </Row>
          <Row>
              <div className="text-center">
                  <Button color="#FE6C59" hoverColor="#F08C99" text="Save Clip" onClick={onButtonClick} />
              </div>
          </Row>
      </Container>
  </>   
    )
}

export default Clip
