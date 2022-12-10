import SelectQuote from "../SelectQuote";


const Notify = ({messages}) =>{

    return (
        messages.map( m => <p>{m}</p>)
    )
}

export const useNotify = (error, value) => {
    /* 

    {
      meta.value === "Suscripción" ?
        <SelectQuote selectName={'Seleccione la cantidad de coutas'} name='quotes' id='quotes' options={[1, 3, 6, 9, 12, 18]} />
        : null
    }

    {meta.errors && <p className="help is-danger">{meta.error}</p>}

    {meta.value === 'Tradicional' || meta.value === 'Suscripción' ? (
      <Block className="field_info">
        <Notification color="info" light="true">
          <strong> {meta.value} </strong>

          {meta.value === 'Tradicional'
            ? ' le permite hacer la operacion habitual de compra'
            : null}
          {meta.value === 'Suscripción'
            ? ' le permite hacer la operacion con las cuotas sin interes!'
            : null}
        </Notification>
      </Block>
    ) : null}
*/
    return ({
        Error: <Notify messages={error} />,
        Notify: <Notify messages={value} />
    })
}
