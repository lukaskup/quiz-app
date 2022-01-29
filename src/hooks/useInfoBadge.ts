import { useLocation } from 'react-router';

const paramsToJson = (search: string) => {
    try {
        return JSON.parse(
            '{"' +
                decodeURI(search).replace('?', '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
                '"}',
        );
    } catch (e) {
        return '';
    }
};

export const useInfoBadge = () => {
    const location = useLocation();
    const queryParams = paramsToJson(location.search);
    const showInfoBadge = Boolean(queryParams['success']) ? queryParams['success'] : '';

    return { showInfoBadge };
};
