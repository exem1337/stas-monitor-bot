import { useState } from "react";
import { IBaseInputValue, TValidationForm } from "../models/uiKit.model";
import { FormUtils } from "./form.utils";

export function useValidationForm<T>(inputForm: T): TValidationForm<T> {
  const [form, setForm] = useState<T>(inputForm);
  const [isValid, setIsValid] = useState(true);
  const [internalForm, setInternalForm] = useState(inputForm)

  function setValue(key: string, value: IBaseInputValue): void {
    setInternalForm(FormUtils.setFormValueByKey(internalForm, key, value) as T);
    setForm(FormUtils.setFormValueByKey(form, key, value.value) as T);
    setIsValid(FormUtils.isFormValid(internalForm));
  }

  return [isValid, form, setValue];
}