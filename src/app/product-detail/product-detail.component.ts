import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../shared/product.service';
import {WebSocketService} from '../shared/web-socket.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    public product: Product;
    public comments: Comment[];
    // 默认评级
    public newRating = 5;
    // 默认的评论内容
    public newComment = '';
    public isCommentHidden = true;
    public isWatched = false;
    public currentBid: number;
    public subscription: Subscription;

    constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService,
                private wsService: WebSocketService) {
    }

    ngOnInit() {
        const productId: number = Number.parseInt(this.routeInfo.snapshot.params['productId']);
        this.productService.getProduct(productId).subscribe(product => {
            this.product = product;
            this.currentBid = this.product.price;
        });
        this.productService.getCommentsForProductId(productId).subscribe(comments => this.comments = comments);
    }

    addComment() {
        const comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
        this.comments.unshift(comment);

        // 评论的平均星级
        const sum = this.comments.reduce((s, value) => s + value.rating, 0);
        this.product.rating = sum / this.comments.length;

        // 重置评论模块
        this.newComment = null;
        this.newRating = 5;
        this.isCommentHidden = true;
    }

    watchProduct() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.isWatched = false;
            this.subscription = null;
        } else {
            this.isWatched = true;
            this.subscription = this.wsService.createObservableSoket('ws://localhost:8085', this.product.id)
                .subscribe(products => {
                    const product = products.find(p => p.productId === this.product.id);
                    this.currentBid = product.bid;
                    console.log(this.currentBid);
                });
        }
    }

}
