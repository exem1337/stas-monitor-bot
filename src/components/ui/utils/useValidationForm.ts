import { useState } from "react";
import { IBaseInputValue, TValidationForm } from "../models/uiKit.model";
import { FormUtils } from "./form.utils";

export function useValidationForm<T>(inputForm: T): TValidationForm<T> {
  const [form, setForm] = useState<T>(inputForm);
  const [isValid, setIsValid] = useState(true);
  const [internalForm, setInternalForm] = useState(inputForm)

  function setValue(key: string, value: IBaseInputValue): void {
    internalForm[key] = value;
    const isValid = FormUtils.isFormValid(internalForm);
    const newForm = FormUtils.setFormValueByKey(form, key, value.value) as T;
    Object.keys(newForm)?.forEach((key) => {
      newForm[key] = newForm[key]?.value || newForm[key]
    })
    setForm(newForm);
    setIsValid(isValid);
  }

  return [isValid, form, setValue];
}