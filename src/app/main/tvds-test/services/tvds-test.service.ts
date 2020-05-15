import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


const api_url_markers = environment.apiUrl + "/api/jobordersupdatemap/";
const api_url_vehicle = environment.apiUrl + "/api/vehicles/";

@Injectable({
  providedIn: 'root'
})
export class TvdsTestService {

  routeParams: any;

  constructor(private http: HttpClient) {}
  private authorizationHeader() {
    let token = environment.production
      ? window.localStorage.getItem(`token@${environment.appName}`)
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcyNDIyNTE2Mzg5NzAwMWEyNzdlM2UiLCJmaXJzdG5hbWUiOiJ0aGVlcmFzYWsiLCJsYXN0bmFtZSI6InR1YnJpdCIsImRpc3BsYXluYW1lIjoidGhlZXJhc2FrIHR1YnJpdCIsInByb2ZpbGVJbWFnZVVSTCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vaGZsdmxhdjA0L2ltYWdlL3VwbG9hZC92MTQ4NzgzNDE4Ny9nM2h3eWllYjdkbDd1Z2RnajN0Yi5wbmciLCJyb2xlcyI6WyJ1c2VyIl0sInVzZXJuYW1lIjoiMDg5NDQ0NzIwOCIsInByb3ZpZGVyIjoibG9jYWwiLCJpYXQiOjE1ODQ1NDYzNDIsImV4cCI6MTU5MTc0NjM0Mn0.zjKgz4zjfHLnB_F0WRsctN8mpygZfpmaxk2e0P2fP4o";

    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    console.log("resolve with params : " + JSON.stringify(this.routeParams));
    if (this.routeParams.id) {
      if (this.routeParams.id !== "new") {
        // return this.getJoborderData(this.routeParams.id);
      }
    } else {
      // return this.getJoborderDataList(0, 10, "", "created", "desc");
    }
  }

  getMarkerDataList(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(api_url_markers, body, { headers: this.authorizationHeader() })
        .subscribe((res: any) => {
          resolve(res.data);
        }, reject);
    });
  }

  getVehicleData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(api_url_vehicle, { headers: this.authorizationHeader() })
        .subscribe((res: any) => {
          resolve(res.data);
        }, reject);
    });
  }

}
