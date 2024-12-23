// index.ts
import { toast } from 'sonner';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

type Result<T> = {
    code: number;
    status: 'Success' | 'Fail' | 'Warning';
    message: string;
    data: T;
};

enum ResponseCode {
    FailCode,
    SuccessCode,
    WarningCode
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance;
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 60000 };

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例
        this.instance = axios.create(Object.assign(this.baseConfig, config));

        this.instance.interceptors.request.use(
            (config) => {
                // 一般会请求拦截里面加token，用于后端的验证
                // const token = localStorage.getItem('token') as string;
                // if (token) {
                //     config.headers!.Authorization = token;
                // }

                return config;
            },
            (err) => {
                // 请求错误，这里可以用全局提示框进行提示
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                if (res?.data.code === ResponseCode.FailCode) {
                    res?.data.message && this.alertError(res.data.status, res.data.message);
                } else if (res?.data.code === ResponseCode.SuccessCode) {
                    res?.data?.message && this.alertSuccess(res.data.status, res.data.message);
                } else if (res?.data.code === ResponseCode.WarningCode) {
                    res?.data.message && this.alertWarning(res.data.status, res.data.message);
                }
                return res.data;
            },
            (err) => {
                // 这里用来处理http常见错误，进行全局提示
                let message = '';
                switch (err.response.status) {
                    case 400:
                        message = '请求错误(400)';
                        break;
                    case 401:
                        message = '未授权，请重新登录(401)';
                        // 这里可以做清空storage并跳转到登录页的操作
                        break;
                    case 403:
                        message = '拒绝访问(403)';
                        break;
                    case 404:
                        message = '请求出错(404)';
                        break;
                    case 408:
                        message = '请求超时(408)';
                        break;
                    case 500:
                        message = '服务器错误(500)';
                        break;
                    case 501:
                        message = '服务未实现(501)';
                        break;
                    case 502:
                        message = '网络错误(502)';
                        break;
                    case 503:
                        message = '服务不可用(503)';
                        break;
                    case 504:
                        message = '网络超时(504)';
                        break;
                    case 505:
                        message = 'HTTP版本不受支持(505)';
                        break;
                    default:
                        message = `连接出错(${err.response.status})!`;
                }
                this.alertError(err.response.status, message);
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                return Promise.reject(err.response);
            }
        );
    }

    // 定义请求方法
    public request<T = any, D = AxiosRequestConfig>(config: AxiosRequestConfig): Promise<AxiosResponse<T, D>> {
        return this.instance.request(config);
    }

    public async get<T = any, D = AxiosRequestConfig<T>>(url: string, config?: AxiosRequestConfig) {
        const res = await this.instance.get<Result<T>, AxiosResponse<T>, D>(url, config);
        return res?.data;
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.post(url, data, config);
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.delete(url, config);
    }

    private alertError(status: string, errorMsg?: string) {
        toast.error(status, {
            description: errorMsg || 'Unknown Error',
            duration: 3000
        });
    }
    private alertSuccess(status: string, successMsg?: string) {
        toast.success(status, {
            description: successMsg || 'Request Success',
            position: 'top-right',
            duration: 2000
        });
    }
    private alertWarning(status: string, warningMsg: string) {
        toast.warning(status, {
            description: warningMsg || 'Request Warning',
            duration: 3000
        });
    }
}

// 默认导出Request实例
export default new Request({});
