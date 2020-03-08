import axios from 'axios';
import Utility from './Utility';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    const { response, message } = error || {};
    const { status, data } = response || {};
    // console.log('-------data---------------');

    switch (status) {
      case 400:
        const { errcode: code, errmsg: error } = data;
        Utility.Toast(data.errmsg);
        return Promise.reject({ status, code: code || status, error });
      case 401:
        return Promise.reject({ status, code: 401, data: data || '请选登录' });
      case 403:
      case 404:
        Utility.Toast(data.errmsg);
        return Promise.reject({ status, code, error: error || data });
      case 500:
        const { msg } = data || {};
        return Promise.reject({ status, code: 500, data: { msg: msg || 'An error occurred' } });
    }

    return Promise.reject({ message: data || message })   // 返回接口返回的错误信息
  });

class CheckParamsHelper {

  static async CheckParams(params, content = {}) {
    if (!params) {
      return content;
    }
    const errArr = [];
    const newData = {};

    Object.keys(params).forEach((key) => {
      const { Require, Rules, Desc, Default } = params[key];
      let _value = content[key];                   // || dValue;
      if (!content[key]) {
        if (content[key] !== 0) {
          content[key] = Default;
          _value = Default;
        }
      } else {
        _value = typeof _value === 'string' ? _value.trim() : _value;
      }

      if (!!Require && Rules) {
        Rules.forEach(({ Msg, Reg, lang = '' }) => {
          if (!Reg(_value)) {
            errArr.push(`【${Desc}】${Msg}`);
          }
        });
      }
      if (typeof _value !== 'undefined') {
        newData[key] = _value;
      }
    });
    if (errArr.length > 0) {
      return Promise.reject({ code: 300, error: errArr });
    }
    return newData;
  }

  static async Check(apiInfo, { params, data }) {
    return {
      pData: await this.CheckParams(apiInfo.params, params),
      dData: await this.CheckParams(apiInfo.data, data)
    };
  }
}


/**
 * API接口请求类
 *
 * @class Httphelper
 */
class Httphelper {

  async __request({ method = 'get', apiInfo, headers, params, data }) {
    try {
      const { url } = apiInfo || {};
      if (!url) {
        Utility.Toast('url不存在');
        return Promise.reject('url不存在');
      }
      const _url = `http://xiaotuni.cn${url}`;
      console.log('url:', method, _url);
      const info = await CheckParamsHelper.Check(apiInfo, { params, data });
      const { pData, dData } = info;
      const token = ''; // Utility.Token;
      const _headers = Object.assign({}, headers);
      if (token) {
        _headers.token = token;
      }
      const opt = { method, url: _url, headers: _headers, params: pData, data: dData };
      const response = await axios(opt);
      const { data: result } = response;
      return result;
    } catch (ex) {
      const { code, error } = ex;
      switch (code) {
        case 300:
          Utility.PushGlobalStateArray('AlertMsgList', { Title: '参数错误', Content: Utility.IsArray(error) ? error.join(',') : error });
          break;
        case 400:
          Utility.Toast(error, 1500);
          break;
        case 401:
          Utility.Token = '';
          Utility.UserInfo = '';
          Utility.SeGlobalState('UserInfo', null);
          setTimeout(() => {
            // Utility.ToPage(Utility.UrlItem.Login, { goBack: 1 })
          }, 200);
          break;
        case 403:
        case 404:
          break;
        default:
          const a = ex;
          console.log(a);
          break;
      }
      Utility.LoadingHide();
      return Promise.reject(error || ex);
    }
  }

  /**
   * 提交
   *
   * @param {*} { apiInfo, headers, params, data }
   * @returns
   * @memberof Httphelper
   */
  async onPost({ apiInfo, headers, params, data }) {
    return this.__request({ method: 'post', apiInfo, headers, params, data });
  }

  /**
   * 修改
   *
   * @param {*} { apiInfo, headers, params, data }
   * @returns
   * @memberof Httphelper
   */
  async onPut({ apiInfo, headers, params, data }) {
    return this.__request({ method: 'put', apiInfo, headers, params, data });
  }

  /**
   * 删除
   *
   * @param {*} { apiInfo, headers, params, data }
   * @returns
   * @memberof Httphelper
   */
  async onDelete({ apiInfo, headers, params, data, }) {
    return this.__request({ method: 'delete', apiInfo, headers, params, data, });
  }

  /**
   * 获取
   *
   * @param {*} { apiInfo, headers, params }
   * @returns
   * @memberof Httphelper
   */
  async onGet({ apiInfo, headers, params }) {
    return this.__request({ method: 'get', apiInfo, headers, params });
  }

  /**
   * 获取
   *
   * @param {*} { apiInfo, headers, params }
   * @returns
   * @memberof Httphelper
   */
  async onUpload({ apiInfo, data }) {
    const { file } = data;
    const { url } = apiInfo;
    let formData = new FormData();
    formData.append('file', file);                      // 'file' 可变 相当于 input 表单的name 属性

    const _url = `${cfg.ApiService}${url}`;
    const headers = {};

    headers.token = Utility.Token;
    const opt = {
      method: 'post',
      url: _url,
      headers,
      data: formData,
    };
    const result = await axios(opt);
    return result.data;
  }

}

export default new Httphelper();