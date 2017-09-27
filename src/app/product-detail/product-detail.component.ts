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

    constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService) {
    }

    ngOnInit() {
        const productId: number = Number.parseInt(this.routeInfo.snapshot.params['productId']);
        this.product = this.productService.getProduct(productId);
        this.comments = this.productService.getCommentsForProductId(productId);
    }

}
