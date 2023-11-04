import { FloatingLabel, Form } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { IBaseTextInputProps } from "../models/uiKit.model";
import { EValidationTexts } from "../enums/validationTexts.enum";
import './BaseInput.scss'
import { Validators } from "../validators/validators.util";

const BaseInput = (props: IBaseTextInputProps) => {
  const uniqueId = `input${Math.random()}`;
  const uniqueHelpBlockId = `helpBlock${Math.random()}`;

  const [text, setText] = useState(props.value || props.initialValue || '');
  const [errorMessage, setErrorMessage] = useState<EValidationTexts | string>('');
  const [isTouched, setIsTouched] = useState(false);

  const onChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setText(value);
  }

  useEffect(() => {
    updateValid(text)
  }, [text])

  useEffect(() => {
    updateValid(text, false)
  }, [])

  useEffect(() => {
    if (props.initialValue) {
      setText(props.initialValue)
      updateValid(props.initialValue, false);
    }
  }, [props.initialValue])

  const updateValid = (text: string | number, setTouched = true): void => {
    setIsTouched(setTouched);

    const validationError = validate(text);
    setErrorMessage(validationError)

    if (!props.onChange) {
      return;
    }

    props.onChange({ value: text, valid: !validationError });
  }

  const validate = (value?: string | number) => {
    if (props.validation) {
      return Validators.validateInput(props.validation, value);
    }
    
    return '';
  }

  if (props.label) {
    return (
      <div className={"base-input"}>
        <FloatingLabel
          controlId={uniqueId}
          label={props.label}
        >
          <Form.Control
            type={props.type || 'text'}
            value={text}
            disabled={props.disabled}
            aria-describedby={uniqueHelpBlockId}
            onChange={onChange}
            onBlur={() => updateValid(text)}
          />
        </FloatingLabel>
       
        { (isTouched && errorMessage) && <Form.Control.Feedback type="invalid">{ errorMessage }</Form.Control.Feedback> }
        { props.description && <Form.Text id={uniqueHelpBlockId} muted>{ props.description }</Form.Text> } 
      </div>
    )
  }
  
  return (
    <div className={"base-input"}>
      <Form.Control
        type={props.type || 'text'}
        id={uniqueId} 
        value={props.value}
        disabled={props.disabled}
        onChange={onChange}
        onBlur={() => updateValid(text)}
        aria-describedby={uniqueHelpBlockId}
      />
      { (isTouched && errorMessage) && <Form.Control.Feedback type="invalid">{ errorMessage }</Form.Control.Feedback> }
      { props.description && <Form.Text id={uniqueHelpBlockId} muted>{ props.description }</Form.Text> } 
    </div>
  )
} 

export default BaseInput;