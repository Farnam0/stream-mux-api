import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import StreamKey from './StreamKey';
import VideoPlayer from '../VideoPlayer';
import Button from '../Button'

function StreamPlay({streamKey, playBackId, onButtonClick}) {
    return (
        <>
        <Container>
            <Row>
                < StreamKey message={streamKey} />

                < VideoPlayer playBackId={playBackId} />

                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text={"Load Stream"} onClick={onButtonClick} />
                </div>
            </Row>
        </Container>
    </>
    )
}

export default StreamPlay
