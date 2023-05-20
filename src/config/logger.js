const winston = require('winston');
const config = require('./envConfig');

const enumerateErrorFormat = winston.format((info) => {
  if (config.env !== 'development') {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
  }
  return info;
});

const logFile = () => {
  if (config.env !== 'development') {
    return new winston.transports.File({ filename: './log/debug.log' });
  }
  return new winston.transports.Console({
    stderrLevels: ['error'],
  });
};

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [logFile()],
});

module.exports = logger;
