import Vibrant from "node-vibrant";
import camelCase from "lodash.camelcase";
import invoke from 'lodash.invoke';

export type VibrantColors = {
  vibrant?: string;
  muted?: string;
  darkVibrant?: string;
  darkMuted?: string;
  lightVibrant?: string;
  lightMuted?: string;
  [name: string]: string | undefined;
};

export async function getPalette(src: string,type : string) {
  const palette = await Vibrant.from(src).getPalette();

  const setPaletteColor = (acc : any, paletteName : any) => ({
    ...acc,
    [camelCase(paletteName)]: invoke(palette, [paletteName, type])
  });

  return Object.keys(palette).reduce<VibrantColors>(setPaletteColor, {});
}