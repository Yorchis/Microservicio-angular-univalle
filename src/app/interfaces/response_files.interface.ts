import { File } from "../models/file.models";

export interface IResponseFiles {
    data: File[];
    status: boolean;
}
