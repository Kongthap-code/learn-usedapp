const url = import.meta.env.VITE_BACKEND

async function getAllToken(uri: any) {
    return await fetch(uri, { method: "GET" }).then((res) => res.json());
};

async function getToken(tokenId: string | undefined) {
    return await fetch(url+tokenId, { method: "GET" }).then((res) => res.json());
};

export {
    getAllToken,
    getToken
}