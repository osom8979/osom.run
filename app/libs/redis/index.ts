import 'server-only';
import {createClient} from 'redis';

export async function testRedisCount() {
  console.debug('Redis URL', process.env.REDIS_URL);
  const client = createClient({
    url: process.env.REDIS_URL,
  });
  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();
  const value = await client.get('count');
  console.debug('Redis current count', value);
}
