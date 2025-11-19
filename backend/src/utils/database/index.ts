import sql from 'mssql';
import { dbInstance } from '@/instances/database';
import { logger } from '@/utils/logger';

export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

export async function dbRequest(
  routine: string,
  parameters: Record<string, any> = {},
  expectedReturn: ExpectedReturn = ExpectedReturn.Single,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  try {
    const pool = transaction ? transaction : await dbInstance.getPool();
    const request = pool.request();

    // Add parameters to request
    Object.entries(parameters).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.execute(routine);

    if (expectedReturn === ExpectedReturn.None) {
      return null;
    }

    if (expectedReturn === ExpectedReturn.Single) {
      return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
    }

    if (expectedReturn === ExpectedReturn.Multi) {
      if (resultSetNames && resultSetNames.length > 0) {
        const mappedResults: Record<string, any[]> = {};
        result.recordsets.forEach((set, index) => {
          const name = resultSetNames[index] || `result${index}`;
          mappedResults[name] = set;
        });
        return mappedResults;
      }
      return result.recordsets;
    }

    return result.recordset;
  } catch (error: any) {
    logger.error(`Database request failed: ${routine}`, { error: error.message, parameters });
    throw error;
  }
}
