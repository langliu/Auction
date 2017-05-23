import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() private rating: number;
  private stars: boolean[];
  constructor() { }

  ngOnInit() {
    this.stars = [];
    for (let index = 1; index <= 5; index++) {
      this.stars.push(index > this.rating);
    }
  }

}
