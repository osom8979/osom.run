import 'server-only';
import {uuid} from '@/app/libs/crypto/uuid';
import {createRedisClient} from '@/app/libs/redis';

export const DEFAULT_TIMEOUT_SECONDS = 8;

export const mqPaths = {
  osomApiQueueCommon: '/osom/api/queue/common',
  osomApiResponse: '/osom/api/response',
  osomApiResponseMessage: (id: string) => `${mqPaths.osomApiResponse}/${id}`,
};

export const WorkerApiValues = ['/progress/create'] as const;
export type WorkerApis = (typeof WorkerApiValues)[number];

export interface WorkerRequest {
  api: WorkerApis;
  msg: string;
  data?: any;
}

export async function progressCreate(timeout = DEFAULT_TIMEOUT_SECONDS) {
  const messageId = uuid();
  const redis = await createRedisClient();
  const request = {api: '/progress/create', msg: messageId} as WorkerRequest;
  await redis.lPush(mqPaths.osomApiQueueCommon, JSON.stringify(request));
  const result = await redis.brPop(mqPaths.osomApiResponseMessage(messageId), timeout);

  if (result === null) {
    return {data: null, error: 'Result response failed'};
  } else {
    return {data: {id: JSON.parse(result.element).id}, error: null};
  }
}
