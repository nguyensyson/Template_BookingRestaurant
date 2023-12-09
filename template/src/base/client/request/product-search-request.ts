import {PageRequest} from "@/base/model/base.model";

export class ProductSearchRequest extends PageRequest {
    keyword?: string = '';
    categoryIdList?: number[] = [];
    sortBy?: string = '';
}

export class ProductComboSearchRequest extends PageRequest{
    name?: string;
}