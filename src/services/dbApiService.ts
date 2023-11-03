import api from '../http';

export class DBApi {
  public static async getAllDbs(telegramId: number) {
    return await api.get(`/monitoring/fullHostsDbList/${telegramId}`)
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }
}