import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500)); //just for demonstrate spinner loading

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true; //permisson for using cookies

const responceBody = (responce: AxiosResponse) => responce.data;

axios.interceptors.response.use(async responce => { //adding async for sleep function
    await sleep();
    return responce
}, (error: AxiosError) => {
    const { data, status } = error.response!; // ! - override, thats turn off type safety for typescript. If we get into this part of code, this means that an error is exist.
    switch (status) {
        case 400:
            if (data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responceBody),
    post: (url: string, body: {}) => axios.post(url).then(responceBody),
    put: (url: string, body: {}) => axios.put(url).then(responceBody),
    delete: (url: string) => axios.delete(url).then(responceBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;