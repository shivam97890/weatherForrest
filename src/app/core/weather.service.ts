import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  getData(payload: any) {
    return this.http.get<any>(environment.baseUrl + '?city=' + payload.cityName + '&key=371d4e84f04f4e6eafe38174f3de11e5').pipe(
      map(response => {
        let data = response.data.map((res: any) => {
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let d = new Date(res.datetime);
          let dayName = days[d.getDay()]
          let baseUrl = '../assets/'
          return {
            datetime: new Date(res.datetime),
            temp:res.temp,
            iconPath: baseUrl + res.weather.icon+'.png',
            dayName,
            ...res.weather
          }
        });

        return data
      })
    )
  }
}
