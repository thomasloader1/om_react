import { useField } from 'formik';
import React from 'react'
import { Block, Form, Notification } from 'react-bulma-components';
import { Image } from 'semantic-ui-react';
import IMAGES from '../../../img/pasarelaCobros/share';
import SelectQuote from '../SelectQuote';

const ButtonField = ({ img, showText, idElement, className, ...props }) => {
  const [field, meta] = useField(props)
  const { value } = props

  const imageIcon = img && <Image src={IMAGES[img]} alt={value} size='small' />
  const labelOfElement = showText ? value : ''

  return (
    <>
      <Form.Field id={`${idElement}_field`}>
        <Form.Control>
          <Form.Radio
            {...props}
            {...field}
            id={idElement}
            htmlFor={idElement}
            className={className}
            value={value}
          >
            {imageIcon}
            {showText && <h4 className="text_option">{labelOfElement}</h4>}
          </Form.Radio>
        </Form.Control>
      </Form.Field>

      {
        meta.value === "Suscripción" ?
          <SelectQuote selectName={'Seleccione la cantidad de coutas'} options={[1, 3, 6, 9, 12, 18]} />
          : null
      }

      {
        meta.errors && (
          <p className="help is-danger">{meta.error}</p>
        )
      }

      {
        meta.value === "Tradicional" || meta.value === "Suscripción" ? (
          <Block className='field_info'>
            <Notification color="info">
              <strong> {meta.value} </strong>

              {meta.value === "Tradicional" ? " le permite hacer la operacion habitual de compra" : null}
              {meta.value === "Suscripción" ? " le permite hacer la operacion con las cuotas sin interes!" : null}

            </Notification>
          </Block>
        ) : null
      }
    </>
  )
}

export default ButtonField