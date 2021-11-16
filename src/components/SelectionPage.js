import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import VideoPlayer from './VideoPlayer';
import Button from './common/Button';
import StreamPlayer from './Stream/StreamPlayer';

class SelectionPage extends Component {
	constructor() {
		super()
		this.state = {
			page: "",
			assetId: ""
		}
	}

	videoPage = () => {
		this.setState({
			page: "video"
		});
	};

	streamPage = () => {
		this.setState({
			page: "stream"
		});
	};

	onInputChange = (event) => {
		this.setState({ assetId: event.target.value })
	}

	render() {
		let { page } = this.state

		switch (page) {
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
			default:
				return (
					<Container>
						<Row>
							<div className="text-center">
								<Button color="#FE6C59" hoverColor="#F08C99" text="Video Player" onClick={this.videoPage} />
								<input type="text" name="startTime" placeholder="Asset Id" onChange={this.onInputChange} />
							</div>
						</Row>
						<Row>
							<div className="text-center">
								<Button color="#FE6C59" hoverColor="#F08C99" text="Stream Player" onClick={this.streamPage} />
							</div>
						</Row>
					</Container>
				);
		}
	}
}

export default SelectionPage;