import PropTypes from 'prop-types'

const Button = ({ color, hoverColor, text, onClick }) => {
    return (
        <div>
            <button className="button" onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button
