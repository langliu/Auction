import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../shared/product.service';

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

    constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService) {
    }

    ngOnInit() {
        const productId: number = Number.parseInt(this.routeInfo.snapshot.params['productId']);
        this.productService.getProduct(productId).subscribe(product => this.product = product);
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

}
