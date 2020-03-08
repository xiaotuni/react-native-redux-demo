import httpHelper from '../common/HttpHelper';
import Utility from '../common/Utility';

export default function clientMiddleware() {
  return ({ dispatch, getState }) => {
    Utility.SetContent(Utility.ConstItem.KeyDispatch, dispatch);

    return (next) => async (action) => {
      console.log('------middle---0------judge action is function------');
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next({ ...rest });
      }
      console.log('------middle---1------------');
      const [REQUEST, REQUEST_METHD, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });
      return promise(httpHelper).then((data) => {
        next({ ...rest, payload: data, type: REQUEST_METHD });
        next({ ...rest, payload: data, type: SUCCESS });
        return data;
      }).catch((ex) => {
        console.log('------middle---error------------');
        console.log(ex);
        next({ ...rest, error: ex, type: FAILURE });
        return Promise.reject(ex.message || ex);
      });

    };
  };
}
