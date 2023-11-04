import api from '../http';
import { IDatabase, IDatabaseHost } from '../models/db.model';

export class DBApi {
  public static async getAllDbs(telegramId: string): Promise<Array<IDatabaseHost>> {
    const res = await api.post(`/monitoring/fullHostsDbList/857600265`);
    return res.data;
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }

  public static async getDb(telegramId: string, id: number): Promise<IDatabase> {
    const res = await api.post(`/monitoring/databaseReport/${telegramId}?oid=${id}`);
    return res.data;
  }

  public static async reloadDb(telegramId: string, host: string) {
    return await api.post(`/monitoring/database/${telegramId}`, {
      host
    })
  }

  public static async changeCredentials() {
    console.log('change')
  }
}