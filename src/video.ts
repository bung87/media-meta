/*
 * @author rosso
 * @date 2020/07/21 13:40
*/

import ffmpeg, { ffprobe } from 'fluent-ffmpeg';
import { v1 as uuidV1 } from 'uuid';
import { promisify } from 'util'

export async function getScreenshot(params: {
  path: string,
  savePath?: string,
  size?: string,
  fileName?: string,
}): Promise<string> {
  if (!params.fileName) {
    params.fileName = uuidV1() + '.png';
  }
  if (!params.size) {
    params.size = '320x320';
  }
  if (!params.savePath) {
    params.savePath = '.';
  }
  const proc = ffmpeg(params.path);
  proc.takeScreenshots({
    count: 1,
    size: params.size,
    filename: params.fileName,
    timemarks: ['2']
  }, params.savePath);
  const retPath = params.savePath + '/' + params.fileName;
  return retPath;
};


export async function getMetaData(path: string): Promise<any> {
  // @ts-ignore
  return promisify(ffprobe)(path)
}