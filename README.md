# media-meta [![Build Status](https://travis-ci.org/[object Object]/.svg?branch=master)](https://travis-ci.org/[object Object]/) [![Npm Version](https://badgen.net/npm/v/media-meta)](https://www.npmjs.com/package/media-meta) ![npm: total downloads](https://badgen.net/npm/dt/media-meta) ![Types](https://badgen.net/npm/types/media-meta) ![Dep](https://badgen.net/david/dep/[object Object]/) ![license](https://badgen.net/npm/license/media-meta)  

## Installation

`yarn add media-meta`  

or  

`npm i --save media-meta`  


```ts
import { getAudioMetaData, getVideoMetaData, getScreenshot, getFontMetaData } from '../src';

const path1 = path.join(__dirname, 'example/', 'file_example_MP3_1MG.mp3');
const path2 = path.join(__dirname, 'example/', 'big_buck_bunny_240p_1mb.mp4');
const path3 = path.join(__dirname, 'example/', 'OpenSans-Regular.ttf');

const a = await getAudioMetaData(path1);
const b = await getVideoMetaData(path2);
const c = await getVideoScreenshot({ path: path2 });
const d = await getFontMetaData(path3);

```
