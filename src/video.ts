/*
 * @author rosso
 * @date 2020/07/21 13:40
 */

import ffmpeg from 'fluent-ffmpeg';
import { v1 as uuidV1 } from 'uuid';
import path from 'path';

/**
 *
 * @param params .size: '320x320'
 * @param binPath ffmpeg bin path
 */
export async function getScreenshot(params: {
  inputPath: string;
  outDir?: string;
  size?: string;
  fileName?: string;
  binPath?: string;
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
    if (params.binPath) {
      ffmpeg.setFfmpegPath(params.binPath);
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
