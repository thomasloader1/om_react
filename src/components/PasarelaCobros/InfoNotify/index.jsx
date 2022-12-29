import React from 'react'
import { useContext } from 'react'
import { Block, Notification } from 'react-bulma-components'
import { AppContext } from '../Provider/StateProvider'

const InfoNotify = ({ messages }) => {
  const [key, value] = messages
  const { stepNumberGlobal, userInfo } = useContext(AppContext)
  /* // console.log({messages}) */

  if (key === 'mod' && value === 'Tradicional' && userInfo.stepTwo.value === 'Stripe' && stepNumberGlobal === 3) {
    return (
      <Block style={{ margin: '1rem 0' }}>
        <Notification color="info" light="true">
          <p>El pago se efectua en el momento y sin cuotas</p>
        </Notification>
      </Block>
    )
  }

  if (key === 'mod' && value === 'Tradicional' && userInfo.stepTwo.value === 'Mercado Pago' && stepNumberGlobal === 3) {
    return (
      <Block style={{ margin: '1rem 0' }}>
        <Notification color="info" light="true">
          <p>El pago se efectuara en formato tradicional</p>
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