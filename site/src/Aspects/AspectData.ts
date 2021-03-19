import { baseUrl } from "../stores";
import type Aspect from "./AspectTypes";

export const getAspects : () => Promise<Aspect[]> = async () => {
    const response = await fetch(`${baseUrl}localized-aspect`, {
        credentials: "include"
    }); 
    return await response.json() as Promise<Aspect[]>
}

export const getAspect : (id : String) => Promise<Aspect> = async (id) => {
    const response = await fetch(`${baseUrl}localized-aspect/${id}`, {
        credentials: "include"
    }); 
    return await response.json() as Promise<Aspect>
}

export const postAspect : (aspect : Aspect) => Promise<Aspect> = async (aspect) => {
    const response = await fetch(`${baseUrl}localized-aspect${aspect._id ? "/" + aspect._id : ""}`, {
        credentials: "include",
        method: aspect._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(aspect),
    }); 
    return await response.json() as Promise<Aspect>
}