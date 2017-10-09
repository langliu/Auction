import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges {
    // 评论的星级
    @Input() public rating: number;
    // 评论的星级是否可以改变，默认不可改变
    @Input() public readonly = true;
    // 向父组件输出评论的星级
    @Output() public ratingChange: EventEmitter<number> = new EventEmitter();
    public stars: boolean[];

    constructor() {
    }

    ngOnInit() {
        this.stars = [];
        for (let i = 1; i <= 5; i++) {
            this.stars.push(i > this.rating);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.stars = [];
        for (let i = 1; i <= 5; i++) {
            this.stars.push(i > this.rating);
        }
    }

    /**
     * 改变评论的星级
     * @param {number} index - 评论的星级
     */
    clickStar(index: number) {
        if (!this.readonly) {
            this.rating = index + 1;
            this.ratingChange.emit(this.rating);
        }
    }
}
