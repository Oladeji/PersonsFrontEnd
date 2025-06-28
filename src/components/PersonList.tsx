import React from "react";
import { useGetPersons } from "../hooks/useGetPersons";
import type { PersonResponse } from "../models/DTO";

const PersonList: React.FC = () => {
    const { data, isLoading, error } = useGetPersons();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Debug: log the data
    // console.log(data);

    const persons = Array.isArray(data) ? data : [];

    if (persons.length === 0) return <div>No persons found.</div>;

    return (
        <ul>
            {persons.map((person: PersonResponse) => (
                <li key={person.personId}>
                    {person.personId} {person.name} - {person.age} years old
                </li>
            ))}
        </ul>
    );
};

export default PersonList;