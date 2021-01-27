/*
 * @author rosso
 */

import { getMetaData as audioMetaData } from './audio';
import { fontMeta, getMetaData as fontMetaData } from './font';
import { getMetaData as videoMetaData, getScreenshot } from './video';
import prettyb from 'prettybandwidth';
import filesize from 'filesize';
import humanizeDuration from 'humanize-duration';
import path from 'path';

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  spacer: '',
  round: true,
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

interface IMediaType {
  formatName: string;
  startTime: number;
  duration: number;
  size: number | string;
  path: string;
  bitRate: number | string;
}

export async function getAudioMetaData(
  filePath: string,
  humanReadable = true
): Promise<IMediaType> {
  try {
    const audioMeta = await audioMetaData(filePath);
    const ad = audioMeta.format;
    const ret = {
      bitRate: humanReadable
        ? prettyb(ad.bit_rate, { short: true })
        : ad.bit_rate,
      duration: humanReadable
        ? shortEnglishHumanizer(ad.duration * 1000)
        : ad.duration,
      formatName: ad.format_name,
      format: path.extname(filePath).substring(1),
      path: ad.filename,
      size: humanReadable ? filesize(ad.size, { spacer: '' }) : ad.size,
      startTime: ad.start_time,
    };
    return ret;
  } catch (error) {
    throw error;
  }
}

export async function getVideoMetaData(
  filePath: string,
  humanReadable = true
): Promise<IMediaType> {
  try {
    const videoMeta = await videoMetaData(filePath);
    const vd = videoMeta.format;
    const ret = {
      bitRate: humanReadable
        ? prettyb(vd.bit_rate, { short: true })
        : vd.bit_rate,
      duration: humanReadable
        ? shortEnglishHumanizer(vd.duration * 1000)
        : vd.duration,
      formatName: vd.format_name,
      format: path.extname(filePath).substring(1),
      path: vd.filename,
      size: humanReadable ? filesize(vd.size, { spacer: '' }) : vd.size,
      startTime: vd.start_time,
    };
    return ret;
  } catch (error) {
    throw error;
  }
}

export async function getVideoScreenshot(params: {
  inputPath: string;
  outDir?: string;
  size?: string;
  fileName?: string;
}): Promise<string> {
  try {
    const shotPath = await getScreenshot(params);
    return shotPath;
  } catch (error) {
    throw error;
  }
}

export async function getFontMetaData(filePath: string): Promise<fontMeta> {
  try {
    const fontMeta = await fontMetaData(filePath);
    return fontMeta;
  } catch (error) {
    throw error;
  }
}
