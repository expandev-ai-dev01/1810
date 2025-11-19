import sql from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: sql.ConnectionPool | null = null;
  private poolConnect: Promise<sql.ConnectionPool> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async getPool(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      try {
        this.pool = new sql.ConnectionPool(config.database);
        this.poolConnect = this.pool.connect();
        await this.poolConnect;
        logger.info('Database connected successfully');
      } catch (err) {
        logger.error('Database connection failed', { error: err });
        this.pool = null;
        this.poolConnect = null;
        throw err;
      }
    }
    return this.pool;
  }
}

export const dbInstance = DatabaseConnection.getInstance();
