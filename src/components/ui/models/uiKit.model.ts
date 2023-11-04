import { VALIDATION_OUTPUT } from "../validators/constants/validatorFnType.const";

export type TValidationType = Array<VALIDATION_OUTPUT> | VALIDATION_OUTPUT;
export type TValidationForm<T> = [boolean, T, (key: string, value: unknown) => void];

export interface IBaseInputValue {
  value: string | number;
  valid?: boolean;
}

export interface IBaseInputProps {
  onChange?: (value: IBaseInputValue) => void | Promise<void>;
  disabled?: boolean;
  value?: string | number;
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

export interface IBaseSelectProps<T> extends IBaseInputProps {
  options?: Array<IBaseSelectOption<T>>;
}

export interface IBaseSelectOption<T> {
  label: string;
  value: string | T | number | readonly string[];
  disabled?: boolean;
  selected?: boolean;
}

export interface IBaseModalProps {
  onHide?: (...args: Array<unknown>) => unknown | Promise<unknown>;
  children?: any;
  show?: boolean;
}

