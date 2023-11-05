import { useState } from "react";
import { IBaseInputValue, TValidationForm } from "../models/uiKit.model";
import { FormUtils } from "./form.utils";

export function useValidationForm<T>(inputForm: T): TValidationForm<T> {
  const [form, setForm] = useState<T>(inputForm);
  const [isValid, setIsValid] = useState(true);
  const [internalForm, setInternalForm] = useState(inputForm)

  function setValue(key: string, value: IBaseInputValue): void {
    internalForm[key] = value;
    form[key] = value.value;
    setIsValid(FormUtils.isFormValid(internalForm));
  }

  return [isValid, form, setValue];
}