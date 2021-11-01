import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

function Player({videoRef}) {
    return (
        <>
        <Container>
            <Row>
                <div className="text-center pt-5">
                    <video controls ref={videoRef} style={{ width: "100%", maxWidth: "1000px" }} />
                </div>
            </Row>
        </Container>
    </>
    )
}

export default Player
