import { baseUrl, Infobyte } from "../stores";

export const getInfobyte = async (id: string): Promise<Infobyte> => {
    if (!id) return;

    const infobyte = fetch(`${baseUrl}infobyte/${id}`, { credentials: "include", })
        .then(data => data.json())
        .then(json => json as Infobyte);

    return infobyte;
};

export const getInfobytes = async (): Promise<Infobyte[]> => {

    const response = fetch(`${baseUrl}infobyte`, { credentials: "include", })
        .then(data => data.json())
        .then(json => json as Infobyte[])

    return response;
};
