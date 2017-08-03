import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
    @Input() public rating;
    public stars: boolean[];

    constructor() {
    }

    ngOnInit() {
        this.stars = [];
        for (let i = 1; i <= 5; i++) {
            this.stars.push(i > this.rating);
        }
    }

}
