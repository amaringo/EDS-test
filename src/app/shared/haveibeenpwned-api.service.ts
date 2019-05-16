import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BreachModel } from './models/breach.model';


@Injectable({
  providedIn: 'root'
})
export class HaveibeenpwnedApiService {

  constructor(protected http?: HttpClient) { }

  getAllBreaches(): Promise<BreachModel[]> {
    const url = 'https://haveibeenpwned.com/api/v2/breaches';
    /*const headers = new HttpHeaders()*/
      /*.append('User-Agent', 'Pwnage-Web-Checker'); не срабатывает, браузер отказывается менять на кастомное значение.
       Ошибка - Refused to set unsafe header "User-Agent"*/
    return this.http
      .get(url/*,{headers}*/)
      .toPromise()
      .then((res: BreachModel[]) => res)
      .catch((error) => {
        return Promise.resolve(error);
      });
  }

  getAccountDiscredits(profile: string, searchType: string): Promise<BreachModel[]> {
    console.log('getAccountDiscredits');
    profile = searchType === 'everywhere' ? profile : profile + '?domain=' + searchType;
    console.log();
    const url = 'https://haveibeenpwned.com/api/v2/breachedaccount/' + profile;
    return this.http
      .get(url/*,{headers}*/)
      .toPromise()
      .then((res: BreachModel[]) => res)
      .catch((error: HttpErrorResponse) => {
        console.log('error', error.status);
        return Promise.reject(error);
      });
  }
}
