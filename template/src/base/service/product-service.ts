import axios from "axios";
import type {ProductSearchRequest} from "@/base/client/request/product-search-request";
import {ProductComboSearchRequest} from "@/base/client/request/product-search-request";

export class ProductService {
    public uri = '/view/product'

    public findBySearch(body: ProductSearchRequest) {
        return axios.post(`${this.uri}/findBySearch`, body);
    }

    public findCombo(body: ProductComboSearchRequest) {
        return axios.post(`${this.uri}/combo/search`, body);
    }
}