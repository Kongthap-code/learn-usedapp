import React, { useReducer } from "react";
import { getPalette, VibrantColors } from "./getVibrant";

export type VibrantState = {
    loading: boolean;
    error?: Error;
    data: VibrantColors;
};

const initialState: VibrantState = {
    loading: true,
    data: {},
    error: undefined,
};

function reducer(state: VibrantState, action: any): VibrantState {
    try {
        switch (action.type) {
            case "resolvePalette":
                return { ...state, data: action.payload, loading: false };
            case "rejectPalette":
                return { ...state, error: action.payload, loading: false };
        }
    } catch (err) {
        throw (err)
    }
}

export function useVibrant(src: string,type: string) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    React.useEffect(() => {
        getPalette(src,type)
            .then((palette) => {
                dispatch({ type: "resolvePalette", payload: palette });
            })
            .catch((ex) => {
                dispatch({ type: "rejectPalette", payload: ex });
            });
    }, [src]);

    return state;
}