import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import VideoPlayer from './VideoPlayer';
import Button from './Button';
import StreamPlayer from './Stream/StreamPlayer';

class SelectionPage extends Component {
    constructor() {
        super()
        this.state = {
            page: "",
            assetId: ""
        }
    }

    changePage = (nextPage) => {
        this.setState({
            page: nextPage,
        });
    };

    onInputChange = (event) => {
        this.setState({assetId: event.target.value})
    } 

    render() {

        let {page} = this.state

        switch(page) {
            case "":
                return (
                    <Container>
                        <Row>
                            <div className="text-center">
                                <Button color="#FE6C59" hoverColor="#F08C99" text="Video Player" onClick={this.changePage("video")} />
                                <input type="text" name="startTime" placeholder="Asset Id" onChange={this.onInputChange} />
                            </div>
                        </Row>
                        <Row>
                            <div className="text-center">
                                <Button color="#FE6C59" hoverColor="#F08C99" text="Stream Player" onClick={this.changePage("stream")} />
                            </div>
                        </Row>
                    </Container>
                );

            case "video":
                return (
                    <div>
                        <VideoPlayer 
                            AssetId={this.state}
                        />
                    </div>
                )

            case "stream":
                return (
                    <div>
                        <StreamPlayer />
                    </div>
                )
        }
    }
}

export default SelectionPage;