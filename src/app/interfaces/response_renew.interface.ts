export interface IResponseRenew {
    status: boolean;
    token: string;
    data: IUsuario;
}

interface IUsuario {
    uid: string;
    nombre: string;
    email: string;
    password: string;
    photo: string;
    disponible: boolean;
    estado: boolean;
    uid_rol: string;
    created_at: Date;
    updated_at: Date
}