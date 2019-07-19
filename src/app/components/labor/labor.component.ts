import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styles: []
})
export class LaborComponent implements OnInit {

  constructor() { }

  @Input() labors: string;

  ngOnInit() {
  }

  onclic() {
    console.log(this.labors);
  }

}
