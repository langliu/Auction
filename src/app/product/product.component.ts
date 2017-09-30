import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public imgUrl = 'http://placehold.it/320x150';
    public products: Product[];
    // 搜索商品的关键字
    public keyWord: string;
    public titleFilter: FormControl = new FormControl();

    constructor(private productService: ProductService) {
        this.titleFilter.valueChanges.debounceTime(500).subscribe(value => this.keyWord = value);
    }

    ngOnInit() {
        this.products = this.productService.getProducts();
    }

}
