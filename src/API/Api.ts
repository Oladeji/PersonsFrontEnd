import axios from "axios";
import { PersonEndpoints } from "../constants/Personendpoints";
import type { PersonResponse, PersonTypeResponse } from "../models/DTO";

export const  getPersonQuery = async (): Promise<PersonResponse[]> => {
    try {
        const response = await axios.get<PersonResponse[]>(PersonEndpoints);
        return response.data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        throw error;
    }
};

export const  getPersonTypeQuery = async (): Promise<PersonTypeResponse[]> => {
    try {
        const response = await axios.get<PersonTypeResponse[]>(`${PersonEndpoints}/persontypes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        throw error;
    }
};


export const createPersonQuery = async (newPerson: Omit<PersonResponse, "personId">): Promise<PersonResponse> => {
    try {
        const response = await axios.post<PersonResponse>(PersonEndpoints, newPerson);
        return response.data;
    } catch (error) {
        console.error("Error creating person:", error);
        throw error;
    }
};


export const updatePersonQuery = async (person: PersonResponse): Promise<PersonResponse> => {
    try {
        const response = await axios.put<PersonResponse>(`${PersonEndpoints}/${person.personId}`, person);
        return response.data;
    } catch (error) {
        console.error("Error updating person:", error);
        throw error;
    }
};
export const getPersonByIdQuery = async (personId: number): Promise<PersonResponse> => {
    if (personId <= 0) {
        throw new Error("Invalid person ID");
    }       
    if (!Number.isInteger(personId)) {
        throw new Error("Person ID must be an integer");
    }
    if (personId === undefined || personId === null) {
        throw new Error("Person ID is required");
    }
    try {
    const response = await axios.get<PersonResponse>(`${PersonEndpoints}/${personId}`);         
    return response.data;
    } catch (error) {
        console.error("Error fetching person by ID:", error);
        throw error;
    }
};
export const deletePersonQuery = async (personId: number): Promise<void> => {
    try {
        await axios.delete(`${PersonEndpoints}/${personId}`);
    } catch (error) {
        console.error("Error deleting person:", error);
        throw error;
    }
};