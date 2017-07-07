import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { SecurityService } from '../services/SecurityService';
import { MenuSection } from '../../shared/models/menuSection';

@Injectable()
export class DinerMenuItemsService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration, private _securityService: SecurityService) {
        this.actionUrl = `${_configuration.Server}api/v1/diner-menu-items/`;
    }

    private setHeaders() {

        console.log('setHeaders started');

        this.headers = new Headers();
        this.headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
        let token = this._securityService.GetToken();
        if (token !== '') {
            let tokenValue = 'Bearer ' + token;
            console.log('tokenValue:' + tokenValue);
            this.headers.append('Authorization', tokenValue);
        }
    }

    public GetForBooking = (bookingId: string): Observable<any> => {
        this.setHeaders();
        let options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.actionUrl + '?include=menuItem&filter[diner.bookingId]=' + bookingId, options).map(res => res.json());

    }
}
