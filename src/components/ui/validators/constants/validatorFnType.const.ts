import { EValidationTexts } from "../../enums/validationTexts.enum";

export type VALIDATION_OUTPUT = (value?: string | number) => string | EValidationTexts;