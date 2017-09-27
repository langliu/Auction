import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../shared/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public imgUrl = 'http://placehold.it/320x150';
    public products: Product[];

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.products = this.productService.getProducts();
    }

}
