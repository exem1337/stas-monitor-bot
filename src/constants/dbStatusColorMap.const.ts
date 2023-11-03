import { EDBStatuses } from "../enums/dbStatuses.enum";

export const DB_STATUS_COLOR_MAP = new Map<EDBStatuses, string>([
  [EDBStatuses.Error, 'red'],
  [EDBStatuses.Offline, 'grey'],
  [EDBStatuses.Online, 'green']
])