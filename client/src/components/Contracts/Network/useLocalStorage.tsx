import { useEffect, useState } from "react"

export function useLocalStorage(key: string) {
    function setItem(key: string, value: any) {
        if (value === undefined) {
            window.localStorage.removeItem(key)
        } else {
            const toStore = JSON.stringify(value)
            window.localStorage.setItem(key, toStore)
            return JSON.parse(toStore)
        }
    }

    function getItem(key: string) {
        if (typeof window === 'undefined') {
            return null
        }

        const item = window.localStorage.getItem(key)
        if (item !== null) {
            try {
                return JSON.parse(item)
            } catch {
                // ignore error
            }
        }
    }

    const [value, setValue] = useState(() => getItem(key))

    useEffect(() => {
        setValue(getItem(key))
    }, [key])

    useEffect(() => {
        setItem(key, value)
    }, [value])

    return [value, setValue, () => getItem(key)] as const
}