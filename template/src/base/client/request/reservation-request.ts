import type {ProductModel} from "@/base/model/product.model";

export class ReservationRequest {
    id?: number;
    sdt?: string;
    fullname?: string;
    numberOfPeopleBooked?: number;
    dateTime?: string;
    idCategoryDiningRoom?: number;
    idClient?: number;
    idVoucher?: number;
    upfrontPrice?: number;
    originalPrice?: number;
    actualPrice?: number;
    priceToPay?: number;
    listPorduct?: ProductModel[];
    status?: number;
}