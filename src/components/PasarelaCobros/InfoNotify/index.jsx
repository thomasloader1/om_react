import React from 'react'
import { Block, Notification } from 'react-bulma-components'

const InfoNotify = ({messages}) => {
    const [key, value] = messages
  return (
    <Block style={{margin: '1rem 0'}}>
    <Notification color="info" light="true">
        <p>{key}: {value}</p>
    </Notification>
  </Block>
  )
}

export default InfoNotify