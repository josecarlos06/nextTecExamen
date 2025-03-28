import { Component } from '@angular/core';

interface Job {
  puesto: string,
  empresa: string,
  id: string
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  job = <Job[]>[];

  constructor() {
    this.getUserNames()
  }

  async getUserNames() {
    try {
      const res = await fetch('https://67d0ea93825945773eb24739.mockapi.io/api/v1/getAllJobs#');
      const data = await res.json();
      this.job = data
    } catch (err) {
      console.log(err)
    }
  }

  editUserName(job : Job){
    const index = this.job.findIndex((u) => u.id === job.id);
    this.job[index] = {...this.job[index] , ...job } ;
  };

  deleteUser(id : string){
    const filters = this.job.filter((u) => u.id !== id);
    this.job = filters;
  };

  addUsers(job : Job){
    const data = [...this.job, job]
    this.job = data;
  };
}
