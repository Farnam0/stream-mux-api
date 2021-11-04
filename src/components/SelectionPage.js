import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

import VideoPlayer from './VideoPlayer'
import Button from './Button'
import StreamPlayer from './Stream/StreamPlayer'

function SelectionPage() {

    const [selectVideo, setVideoPlayer] = useState(false)
    const [selectStream, setStreamPlayer] = useState(false)
    const [assetId, setAssetId] = useState('');

    const onButtonClick = () => {
        setVideoPlayer(!selectVideo)
    }

    const onButtonClick2 = (e) => {
        e.preventDefault()
        setStreamPlayer(!selectStream)
    }

    if(selectVideo)
    {
        return (
            <div>
                <VideoPlayer 
                    AssetId={assetId}
                />
            </div>
        )
    }

    if(selectStream)
    {
        return (
            <div>
                <StreamPlayer />
            </div>
        )
    }

    return (
        <Container>
            <Row>
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text="Video Player" onClick={onButtonClick} />
                    <input type="text" name="startTime" placeholder="Asset Id" onChange={(event) => {setAssetId(event.target.value)}} />
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
