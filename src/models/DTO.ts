export interface CreatePersonRequest {
    name: string ;
    age: number;
    personTypeId?: number;
}

export interface PersonResponse {
    personId?: number;
    name: string ;
    age: number;
    personTypeId?: number;
    personType?: PersonTypeResponse;
}

export interface PersonTypeResponse {
    personTypeId?: number;
    typeName?: string | undefined;
}

export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}

export interface UpdatePersonRequest {
    name: string ;
    age: number;
    personTypeId: number;
}