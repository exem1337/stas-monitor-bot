import React, {useState} from 'react';
import {AiOutlineReload} from 'react-icons/ai';

interface IReloadButtonProps {
  isLoading: boolean;
  handler: () => void | Promise<void>;
}

const ReloadButton = (props: IReloadButtonProps) => {
  const onClick = () => {
    if (props.isLoading || !props.handler) {
      return;
    }
    props.handler();
  }

  return (
    <div>
      <AiOutlineReload
        onClick={onClick}
        className={`reload-button ${props.isLoading && 'active'}`}
      />
    </div>

  )
}

export default React.memo(ReloadButton);