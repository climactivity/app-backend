import {Aspect} from "../AspectTypes";
import {baseUrl} from '../../stores';

export default class AspectAPIService {
    private baseURL: string;

    constructor() {
        this.baseURL = baseUrl;
    }

    async getAspects(): Promise<Aspect[]> {
        return await fetch(`${baseUrl}/aspect`)
            .then(aspectListJSON => aspectListJSON.json())
            .then(aspectListData => {
                console.log(aspectListData)
                return aspectListData.map(a => new Aspect(a._id, a.name))
            });
    }

    async saveAspect(aspect: Aspect) {
        alert(aspect.name)
        await fetch(`${baseUrl}/aspect`, {
            method: "POST",
            body: JSON.stringify({
                name: aspect.name,
                localizedStrings: []
            })
        }).then(response => console.log(response));
    }

    async deleteAspect(aspect: Aspect) {
        await fetch(`${baseUrl}/aspect/${aspect.id}`, {
            method: "DELETE",
        });
    }
}