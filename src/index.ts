/*
 * @author rosso
 */

import { getMetaData as audioMetaData } from './audio';
import { getMetaData as fontMetaData } from './font';
import { getMetaData as videoMetaData, getScreenshot } from './video';

interface IMediaType {
  formatName: string;
  startTime: number;
  duration: number;
  size: number;
  path: string;
  bitRate: number;
}

export async function getAudioMetaData(path: string): Promise<IMediaType> {
  try {
    const audioMeta = await Promise.all([audioMetaData(path)]);
    const ad = audioMeta[0].format;
    const ret = {
      bitRate: ad.bit_rate,
      duration: ad.duration,
      formatName: ad.format_name,
      path: ad.filename,
      size: ad.size,
      startTime: ad.start_time,
    };
    return ret;
  } catch (error) {
    throw error;
  }
}

export async function getVideoMetaData(path: string): Promise<IMediaType> {
  try {
    const videoMeta = await Promise.all([videoMetaData(path)]);
    const vd = videoMeta[0].format;
    const ret = {
      bitRate: vd.bit_rate,
      duration: vd.duration,
      formatName: vd.format_name,
      path: vd.filename,
      size: vd.size,
      startTime: vd.start_time,
    };
    return ret;
  } catch (error) {
    throw error;
  }
}

export async function getVideoScreenshot(params: {
  path: string;
  savePath?: string;
  size?: string;
  fileName?: string;
}): Promise<string> {
  try {
    const shotPath = await Promise.all([getScreenshot(params)]);
    const shot = shotPath[0];
    return shot;
  } catch (error) {
    throw error;
  }
}

export async function getFontMetaData(path: string): Promise<unknown[]> {
  try {
    const fontMeta = await fontMetaData(path);
    const ret = Object.values(fontMeta.tables.name);
    return ret;
  } catch (error) {
    throw error;
  }
}
