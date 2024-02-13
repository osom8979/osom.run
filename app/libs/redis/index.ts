import 'server-only';

import {createClient} from 'redis';

export async function createRedisServerSideClient() {
  const client = createClient({url: process.env['REDIS_URL']});
  client.on('error', error => console.error('Redis Client Error', {error}));
  await client.connect();
  return client;
}
