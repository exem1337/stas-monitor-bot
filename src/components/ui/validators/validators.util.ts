import { EValidationTexts } from "../enums/validationTexts.enum";
import { TValidationType } from "../models/uiKit.model";
import { VALIDATION_OUTPUT } from "./constants/validatorFnType.const";

export class Validators {
  public static validateInput(validator: TValidationType, value?: string): string {
    return Array.isArray(validator) 
      ? validator?.find((validatorItem) => validatorItem(value))?.(value) 
      : validator(value) 
  }

  public static required(message = EValidationTexts.Required): VALIDATION_OUTPUT {
    return (value?: string) => (value != null && Boolean(String(value).trim())) ? '' : message;
  }

  public static minLength(min: number, message = EValidationTexts.MinLength): VALIDATION_OUTPUT {
    return (value?: string) => (!value || !value?.length || value.length < min) ? message + min : '';
  }

  public static maxLength(max: number, message = EValidationTexts.MaxLength): VALIDATION_OUTPUT {
    return (value?: string) => (!value || !value?.length || value.length > max) ? message + max : '';
  }

  public static onlyNumbers(message = EValidationTexts.OnlyNumbers): VALIDATION_OUTPUT {
    return (value?: string) => (!value || isNaN(Number(value))) ? message : '';
  }
}