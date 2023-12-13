import {AuthRequest} from "@/base/client/request/auth.request";
import axios from "axios";

export class AuthService {
    public uri = '/auth';

    public login(model: AuthRequest) {
        return axios.post(this.uri + '/authenticate', model);
    }
}