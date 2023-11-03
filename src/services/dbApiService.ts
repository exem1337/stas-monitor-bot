import api from '../http';

export class DBApi {
  public static async getAllDbs(telegramId: string) {
    return await api.get(`/monitoring/fullHostsDbList/${telegramId?.replace('"', '')}`)
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }
}