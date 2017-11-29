import * as express from 'express';
import * as path from 'path';
import { Server } from 'ws';
import { Comment } from './modules/comment';
import { Product } from './modules/product';

const app = express();

/**
 * 初始化一些商品
 * @type {[Product , Product , Product , Product]}
 */
const products: Product[] = [
  new Product(1, '第一个商品', 1.99, 3.4, '这是第一个商品', [
    '电子产品',
    '硬件设施'
  ]),
  new Product(2, '第二个商品', 1.99, 4, '这是第二个商品', [
    '电子产品',
    '硬件设施'
  ]),
  new Product(3, '第三个商品', 1.99, 5, '这是第三个商品', [
    '电子产品',
    '硬件设施'
  ]),
  new Product(4, '第四个商品', 1.99, 1, '这是第四个商品', [
    '电子产品',
    '硬件设施'
  ])
];
/**
 * 初始化一些商品的评论信息
 * @type {[Comment , Comment , Comment , Comment]}
 */
const comments: Comment[] = [
  new Comment(1, 1, '2017-03-23 21:09:22', 'Allen', 3, '产品很不错'),
  new Comment(2, 1, '2017-04-23 21:09:22', 'Lvy', 4, '产品很不错，我喜欢'),
  new Comment(3, 1, '2017-05-23 21:09:22', 'Ani', 5, '很好'),
  new Comment(4, 2, '2017-06-23 21:09:22', 'Young', 3, '很不错')
];
app.use('/', express.static(path.join(__dirname, '..', 'client')));
// 获取所有商品
app.get('/api/products', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  let result = products;
  const params = request.query;
  if (params.title) {
    result = result.filter(product => product.title.includes(params.title));
  }
  if (params.price && result.length > 0) {
    result = result.filter(
      product => product.price <= Number.parseFloat(params.price)
    );
  }
  if (params.category !== '-1' && params.category && result.length > 0) {
    result = result.filter(product =>
      product.categories.includes(params.category)
    );
  }
  response.json(result);
});
// 根据商品Id获取商品信息
app.get('/api/product/:id', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  response.json(
    products.find(
      (product: Product) => product.id === Number(request.params.id)
    )
  );
});
// 根据商品Id获取商品评论
app.get('/api/product/:id/comments', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  response.json(
    comments.filter(
      (comment: Comment) => comment.productId === Number(request.params.id)
    )
  );
});
const server = app.listen(4001, 'localhost', () => {
  console.log('服务器已启动：http://localhost:4001');
});
const subscription = new Map<any, number[]>();
const wsServer = new Server({ port: 8085 });
wsServer.on('connection', webSocket => {
  webSocket.send('hello');
  webSocket.on('message', message => {
    const messageObj = JSON.parse(message.toString());
    const [productIds = []] = [subscription.get(webSocket)];
    subscription.set(webSocket, [...productIds, messageObj.productId]);
  });
});
const currentBids = new Map<number, number>();
setInterval(() => {
  products.forEach(p => {
    const [currentBid = p.price] = [currentBids.get(p.id)];
    const newBid = currentBid + Math.random() * 5;
    currentBids.set(p.id, newBid);
  });
  subscription.forEach((productIds: number[], ws) => {
    if (ws.readyState === 1) {
      const newBids = productIds.map(pid => ({
        productId: pid,
        bid: currentBids.get(pid)
      }));
      ws.send(JSON.stringify(newBids));
    } else {
      subscription.delete(ws);
    }
  });
}, 2000);
