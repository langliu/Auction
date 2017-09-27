import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {
    /**
     * 初始化一些商品
     * @type {[Product , Product , Product , Product]}
     */
    private products: Product[] = [
        new Product(1, '第一个商品', 1.99, 3.4, '这是第一个商品', ['电子产品', '硬件设施']),
        new Product(2, '第二个商品', 1.99, 4, '这是第二个商品', ['电子产品', '硬件设施']),
        new Product(3, '第三个商品', 1.99, 5, '这是第三个商品', ['电子产品', '硬件设施']),
        new Product(4, '第四个商品', 1.99, 1, '这是第四个商品', ['电子产品', '硬件设施'])
    ];
    /**
     * 初始化一些商品的评论信息
     * @type {[Comment , Comment , Comment , Comment]}
     */
    private comments: Comment[] = [
        new Comment(1, 1, '2017-03-23 21:09:22', 'Allen', 3, '产品很不错'),
        new Comment(2, 1, '2017-04-23 21:09:22', 'Lvy', 4, '产品很不错，我喜欢'),
        new Comment(3, 1, '2017-05-23 21:09:22', 'Ani', 5, '很好'),
        new Comment(4, 2, '2017-06-23 21:09:22', 'Young', 3, '很不错')
    ];

    constructor() {
    }

    /**
     * 获取所有商品
     * @returns {Product[]}
     */
    getProducts(): Product[] {
        return this.products;
    }

    /**
     * 根据产品id获取该产品的信息
     * @param {number} id
     * @returns {Product}
     */
    getProduct(id: number): Product {
        return this.products.find((product) => product.id === id);
    }

    /**
     * 根据产品id获取该产品的评论信息
     * @param {number} id - 需要获取评论信息的产品的产品id
     * @returns {Comment[]}
     */
    getCommentsForProductId(id: number): Comment[] {
        return this.comments.filter((comment: Comment) => comment.productId === id);
    }
}

export class Product {
    /**
     * Product类的构造函数属性
     * @param {number} id - 商品编号
     * @param {string} title - 商品名称
     * @param {number} price - 商品单价
     * @param {number} rating - 商品星级
     * @param {string} desc - 商品描述
     * @param {string[]} categories - 商品所属类别
     */
    constructor(public id: number,
                public title: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: string[]) {
    }
}

export class Comment {
    /**
     * Comment类的构造函数属性
     * @param {number} id - 评论的id
     * @param {number} productId - 评论的产品的id
     * @param {string} timestamp - 评论的时间
     * @param {string} user - 发表评论的人
     * @param {number} rating - 发表评论的人对该产品的评星
     * @param {string} content - 评论的内容
     */
    constructor(public id: number,
                public productId: number,
                public timestamp: string,
                public user: string,
                public rating: number,
                public content: string) {
    }
}
