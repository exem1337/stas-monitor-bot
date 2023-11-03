import { EDBStatuses } from "../enums/dbStatuses.enum";

export interface IDatabaseHost {
  host: string;
  databases: Array<IDatabase>;
}

export interface IDatabase {
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
}
