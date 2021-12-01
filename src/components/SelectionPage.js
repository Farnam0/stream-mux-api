import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

import VideoPlayer from './VideoPlayer'
import Button from './Generic/Button'
import StreamPlayer from './Stream/StreamPlayer'

function SelectionPage() {

    const [selectVideo, setVideoPlayer] = useState(false)
    const [selectStream, setStreamPlayer] = useState(false)

    //AssetId passed in to videoplayer to playback video
    const [assetId, setAssetId] = useState('');

    const onButtonClick = () => {
        setVideoPlayer(!selectVideo)
    }

    const onButtonClick2 = (e) => {
        e.preventDefault()
        setStreamPlayer(!selectStream)
    }
    
    //Playback Video
    if(selectVideo)
    {
        return (
            <div>
                <VideoPlayer 
                    AssetId={assetId}
                />
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text={"Back"} onClick={onButtonClick} />
                </div>
            </div>
            
        )
    }

    //Playback Stream
    if(selectStream)
    {
        return (
            <div>
                <StreamPlayer />
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text={"Back"} onClick={onButtonClick2} />
                </div>
            </div>
        )
    }

    //Landing Page / Selection Screen
    return (
        <Container>
            <Row>
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text="Stream Player" onClick={onButtonClick2} />
                </div>
            </Row>
            <Row >
                <div>
                    <div className="text-center">
                        <label style={{color: "white"}}>Asset ID</label>
                    </div>
                    <div className="text-center">
                        <input type="text"  className="" placeholder="Enter Asset ID" onChange={(event) => {setAssetId(event.target.value)}} />
                    </div>
                    <div className="text-center">
                        <small id="assetIdHelp" class="form-text text-muted">Please Enter the ID of your MUX Asset</small>
                    </div>
                </div>
                <div className="text-center ">
                    <Button color="#FE6C59" hoverColor="#F08C99" text="Play Video" onClick={onButtonClick} />
                </div>
            </Row>
            
        </Container>
    )
}

export default SelectionPage
