import { Form } from "react-bootstrap"
import { IBaseInputValue, IBaseSelectProps } from "../models/uiKit.model";
import React, { useState } from "react";
import { EValidationTexts } from "../enums/validationTexts.enum";
import { Validators } from "../validators/validators.util";
import './BaseSelect.scss'

const BaseSelect = <T extends string>(props: IBaseSelectProps<T>) => {
  const [value, setValue] = useState(props.value);
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<EValidationTexts | string>('');
  const uniqueHelpBlockId = `base-select${Math.random()}`

  const onChange = (event?: React.ChangeEvent<HTMLSelectElement>): void => {
    const eventValue = event?.target?.value;

    validate(eventValue);
    setValue(eventValue);

    if (!props.onChange) {
      return;
    }

    props.onChange({ value: eventValue, valid: !errorMessage })
  }

  const validate = (value?: string) => {
    setIsTouched(true);

    if (props.validation) {
      setErrorMessage(Validators.validateInput(props.validation, value));
      return;
    }
    
    setErrorMessage('');
  }

  return (
    <div className="base-select">    
      <Form.Select 
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={value}
        onChange={onChange}
        onBlur={() => validate(value)}
      >
        { props.options && props.options?.map((option, key) => <option value={option.value} key={key} disabled={option.disabled} selected={option.selected}>{ option.label }</option>) }
      </Form.Select>
      { (isTouched && !!errorMessage) && <Form.Control.Feedback type="invalid">{ errorMessage }</Form.Control.Feedback> }
      { props.description && <Form.Text id={uniqueHelpBlockId} muted>{ props.description }</Form.Text> } 
    </div>
  )
}

export default BaseSelect;