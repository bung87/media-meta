/*
 * @author rosso
 * @date 2020/07/21 13:40
*/

import { getAudioMetaData, getVideoMetaData, getScreenshot, getFontMetaData } from '../src';
import path from 'path'
async function main() {
  const path1 = path.join(__dirname, 'example/', 'file_example_MP3_1MG.mp3');
  const path2 = path.join(__dirname, 'example/', 'big_buck_bunny_240p_1mb.mp4');
  const path3 = path.join(__dirname, 'example/', 'OpenSans-Regular.ttf');
  return Promise.all([
    getAudioMetaData(path1),
    getVideoMetaData(path2),
    getScreenshot({ path: path2 }),
    getFontMetaData(path3)
  ]);
}

main().then(console.log).catch(console.error);