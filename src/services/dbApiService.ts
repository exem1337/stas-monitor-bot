import api from '../http';

export class DBApi {
  public static async getAllDbs() {
    return api.get('/monitoring/dbList')
  }
}