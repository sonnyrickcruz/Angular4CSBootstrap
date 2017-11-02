import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected searchStr: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
  }

  ngOnInit() {
  }

}
