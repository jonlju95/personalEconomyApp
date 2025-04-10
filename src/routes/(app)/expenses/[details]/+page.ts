import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return {
        title: capitalizeTitle(params.details)
    }
};

function capitalizeTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
}