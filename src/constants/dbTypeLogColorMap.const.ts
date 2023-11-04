import {EnTypeLogEnum} from "../components/ui/enums/enTypeLog.enum";

export const DB_TYPE_LOG_COLOR_MAP = new Map<EnTypeLogEnum, string>([
   [EnTypeLogEnum.Error, 'red'],
   [EnTypeLogEnum.Warning, 'yellow'],
   [EnTypeLogEnum.Info, 'green']
])