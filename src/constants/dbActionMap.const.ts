import { EFixProblemHandlers } from "../components/ui/enums/fixProblemHandlers.enum";
import { DBApi } from "../services/dbApiService";

export const DB_ACTIONS_MAP = new Map<EFixProblemHandlers, (...args: Array<unknown>) => Promise<unknown>>([
  [EFixProblemHandlers.Reload, DBApi.reloadDb],
  [EFixProblemHandlers.ChangeCredentials, DBApi.changeCredentials],
])