import { Alert } from "react-bootstrap"

interface IBaseAlert {
  text: string;
  onClose?: () => void;
}

const BaseAlert = (props: IBaseAlert) => {
  return (
    <Alert 
      variant="danger"
      onClose={props.onClose}
      dismissible={!!props.onClose}
    >
      { props.text }
    </Alert>
  )
}

export default BaseAlert;