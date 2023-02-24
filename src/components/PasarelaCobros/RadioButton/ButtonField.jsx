import { useField } from 'formik';
import React from 'react';
import { Form } from 'react-bulma-components';
import { Image } from 'semantic-ui-react';
import IMAGES from '../../../img/pasarelaCobros/share';

const ButtonField = ({
  img,
  showText,
  idElement,
  className,
  classLabel,
  shortName,
  idInputElement,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { value } = props;

  const imageIcon = img && <Image src={IMAGES[img]} alt={value} size='small' />;
  const labelOfElement = showText ? value : '';
  return (
    <>
      <Form.Field id={`${idElement}_field`}>
        <Form.Control>
          <Form.Radio
            {...props}
            {...field}
            id={idElement}
            htmlFor={idElement}
            className={className + ` ${meta.error && 'error'}`}
            value={value}
          >
            {imageIcon}
            {showText && <h4 className='text_option'>{labelOfElement}</h4>}
          </Form.Radio>
        </Form.Control>
      </Form.Field>
      {/*  <pre>{JSON.stringify(field, null, 1)}</pre> */}
    </>
  );
};

export default ButtonField;
