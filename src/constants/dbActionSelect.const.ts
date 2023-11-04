import { EFixProblemHandlers } from "../components/ui/enums/fixProblemHandlers.enum";
import { IBaseSelectOption } from "../components/ui/models/uiKit.model";

export const DB_ACTION_SELECT_OPTION: Array<IBaseSelectOption<EFixProblemHandlers>> = [
  {
    label: 'Выберите действие',
    value: '',
    disabled: true,
    selected: true,
  },
  {
    label: EFixProblemHandlers.Reload,
    value: EFixProblemHandlers.Reload
  },
  {
    label: EFixProblemHandlers.ChangeCredentials,
    value: EFixProblemHandlers.ChangeCredentials
  },
]