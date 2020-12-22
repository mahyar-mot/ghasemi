import {Url, Header, removeToken} from './utils';


export function fetcher(url = Url("/url-not-filled", {}), header = {}, extra = {}) {

    function handleResponse(response) {
        return response.json()
            .then((json) => {
                if (!response.ok) {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText,
                    });
    
                    return Promise.reject(error);
                }
                return json;
            });
    }

    return fetch(Url(url, extra["query"]), Header(header))
        .then(handleResponse)
        .then((response) => response)
        .catch( e => {
            if (e.status === 401){

                removeToken();
                window.location = "/#/login";
            }
            return Promise.reject(e)
        })
}


export function fetcherFile(url = Url("/url-not-filled", {}), header = {}, extra = {}) {

    return fetch(Url(url, extra["query"]), Header(header))
        .then((response) => response)
        .catch( e => {
            if (e.status === 401){

                removeToken();
                window.location = "/#/login";
            }
            return Promise.reject(e)
        })
}
