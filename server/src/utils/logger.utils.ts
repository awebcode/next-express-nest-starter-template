// src/utils/logger-util.ts

import { loggerInstance } from 'src/config/logger.config'; // Import your Winston logger

interface LogErrorParams {
  message: string;
  code?: string;
  status?: number;
  url?: string;
}

export function logError({ message, code = 'UNKNOWN_ERROR', status = 500, url = '' }: LogErrorParams): void {
  loggerInstance.warn({
    message: message.includes('create()') ? 'Prisma data creation or network errors' : message,
    code,
    status,
    url,
  });
}

export function logInfo({ message, code = 'UNKNOWN_INFO', status = 200, url = '' }: LogErrorParams): void {
  loggerInstance.info({
    message,
    code,
    status,
    url,
  });
}