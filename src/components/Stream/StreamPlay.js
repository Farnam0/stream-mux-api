import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import MessageBox from './StreamKey';
import VideoPlayer from '../VideoPlayer';
import Button from '../Generic/Button'

function StreamPlay({streamKey, playBackId, onButtonClick}) {
    return (
        <>
        <Container>
            <Row>
                < MessageBox message={streamKey} />
                < VideoPlayer playbackId={playBackId} isStream={true}/>
            </Row>
        </Container>

        <div className="text-center">
            <Button color="#FE6C59" hoverColor="#F08C99" text={"Load Stream"} onClick={onButtonClick} />
        </div>
    </>
    )
}

export default StreamPlay
