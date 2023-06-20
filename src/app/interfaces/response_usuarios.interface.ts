import { Usuario } from "../models/usuario.models";

export interface IResponseUsuario {
    data: Usuario[];
    status: boolean;
    message: string;
}
