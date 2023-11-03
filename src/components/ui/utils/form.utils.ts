import { IBaseInputValue } from "../models/uiKit.model";

export class FormUtils {
  public static setFormValueByKey<T>(form: T, key: string, value: unknown): object {
    return {
      ...form,
      [key]: value,
    }
  }

  public static isFormValid<T>(form: T): boolean {
    return Object.keys(form).every((key) => (form[key] as IBaseInputValue).valid);
  }
}