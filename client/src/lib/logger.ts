type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  context?: string; // e.g., "AuthContext", "DashboardPage"
  payload?: any;    // Additional data to log
}

const log = (level: LogLevel, message: string, options?: LogOptions) => {
  const timestamp = new Date().toISOString();
  const prefix = `[KittyPau - ${level.toUpperCase()}] ${timestamp}`;
  const context = options?.context ? `(${options.context}) ` : '';

  const fullMessage = `${prefix} ${context}${message}`;

  switch (level) {
    case 'info':
      console.log(fullMessage, options?.payload);
      break;
    case 'warn':
      console.warn(fullMessage, options?.payload);
      break;
    case 'error':
      console.error(fullMessage, options?.payload);
      // In a real application, you would send this to Sentry/Bugsnag
      break;
    case 'debug':
      if (import.meta.env.MODE === 'development') { // Only log debug in development
        console.debug(fullMessage, options?.payload);
      }
      break;
    default:
      console.log(fullMessage, options?.payload);
  }
};

export const logger = {
  info: (message: string, options?: LogOptions) => log('info', message, options),
  warn: (message: string, options?: LogOptions) => log('warn', message, options),
  error: (message: string, options?: LogOptions) => log('error', message, options),
  debug: (message: string, options?: LogOptions) => log('debug', message, options),
};
