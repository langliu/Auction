import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  private products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3, '这是第一个商品', ['电子产品', '硬件设施']),
    new Product(2, '第二个商品', 1.99, 3, '这是第二个商品', ['电子产品', '硬件设施']),
    new Product(3, '第三个商品', 1.99, 3, '这是第三个商品', ['电子产品', '硬件设施']),
    new Product(4, '第四个商品', 1.99, 3, '这是第四个商品', ['电子产品', '硬件设施'])
  ];
  private comments: Comment[] = [
    new Comment(1, 1, '2017-05-31 22:54:31', '李四', 3, '东西不错呀'),
    new Comment(2, 1, '2017-04-31 22:44:01', '张三', 4, '东西不错呀'),
    new Comment(3, 1, '2017-05-30 22:54:01', '王五', 2, '东西不错呀'),
    new Comment(4, 2, '2017-01-31 22:34:01', '赵六', 3, '东西不错呀'),
    new Comment(5, 2, '2017-06-01 22:14:01', '七七', 3, '东西不错呀')
  ];
  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  getCommentsForProductId(id: number): Comment[] {
    return this.comments.filter((comment: Comment) => comment.productId === id);
  }
}

export class Product {

  constructor(
    public id: number, // 商品编号
    public title: string, // 商品名称
    public price: number, // 商品单价
    public rating: number, // 商品星级
    public desc: string, // 商品描述
    public categories: string[] // 商品所属类别
  ) { }

}

export class Comment {

  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) { }
}