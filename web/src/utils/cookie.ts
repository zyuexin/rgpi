/**
 * Cookie 操作工具类
 */
class CookieUtil {
    static TOKEN_NAME = 'Authorization';
    static USER_NAME = 'Email';
    /**
     * 设置 cookie
     * @param name cookie 名称
     * @param value cookie 值
     * @param options 可选参数
     *   - expires: 过期时间（单位：天）
     *   - path: 路径
     *   - domain: 域名
     *   - secure: 是否仅通过 HTTPS 发送
     *   - sameSite: SameSite 属性 ('Strict', 'Lax', 'None')
     */
    static set(
        name: string,
        value: string,
        options: {
            expires?: number;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'Strict' | 'Lax' | 'None';
        } = {}
    ): void {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (options.expires) {
            const date = new Date();
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
            cookieString += `; expires=${date.toUTCString()}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options.secure) {
            cookieString += `; secure`;
        }

        if (options.sameSite) {
            cookieString += `; SameSite=${options.sameSite}`;
        }

        document.cookie = cookieString;
    }

    /**
     * 获取 cookie
     * @param name cookie 名称
     * @returns cookie 值，如果不存在则返回 null
     */
    static get(name: string): string | null {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (decodeURIComponent(cookieName.trim()) === name) {
                return decodeURIComponent(cookieValue.trim());
            }
        }
        return null;
    }

    /**
     * 删除 cookie
     * @param name cookie 名称
     * @param options 可选参数 (与设置 cookie 时的选项相同)
     */
    static delete(
        name: string,
        options: {
            expires?: number;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'Strict' | 'Lax' | 'None';
        } = {}
    ): void {
        // 设置过期时间为过去的时间来删除 cookie
        options.expires = -1;
        CookieUtil.set(name, '', options);
    }

    /**
     * 检查 cookie 是否存在
     * @param name cookie 名称
     * @returns cookie 是否存在
     */
    static exists(name: string): boolean {
        return CookieUtil.get(name) !== null;
    }
}

export default CookieUtil;
