import {hikesContrller} from './app/controllers/hikesController.js';
import {commentsController} from './app/controllers/commentsController.js';

const ctrl = new hikesContrller();
ctrl.render();

const commentsCtrl = new commentsController();

window.addEventListener('load', () => {
  commentsCtrl.renderCommentList();
});
