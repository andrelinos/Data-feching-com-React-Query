import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

type RepositoryProps = {
    full_name: string;
    description: string;
};

export default function App() {
    const { data: repositories } = useFetch<RepositoryProps[]>(
        'https://api.github.com/users/andrelinos/repos'
    );

    return (
        <ul>
            {repositories?.map((repo) => {
                return (
                    <li key={repo.full_name}>
                        <strong>{repo.full_name}</strong>
                        <p>{repo.description}</p>
                    </li>
                );
            })}
        </ul>
    );
}
