import React from 'react'
import { createSlot } from 'react-slotify';
import { IBaseActionButtonProps } from '../models/uiKit.model';
import './BaseActionButton.scss';

export const BaseActionButtonSlot = createSlot();

const BaseActionButton = ({ handler, text, children, disabled, className }: IBaseActionButtonProps) => {
  return (
    <div 
      className={disabled ? `base-action-button disabled ${className}` : `base-action-button ${className}`}
      onClick={() => (handler && !disabled) && handler()}
    >
      <BaseActionButtonSlot.Renderer childs={children} />
      { text }
    </div>
  )
} 

export default BaseActionButton;