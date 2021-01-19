

const Message = ({message, error}) => {
    const textColor = error ? 'red' : 'black'
    return <p style={{fontSize: '22px', paddingLeft: '30px', color: textColor}}>{message}</p>
}

export default Message