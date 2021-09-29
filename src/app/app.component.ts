import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { WeatherService } from './core/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToDoList';
  listOFCity = [{
    cityName: 'Delhi',
  },
  {
    cityName: 'Paris',
  }, {
    cityName: 'London',
  }, {
    cityName: 'New York',
  }, {
    cityName: 'Singapore',
  }]

  citySelected: any;
  selectedCityWeatherForrecast: any;
  constructor(public weatherService: WeatherService, public https: HttpClient) {

  }
  ngOnInit() {
    this.citySelected = this.listOFCity[0].cityName;

    this.getData()
  }

  getData(){
    console.log(this.citySelected)
    this.weatherService.getData({cityName:this.citySelected}).pipe(map(res=>{
      return res.splice(0,5)
     })).subscribe(res => {
       this.selectedCityWeatherForrecast = res;
       console.log(res)
     })
  }

}
