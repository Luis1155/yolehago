import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styles: []
})
export class ListWorkersComponent implements OnInit {

  constructor(private pService: ProfileService) { }

  public workers: ProfileInterface[];

  ngOnInit() {
    this.getListProfilesWorkers();
  }

  getListProfilesWorkers() {
    this.pService.getAllProfiles()
      .subscribe(workers => {
        this.workers = workers;
      });
  }

}
