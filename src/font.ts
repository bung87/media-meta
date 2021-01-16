/*
 * @author rosso
 * @date 2020/07/21 13:40
*/
import ttfInfo from 'ttfinfo';
import { promisify } from 'util'

export function getMetaData(fontPath: string): any {
  return promisify(ttfInfo)(fontPath)

}
