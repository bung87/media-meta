/*
 * @author rosso
 * @date 2020/07/21 13:40
 */
import { ffprobe } from 'fluent-ffmpeg';
import { promisify } from 'util';

export async function getMetaData(path: string): Promise<any> {
  // @ts-ignore
  return promisify(ffprobe)(path);
}
