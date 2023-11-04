import { AxiosResponse } from 'axios';
import api from '../http';
import { ICreateConnection, IDatabase, IDatabaseHost } from '../models/db.model';

export class DBApi {
  public static async getAllDbs(telegramId: string): Promise<Array<IDatabaseHost>> {
    const res = await api.post(`/monitoring/fullHostsDbList/857600265`);
    return res.data;
  }

  public static async createConnection(connection: ICreateConnection): Promise<void> {
    return await api.post('/connections', connection);
  }

  public static async editConnection(connectionId: number, connection: ICreateConnection): Promise<void> {
    return await api.patch(`/connections/${connectionId}`, connection);
  }

  public static async getConnection(connectionId: number): Promise<AxiosResponse<ICreateConnection>> {
    return await api.post(`/connections/${connectionId}`);
  }

  public static async getDb(telegramId: string, id: number): Promise<IDatabase> {
    const res = await api.post(`/monitoring/databaseReport/${telegramId}?oid=${id}`);
    return res.data;
  }

  public static async reloadDb(telegramId: string, host: string): Promise<void> {
    return await api.post(`/monitoring/database/${telegramId}`, {
      host
    })
  }

  public static async renameConnection(connectionId: number, name: string): Promise<void> {
    return await api.patch(`/connections/${connectionId}`, {
      name
    });
  }

  public static async deleteConnection(connectionId: number): Promise<void> {
    return await api.delete(`/connections/${connectionId}`);
  }

  public static async executeSql(telegramId: number, host: string, command: string): Promise<void> {
    return await api.post(`/monitoring/commands/${telegramId}`, {
      host,
      command
    })
  }
}