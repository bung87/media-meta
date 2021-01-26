/*
 * @author rosso
 * @date 2020/07/21 13:40
 */
import ttfInfo from 'ttfinfo';
import { promisify } from 'util';

const ttfInfoAsync = promisify(ttfInfo);

interface fontMeta {
  copyright: string;
  fontFamily: string;
  fontSubFamily: string;
  id: string;
  fullName: string;
}
export async function getMetaData(fontPath: string): Promise<fontMeta> {
  const meta = await ttfInfoAsync(fontPath);
  const info = meta.tables.name;
  return {
    copyright: info['0'],
    fontFamily: info['1'],
    fontSubFamily: info['2'],
    id: info['3'],
    fullName: info['4'],
  };
}
