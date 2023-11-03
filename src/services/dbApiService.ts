import api from '../http';

export class DBApi {
  public static async getAllDbs(telegramId: string) {
    return await api.get(`https://176a-95-71-189-217.ngrok-free.app/api/monitoring/fullHostsDbList/592957413`)
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }
}