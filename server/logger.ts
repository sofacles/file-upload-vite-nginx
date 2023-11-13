import winston from "winston";

const Logger = winston.createLogger({
  level: "info",
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default Logger;
