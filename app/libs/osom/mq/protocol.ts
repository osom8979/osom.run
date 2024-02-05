import 'server-only';
import {uuid} from '@/app/libs/crypto/uuid';
import {createRedisClient} from '@/app/libs/redis';

export const DEFAULT_TIMEOUT_SECONDS = 8;

export const mqPaths = {
  osomApiQueueCommon: '/osom/api/queue/common',
  osomApiResponse: '/osom/api/queue/response',
  osomApiResponseMessage: (id: string) => `${mqPaths.osomApiResponse}/${id}`,
};

export const WorkerApiValues = ['/progress/create'] as const;
export type WorkerApis = (typeof WorkerApiValues)[number];

export interface WorkerRequest {
  api: WorkerApis;
  id: string;
}

export type CreateProgressResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: {
        uuid: string;
      };
    };

export async function createProgress(timeout = DEFAULT_TIMEOUT_SECONDS) {
  const id = uuid();
  const redis = await createRedisClient();
  const request = {api: '/progress/create', id} as WorkerRequest;
  await redis.lPush(mqPaths.osomApiQueueCommon, JSON.stringify(request));
  const result = await redis.brPop(mqPaths.osomApiResponseMessage(id), timeout);
  if (result === null) {
    return {error: 'Timeout Error', data: null};
  }
  return JSON.parse(result.element) as CreateProgressResponse;
}
