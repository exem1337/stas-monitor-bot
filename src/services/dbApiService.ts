import api from '../http';

export class DBApi {
  public static async getAllDbs(telegramId: string) {
    return await api.post('/monitoring/fullHostsDbList/592957413')
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }
}