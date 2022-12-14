const Notify = ({messages}) =>{

    return (
        messages.map( m => <p>{m}</p>)
    )
}

export const useNotify = (error, value) => {
    
    return ({
        Error: <Notify messages={error} />,
        Notify: <Notify messages={value} />
    })
}
