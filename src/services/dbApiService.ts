import api from '../http';

export class DBApi {
  public static async getAllDbs() {
    return await api.get('/monitoring/dbList/234623')
  }
}