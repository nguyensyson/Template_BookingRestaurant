import axios from "axios";

export class CategoryDinningRomService {
    public uri = '/view/category-room';

    public getAll() {
        return axios.get(`${this.uri}/get-all`);
    }
}