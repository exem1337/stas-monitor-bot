import { EDBStatuses } from "../enums/dbStatuses.enum";

export const DB_STATUS_NAME_MAP = new Map<EDBStatuses, string>([
  [EDBStatuses.Error, 'Ошибка'],
  [EDBStatuses.Offline, 'Оффлайн'],
  [EDBStatuses.Online, 'Онлайн']
])