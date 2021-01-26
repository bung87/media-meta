/*
 * @author rosso
 * @date 2020/07/21 13:40
 */

import ffmpeg, { ffprobe } from 'fluent-ffmpeg';
import { promisify } from 'util';
import { v1 as uuidV1 } from 'uuid';
import path from 'path';

const ffprobeAsync = promisify(ffprobe);

/**
 *
 * @param params .size: '320x320'
 */
export async function getScreenshot(params: {
  inputPath: string;
  outDir?: string;
  size?: string;
  fileName?: string;
}): Promise<string> {
  const ret = new Promise<string>((resove, reject) => {
    if (!params.fileName) {
      params.fileName = uuidV1() + '.png';
    }
    if (!params.size) {
      params.size = '320x320';
    }
    if (!params.outDir) {
      params.outDir = '.';
    }
    const proc = ffmpeg(params.inputPath);
    proc
      .takeScreenshots(
        {
          count: 1,
          filename: params.fileName,
          size: params.size,
          timemarks: ['2'],
        },
        params.outDir
      )
      .on('end', () => {
        const retPath = path.join(params.outDir, params.fileName);
        resove(retPath);
      })
      .on('error', err => {
        reject(err);
      });
  });
  return ret;
}

export async function getMetaData(path: string): Promise<any> {
  // @ts-ignore
  return ffprobeAsync(path);
}
