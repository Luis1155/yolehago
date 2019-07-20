import { Component, OnInit } from '@angular/core';
import { RequestInterface } from '../../models/request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styles: []
})
export class ListRequestComponent implements OnInit {

  public requests: RequestInterface[];

  constructor(private rService: RequestService) { }

  ngOnInit() {
    this.getListRequests();
  }

  getListRequests() {
    this.rService.getAllRequest()
      .subscribe(requests => {
        this.requests = requests;
      });
  }

}
