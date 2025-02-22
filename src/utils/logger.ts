const logger = {
  log: (message: string, data?: any) => console.log(`[LOG] [${new Date().toISOString()}] ${message}`, data || ''),
  warn: (message: string, data?: any) => console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, data || ''),
  error: (message: string, data?: any) => console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, data || ''),
};

export default logger;