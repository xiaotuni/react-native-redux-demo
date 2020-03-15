import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/index';
import clientMiddleware from './redux/clientMiddleware';


const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('logger-->function：', action);
  } else {
    console.log('logger-->action：', action);
  }
  next(action);
  console.log('logger-->nextState：', store.getState());
}
export default function BuildStore() {
  const middleware = [clientMiddleware(), logger];
  // const middleware = [clientMiddleware()];
  const mergeStore = applyMiddleware(...middleware)(createStore);
  return mergeStore(reducers);
};
