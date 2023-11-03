import { VALIDATION_OUTPUT } from "../validators/constants/validatorFnType.const";

export type TValidationType = Array<VALIDATION_OUTPUT> | VALIDATION_OUTPUT;
export type TValidationForm<T> = [boolean, T, (key: string, value: unknown) => void];

export interface IBaseInputValue {
  value: string;
  valid?: boolean;
}

export interface IBaseInputProps {
  onChange?: (value: IBaseInputValue) => void | Promise<void>;
  disabled?: boolean;
  value?: string;
  description?: string;
  placeholder?: string;
  validation?: TValidationType;
}

export interface IBaseTextInputProps extends IBaseInputProps {
  type?: 'text' | 'password' | 'email';
  label?: string;
}

export interface IBaseActionButtonProps {
  handler?: () => any;
  text: string;
  children: any;
  disabled?: boolean;
  className?: string;
}

export interface IBaseButtonProps {
  text: string;
  onClick?: (...args: any) => any | Promise<any>;
  disabled?: boolean;
  className?: string;
  children?: any;
  loading?: boolean;
}

export interface IBaseSelectProps extends IBaseInputProps {
  options?: Array<IBaseSelectOption>;
}

export interface IBaseSelectOption {
  label: string;
  value: string | number | readonly string[];
}

export interface IBaseModalProps {
  onHide?: (...args: Array<unknown>) => unknown | Promise<unknown>;
  children?: any;
  show?: boolean;
}
