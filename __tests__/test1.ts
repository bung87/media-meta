/*
 * @author rosso
 * @date 2020/07/21 13:40
 */

import {
  getAudioMetaData,
  getVideoMetaData,
  getVideoScreenshot,
  getFontMetaData,
} from '../src/index';
import path from 'path';
import fs from 'fs';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';

async function main() {
  const path1 = path.join(__dirname, 'example/', 'file_example_MP3_1MG.mp3');
  const path2 = path.join(__dirname, 'example/', 'big_buck_bunny_240p_1mb.mp4');
  const path3 = path.join(__dirname, 'example/', 'OpenSans-Regular.ttf');
  console.log(ffprobePath, ffmpegPath);
  const a = await getAudioMetaData(path1, true, ffprobePath);
  const b = await getVideoMetaData(path2, true, ffprobePath);
  const c = await getVideoScreenshot({ inputPath: path2, binPath: ffmpegPath });
  const d = await getFontMetaData(path3);
  expect(fs.existsSync(path.resolve(c))).toEqual(true);
  fs.unlinkSync(c);
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  return 1;
}
test('main', async () => {
  await main();
});
