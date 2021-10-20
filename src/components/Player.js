import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

import Button from './Button'

function Player({onButtonClick, videoRef, buttonText}) {
    return (
        <>
        <Container>
            <Row>
                <div className="text-center pt-5">
                    <video controls ref={videoRef} style={{ width: "100%", maxWidth: "1000px" }} />
                </div>
            </Row>
            <Row>
                <div className="text-center">
                    <Button color="#FE6C59" hoverColor="#F08C99" text={buttonText} onClick={onButtonClick} />
                </div>
            </Row>

        </Container>
    </>
    )
}

export default Player
