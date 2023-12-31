import { EDBStatuses } from "../enums/dbStatuses.enum";
import { EnTypeLogEnum } from "../components/ui/enums/enTypeLog.enum";

export interface IDatabaseHost {
  host: string;
  databases: Array<IDatabase>;
  status: EnTypeLogEnum;
  connection: IDatabaseConnection;
}

export interface ISelectedHost {
  name: string;
  status: EnTypeLogEnum;
  connectionId: number;
  closeDrawerFn?: () => void;
  host?: string;
}

export interface IDatabaseConnection {
  id: number;
  name: string;
}

export interface IDatabaseClient {
  application_name: string;
  backend_start: string;
  backend_xid: string;
  backend_xmin: string;
  client_addr: string;
  db_name: string;
  pid: number;
  query: string;
  query_start: number;
  role_name: string;
  state: number;
  state_change: number;
  wait_event: string
  wait_event_type: string;
  xact_start: number;
}

export interface IDatabase {
  backends: Array<IDatabaseClient>;
  active_time: number;
  age_datfrozenxid: number;
  blk_read_time: number;
  blk_write_time: number
  blks_hit: number
  blks_read: number
  conflicts: number
  datconnlimit: number
  datdba: number
  dattablespace: number;
  deadlocks: number;
  name: string;
  numbackends: number;
  oid: number;
  session_time: number;
  sessions: number;
  sessions_abandoned: number;
  size: number;
  state: EDBStatuses;
  stats_reset: number;
  temp_bytes: number;
  temp_files: number;
  tup_deleted: number;
  tup_fetched: number;
  tup_inserted: number;
  tup_returned: number;
  tup_updated: number;
  xact_commit: number;
  xact_rollback: number;
  tablespace: IDbTableSpace;
  charts: IDbCharts;
  hostLogs: Array<IDbHostLog>;
}

export interface IDbHostLog {
  date: string;
  host: string;
  id: number;
  message: string;
  type: EnTypeLogEnum;
}

export interface IDbCharts {
  sessions: Array<IChartValue>
  trans_idle: Array<IChartValue>;
}

export interface IChartValue {
  value: number;
  date: string;
}

export interface IDbTableSpace {
  disk_total: number;
  disk_used: number;
  inodes_total: number;
  inodes_used: number;
  location: string;
  name: string;
  oid: number;
  owner: string;
  size: number;
}

export interface ICreateConnection {
  telegram_id?: number;
  host: string;
  name?: string;
  port: string;
  username: string;
  password: string;
}