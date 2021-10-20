import PropTypes from 'prop-types'

const Button = ({ color, hoverColor, text, onClick }) => {
    return (
        <div>
            <style jsx> {`
            #button:hover {
                text-align: center;
                letter-spacing: 0.4em;
                background-color: ${hoverColor};
              }
              
              #button {
                color: white;
              }
              button {
                  text-align: center;
                height: 4em;
                width: 30%;
                padding: 1.5em auto;
                margin: 1em auto;
                background-color: ${color};
                border: none;
                border-radius: 3px;
                text-transform: uppercase;
                letter-spacing: 0.5em;
                transition: all 0.2s cubic-bezier(.4,0,.2,1);
              }
            `}`</style>
            <button id="button" className="" onClick={onClick}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: '#FE6C59',
    hoverColor: '#F08C99',
    text: 'Replace Me'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}
export default Button
