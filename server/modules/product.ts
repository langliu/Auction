/**
 * 商品类
 * 
 * @export
 * @class Product
 */
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
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: string[]
  ) {}
}
