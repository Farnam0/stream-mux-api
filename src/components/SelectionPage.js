import { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

import VideoPlayer from './VideoPlayer'
import Button from './Button'

function SelectionPage() {

    const [selectVideo, setVideoPlayer] = useState(false)
    const [selectStream, setStreamPlayer] = useState(false)


    const onButtonClick = () => {
        setVideoPlayer(!selectVideo)
    }

    const onButtonClick2 = () => {
        setStreamPlayer(!selectStream)
    }

    if(selectVideo)
    {
        return (
            <div>
                <VideoPlayer playBackId={"ieOreEoe28XlgtpNMPcBZcLELX9CNsAMj6g3d02NU7GU"} />
            </div>
        )
    }

    if(selectStream)
    {
        return (
            <div>
                <VideoPlayer playBackId={"MCBkK8L102Z6Z41buCEAKuyt8GNJESo6RRIkTU8Hcnk00"} />
            </div>
        )
    }

    return (
        <Container>
            <Row>
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text="Video Player" onClick={onButtonClick} />
                </div>
            </Row>
            <Row>
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text="Stream Player" onClick={onButtonClick2} />
                </div>
            </Row>
        </Container>
    )
}

export default SelectionPage
