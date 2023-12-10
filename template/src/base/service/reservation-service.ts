import {ReservationRequest} from "@/base/client/request/reservation-request";
import axios from "axios";

export class ReservationService {
   public uri = '/view/reservation/addByUser';

   public addByUser(model: ReservationRequest) {
       return axios.post(this.uri, model);
   }
}