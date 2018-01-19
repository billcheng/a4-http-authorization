import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

export type HttpAuthorizationCallback = (req: HttpRequest<any>) => boolean;

@Injectable()
export class HttpAuthorizationService {

    private authorizationCookieName = '';
    private escape = (s: string): string => s.replace(/([.*+?\^${}() |\[\]\/\\]) /g, '\\$1');
    private callback: HttpAuthorizationCallback;

    public getAuthorizationHeader(): string {
        if (!this.authorizationCookieName) {
            return '';
        }
        const match = document.cookie.match(RegExp('(?:^|;\\s*)' + this.escape(this.authorizationCookieName) + '=([^;]*)'));
        const token = match ? match[1] : null;
        return token ? `Bearer ${token}` : '';
    }

    public setTokenCookieName(cookieName: string) {
        this.authorizationCookieName = cookieName;
    }

    public setHttpAuthorizationCallback(callback: HttpAuthorizationCallback) {
        this.callback = callback;
    }

    public canInjectAuthorizationHeader(req: HttpRequest<any>): boolean {
        return !!this.authorizationCookieName && (!this.callback || this.callback(req));
    }

}