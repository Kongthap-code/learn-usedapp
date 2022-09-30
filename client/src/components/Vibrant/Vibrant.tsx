import React, { ReactNode } from "react";
import { VibrantState, useVibrant } from "./useVibrant";

export type PaletteProps = {
    src: string;
    type: string;
    children(palette: VibrantState): ReactNode;
  };

export const Vibrant: React.FC<PaletteProps> = ({
        src,
        type,
        children
      }: PaletteProps) => {
        const palette = useVibrant(src,type);

    return <>{children(palette)}</>;
}