import React from 'react'
import { useContext } from 'react'
import { Block, Notification } from 'react-bulma-components'
import { AppContext } from '../Provider/StateProvider'

const InfoNotify = ({ messages }) => {
  const [key, value] = messages
  const { stepNumberGlobal } = useContext(AppContext)
  console.log({messages})

  if (key === 'mod' && value === 'Tradicional' && stepNumberGlobal === 3) {
    return (
      <Block style={{ margin: '1rem 0' }}>
        <Notification color="info" light="true">
          <p>El pago se efectua en el momento y sin cuotas</p>
        </Notification>
      </Block>
    )
  }

  /* return (
    <Block style={{ margin: '1rem 0' }}>
      <Notification color="info" light="true">
        <p>{key}: {value}</p>
      </Notification>
    </Block>
  ) */
}

export default InfoNotify