import { createClient } from 'redis';
import config from '../config';
import logger from './logger';

const redisClient = createClient({
  url: config.redis.url
});

redisClient.on('error', (error) => {
  logger.error(error);
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

const connect = async () => {
  await redisClient.connect();
};

export const redisClient = {
  connect
};

export default redisClient;
