/**
 * 商品评论类
 * 
 * @export
 * @class Comment
 */
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
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}
