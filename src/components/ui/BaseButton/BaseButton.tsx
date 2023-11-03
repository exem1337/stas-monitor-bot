import React, { useEffect, useState } from 'react'
import { Button, Spinner } from "react-bootstrap";
import './BaseButton.scss'
import { IBaseButtonProps } from '../models/uiKit.model';

const BaseButton = (props: IBaseButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(props.loading);
  }, [props.loading])

  return (
    <Button
      className={`base-button ${isLoading && 'loading'} ${props.className && props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <div className={`base-button--loader ${isLoading && 'show'}`}>
        <Spinner size="sm" animation="border" role="status" />
      </div> 
      <div className="base-button--content">
        { props.text }
        { props.children }
      </div>
    </Button>
  )
}

export default BaseButton;