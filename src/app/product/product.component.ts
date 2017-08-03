import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public products: Product[];
    public imgUrl = 'http://placehold.it/320x150';

    constructor() {
        this.products = [
            new Product(1, '第一个商品', 1.99, 3.4, '这是第一个商品', ['电子产品', '硬件设施']),
            new Product(2, '第二个商品', 1.99, 4, '这是第二个商品', ['电子产品', '硬件设施']),
            new Product(3, '第三个商品', 1.99, 5, '这是第三个商品', ['电子产品', '硬件设施']),
            new Product(4, '第四个商品', 1.99, 1, '这是第四个商品', ['电子产品', '硬件设施'])
        ];
    }

    ngOnInit() {
    }

}

export class Product {

    constructor(public id: number, // 商品编号
                public title: string, // 商品名称
                public price: number, // 商品单价
                public rating: number, // 商品星级
                public desc: string, // 商品描述
                public categories: string[] // 商品所属类别
    ) {
    }

}
