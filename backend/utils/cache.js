import { redis } from "../config/redis.js";

export const getCache = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = (key, value) => {
  redis.set(key, JSON.stringify(value), { EX: 60 });
};

export const deleteCache = (key) => redis.del(key);
