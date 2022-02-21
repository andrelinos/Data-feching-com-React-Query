import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

type RepositoryProps = {
    full_name: string;
    description: string;
};

export function Repo() {
    const params = useParams();
    const currentRepository = params['*'] as string;

    const queryClient = useQueryClient();

    async function handleInvalidateCacheQuery() {
        await queryClient.invalidateQueries(['repos']);
    }
    async function handleChangeCurrentDirectory() {
        const previousRepos =
            queryClient.getQueryData<RepositoryProps[]>('repos');

        if (previousRepos) {
            const nextRepos = previousRepos.map((repo) => {
                if (repo.full_name === currentRepository) {
                    return { ...repo, description: 'Testando' };
                } else {
                    return repo;
                }
            });

            queryClient.setQueriesData('repos', nextRepos);
        }
    }

    return (
        <div>
            <h1>{currentRepository}</h1>
            <button onClick={handleInvalidateCacheQuery}>
                Invalidar cache
            </button>
            <br />
            <br />
            <button onClick={handleChangeCurrentDirectory}>
                Alterar descrição
            </button>
        </div>
    );
}
