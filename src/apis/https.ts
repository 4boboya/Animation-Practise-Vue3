import axios from 'axios';
import qs from 'qs';
import { allowedMethods, timeoutSec, headers, formDataHeaders, backendApiUrl } from '@/config/global/Http';

const backendAjax = axios.create({
    baseURL: backendApiUrl,
    headers: headers,
    timeout: timeoutSec * 1000
});

const backendFormAjax = axios.create({
    baseURL: backendApiUrl,
    headers: formDataHeaders,
    timeout: timeoutSec * 1000
});

export async function $backendservice(method: any, url: any, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${method}'`);
    }
    try {
        const response = await backendAjax.request({
            url,
            method,
            data  : payload.body || null,
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        return null;
    }
}

export async function $backendFormservice(method: any, url: any, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${method}'`);
    }
    try {
        const response = await backendFormAjax.request({
            url,
            method,
            data  : payload.body || null,
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        return null;
    }
}