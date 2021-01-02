import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils, HttpError } from 'react-admin';


export const createHeadersFromOptions = (options) => {
    const requestHeaders = (options.headers ||
        new Headers({
            Accept: 'application/json',
        }));
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && (!options.method || options.method === 'GET')) &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    return requestHeaders;
};
export const fetchJson = (url, options = {}) => {
    const requestHeaders = createHeadersFromOptions(options);

    return fetch(url, { ...options, headers: requestHeaders })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, statusText, headers, body }) => {
            let json;
            let errors;
            try {
                json = JSON.parse(body);
                errors = json.errors;
            } catch (e) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(

                    new HttpError(

                        (json && json.error && json.message) || statusText,
                        status,
                        json
                    )
                );
            }
            return Promise.resolve({ status, headers, body, json });
        });
};

const httpClient = (url, options = {}) => {

    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token } = JSON.parse(localStorage.getItem('jwtToken'));

    options.headers.set('Authorization', `Bearer ${token}`);

    return fetchUtils.fetchJson(url, options).then();
};
const dataProvider = simpleRestProvider('http://localhost:2000/api/v1', httpClient);

const MyDataProvider = {
    ...dataProvider,
};


// const convertHTTPResponse = (response, type, resource, params) => {
//     const { headers, json } = response;
//     switch (type) {
//         default:
//             if(json.status === 200){
//                 return { data: json.docs };
//             }else{
//                 throw new Error(json.errors)
//             }
//     }
// }
export default MyDataProvider;