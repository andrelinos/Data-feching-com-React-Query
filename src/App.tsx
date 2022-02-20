import axios from 'axios';
import { useQuery } from 'react-query';

type RepositoryProps = {
    full_name: string;
    description: string;
};

export default function App() {
    const { data: repositories, isFetching } = useQuery<RepositoryProps[]>(
        'repos',
        async () => {
            const response = await axios.get(
                'https://api.github.com/users/andrelinos/repos'
            );

            return response.data;
        }
    );

    return (
        <ul>
            {isFetching ? (
                <p>Carregando...</p>
            ) : (
                repositories?.map((repo) => {
                    return (
                        <li key={repo.full_name}>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </li>
                    );
                })
            )}
        </ul>
    );
}
