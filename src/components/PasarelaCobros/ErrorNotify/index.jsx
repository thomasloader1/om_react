import React from 'react'
import { Block, Notification } from 'react-bulma-components'

const ErrorNotify = ({messages}) => {
  const [key, value] = messages;
  return (
    <Block style={{margin: '1rem 0'}}>
    <Notification color="danger" light="true">
      <strong>{key}</strong> : <span>{value}</span>
    </Notification>
  </Block>
  )
}

export default ErrorNotify