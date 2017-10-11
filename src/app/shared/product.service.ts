import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductService {

    searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

    constructor(private http: Http) {
    }

    /**
     * 获取所有商品
     * @returns {Product[]}
     */
    getProducts(): Observable<Product[]> {
        return this.http.get('/api/products').map(res => res.json());
    }

    /**
     * 根据产品id获取该产品的信息
     * @param {number} id
     * @returns {Product}
     */
    getProduct(id: number): Observable<Product> {
        return this.http.get('/api/product/' + id).map(res => res.json());
    }

    /**
     * 根据产品id获取该产品的评论信息
     * @param {number} id - 需要获取评论信息的产品的产品id
     * @returns {Observable<Comment[]>} - 该Id对应的评论的数组
     */
    getCommentsForProductId(id: number): Observable<Comment[]> {
        return this.http.get(`/api/product/${id}/comments`).map(res => res.json());
    }

    /**
     * 获取所有的商品的分类
     * @returns {string[]} - 商品分类名称
     */
    getAllCategories(): string[] {
        return ['电子产品', '硬件设施', '图书'];
    }

    /**
     * 商品搜索
     * @param {ProductSearchParams} params - 搜索参数
     * @returns {Observable<Product[]>} - 符合条件的商品
     */
    search(params: ProductSearchParams): Observable<Product[]> {
        return this.http.get('/api/products', {search: this.encodeParams(params)}).map(res => res.json());
    }

    /**
     * 搜索参数处理
     * @param {ProductSearchParams} params - 转入的搜索数据
     * @returns {string} - 返回一个字符串
     */
    encodeParams(params: ProductSearchParams) {
        return Object.keys(params).filter(key => params[key]).reduce((param: string, key: string) => {
            if (param) {
                param += `&&${key}=${params[key]}`;
            } else {
                param += `${key}=${params[key]}`;
            }
            return param;
        }, '');
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

export class ProductSearchParams {
    /**
     *
     * @param {string} title - 搜索的商品的名称
     * @param {number} price - 搜索的价格
     * @param {string} category - 搜索的商品所属的商品分类
     */
    constructor(public title: string, public price: number, public category: string) {
    }
}
