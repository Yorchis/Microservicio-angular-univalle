
export interface IResponseSistema {
    data: ISistema;
    status: boolean;
}

export interface ISistema {
    uid: string,
    nombre: string,
    descripcion: string,
    impuesto: number,
    created_at: Date,
    updated_at: Date,
}
