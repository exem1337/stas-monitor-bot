import api from '../http';
import { IDatabase, IDatabaseHost } from '../models/db.model';

export class DBApi {
  public static async getAllDbs(telegramId: string): Promise<Array<IDatabaseHost>> {
    const res = await api.post('/monitoring/fullHostsDbList/592957413');
    return res.data;
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }

  public static async getDb(id: number): Promise<IDatabase> {
    const res = await api.post(`/monitoring/databaseReport/592957413?oid=${id}`);
    return res.data;
  }

  public static async reloadDb(telegramId: string, name: string) {
    return await api.post('/monitoring/database/592957413', {
      name: 'animefeet.servebeer.com'
    })
  }
}