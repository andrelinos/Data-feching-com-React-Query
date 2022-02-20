import { useEffect, useState } from 'react';
import axios from 'axios';

type RepositoryProps = {
    full_name: string;
    description: string;
};

export default function App() {
    const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

    useEffect(() => {
        axios
            .get('https://api.github.com/users/andrelinos/repos')
            .then((response) => {
                setRepositories(response.data);
            });
    }, []);

    return (
        <ul>
            {repositories.map((repo) => {
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
