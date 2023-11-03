import api from '../http';

export class DBApi {
  public static async getAllDbs(telegramId: string) {
    return await api.get('https://jsonplaceholder.typicode.com/posts')
  }

  public static async createConnection(connection) {
    return await api.post('/connections', connection);
  }
}