import { MD5 } from 'react-native-crypto-js';
import { AsyncStorage } from 'react-native';


Array.prototype.FindIndex = function (item) {
  const items = this;
  for (let i = 0; i < items.length; i += 1) {
    if (items[i] === item) {
      return i;
    }
  }
  return -1;
}


export default class Utility {

  static __Instance;

  constructor() {
    this._TempSaveContent = {};
    this.__ConstPrefix = 'WeiXinXTN';
  }

  /**
   * 实例
   * @returns {*}
   */
  static instance() {
    if (this.__Instance === null || typeof this.__Instance === 'undefined') {
      this.__Instance = new this();
    }
    return this.__Instance;
  }


  /**
   * 常量
   * @type {{SaveUrlPath: string}}
   */
  static ConstItem = {
    PageSize: 15, //                                                  每页大小数据
    CaptchaTimeout: 60,
    KeyDispatch: 'XTN_KeyDispatch',//                                 用于 dispatch 用的。
    KeyGlobalState: 'XTN_KeyGlobalState',//                           用于 全局的状态 State 用的。
    KeyHistory: 'XTN_KeyHistory',//                                   用于 history 用的。
    KeyReduxTypeMap: 'XTN_KeyReduxTypeMap',//                         用于 dispatch 用的。
    /**
     * 当前的上下文
     */
    Context: 'XTNContext',                                             // 当前页面的Context
    ReduxKey: {
      ManualInputModify: 'ManualInputModify',
    },
    /**
     * 事件
     */
    Event: 'onXTNEvent',                                               // 事件。
    Events: {
      HttpStatus: {
        1: 'onHttpStatus_XTN_1',
        200: 'onHttpStatus_XTN_200',                  // 处理成功
        400: 'onHttpStatus_XTN_400',                  // 请求无效
        401: 'onHttpStatus_XTN_401',                  // 未授权访问
        402: 'onHttpStatus_XTN_402',
        403: 'onHttpStatus_XTN_403',                  // 禁止访问
        404: 'onHttpStatus_XTN_404',                  // 资源未找到
        405: 'onHttpStatus_XTN_405',
        406: 'onHttpStatus_XTN_406',
        407: 'onHttpStatus_XTN_407',
        408: 'onHttpStatus_XTN_408',
        409: 'onHttpStatus_XTN_409',
        411: 'onHttpStatus_XTN_411',                   // 登陆超时
        500: 'onHttpStatus_XTN_500',                   // 服务器错误
        501: 'onHttpStatus_XTN_501',
        502: 'onHttpStatus_XTN_502',
        503: 'onHttpStatus_XTN_503',
      },
      ShowModel: {
        OnActionSheet: 'onXTN_ShowModel_ActionSheet',                            //
        OnLoading: 'onXTN_ShowModel_Loading',                                    // 加载
        OnAlert: 'onXTN_ShowModel_Alert',                                        // 弹出信息
        OnConfirm: 'onXTN_ShowModel_Confirm',                                    // 确定--取消
        OnShowDialog: 'onXTN_ShowModel_ShowDialog',                              // 打开对话框
        OnShowDialogHide: 'onXTN_ShowModel_ShowDialogHide',                      // 隐藏对话框
        OnShowDialogClose: 'onXTN_ShowModel_ShowDialogClose',                    // 关闭对话框
        OnActionSheetHide: 'onXTN_ShowModel_ActionSheetHide',                    // 关闭
        OnLoadingHide: 'onXTN_ShowModel_LoadingHide',
        OnConfirmHide: 'onXTN_ShowModel_ConfirmHide',
      },
      OnGoBack: 'onXTNEvent_GoBack',                                             // 页面退回事件
      OnEditNavBarTitle: 'onXTNEvent_EditNavBarTitle',                           // 修改导航条标题
      OnEditNavBarRight: 'onXTNEvent_EditNavBarRight',                           // 修改导航条右边
      OnEditPageSliderInfo: 'onXTNEvent_EditPageSliderInfo',                     // 页面切换
      OnOpenDatePicker: 'onXTNEvent_OnOpenDatePicker',                           // 打开日期控件
      OnKeyboard: 'onXTNEvent_Keyboard',                                         // 获取焦点键盘弹起;失去焦点键盘消失
      OnSetTitle: 'onXTNEvent_OnSetTitle',                                       // 修改导航条的标题
    },
    KeyUserInfo: 'XTN_USERINFO',                                                    // 用户信息
    KeyToken: 'XTN_TOKEN',                                                          // 根据token返回的用户信息
    SaveUserConfigInfo: 'XTN_SaveUserConfigInfo',                                // 保存用户获取的配置信息
    SaveUrlPath: 'XTN_SaveUrlPath',                                              // url保存地址
  }

  /**
   * 是否是数组
   * @param obj
   * @returns {boolean}
   */
  static IsArray(obj) {
    if (!obj || !obj.length || obj.length < 1) {
      return false;
    }
    return Array.isArray(obj);
  }

  /**
   * 判断是否为空
   * true-为空;false-不为空
   * @param obj
   * @returns {boolean}
   */
  static IsNull(obj) {
    return obj === null;
  }

  /**
   * 判断是否是函数
   * @param func 判断函数对象
   * @returns {boolean} true:成功，false:失败。
   */
  static IsFunction(func) {
    if (func !== null && typeof func !== 'undefined' && func.constructor.name === 'Function') {
      return true;
    }
    return false;
  }

  /**
  * 判断是否未定义
  * @param obj 判断对象
  * @returns {boolean} true:成功，false:失败。
  */
  static IsUndefined(obj) {
    if (typeof obj === 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否定义。
   * @param obj 判断对象
   * @return {boolean} true:成功，false:失败。
   */
  static IsDefined(obj) {
    if (typeof obj !== 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否是日期类型
   *
   * @static    * @param {any} obj  判断对象
   * @returns {boolean} true: 是日期，false:不是日期。
   * @example
   *        Utility.isDate('abcadfa')  ---> false
   *        Utility.isDate(new Date()) ---> true
   *        Utility.isDate('2013年10月10日') ---> true
   * @memberOf Utility
   */
  static IsDate(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') {   // 判断是不是 undefined,或 null
      return false;
    }
    const __isDate = obj.constructor.name === 'Date';  // 如果传入的就是日期
    if (__isDate) {
      return true;
    }
    try {
      return (new Date(obj.replace('年', '-').replace('月', '-').replace('日', ''))).constructor.name === 'Date';
    } catch (ex) {
      return false;
    }
  }

  /**
   * 是否为数字
   * @param value
   * @returns {*}
   */
  static IsNumber(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return false;
    }
    return /^\+?[0-9]\d*$/.test(value);
  }

  /**
   * 判断是否为空
   *
   * @static
   * @param {string} value 要判断的值
   * @returns true:是 ; false:否
   *
   * @memberOf Utility
   */
  static IsEmpty(value) {
    if (!value) {
      return true;
    }
    const __value = typeof value === 'number' ? value : value.trim();
    if (__value === '') {
      return true;
    }
    return false;
  }

  static IsNotEmpty(value) {
    return !Utility.IsEmpty(value);
  }

  /**
   * 判断输入的是否是手机号
   * @method __PhonePattern
   * @param {number} phone 手机号
   * @return {boolean} true 成功；false 失败
   * @example
   *  Utility.PhonePattern('13000100100');
   * @private
   */
  static PhonePattern(phone) {
    const ex = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    return ex.test(phone);
  }

  /**
   * 密码验证
   * @method __PasswordPattern
   * @param {string} password 密码
   * @return {boolean} true 成功；false 失败
   * @private
   */
  static PasswordPattern(password) {
    // test('/^[_0-9a-z]{6,16}$/i');
    const ex = /^[_0-9a-zA-Z]{6,25}$/;
    return ex.test(password);
  }

  /**
   * 是否含有中文（也包含日文和韩文）
   * @method __IsChineseChar
   * @param {string} str 要判断的内容
   * @return {boolean} true:成功;false:失败.
   * @private
   */
  static IsChineseChar(str) {
    const regu = '^[\u4e00-\u9fa5]+$';
    const re = new RegExp(regu);
    return re.test(str);
  }

  /**
   * 设置内容,这里主要是用来存放临时数据的。
   * @method _SetContent
   * @param key  键值，用于下次的时候获取内容用的。其实就是 _TempSaveContent的属性名称。
   * @param content 要存储的内容
   * @param isSaveLocalStorage 是否保存到本地存储里面
   * @param IsUser 根据用户uid 来获取缓存里的数据。
   * @private
   */
  static SetContent(key, content, isSaveLocalStorage, IsUser) {
    try {
      const self = this.instance();
      if (isSaveLocalStorage) {
        let __Content = content;

        // if (typeof window !== 'undefined') {
        //   window.localStorage.setItem(key, __Content);
        // }

        const __saveToStore = async () => {
          await AsyncStorage.setItem(key, __Content);
        }
        __saveToStore();
      }
      self._TempSaveContent[key] = content;
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * 删除指定字段值。
   * @method __RemoveContent
   * @param key
   * @return {null}
   * @private
   */
  static RemoveContent(key, IsRemoveLocalStorage) {
    try {
      const __self = this.instance();
      if (key === null || typeof key === 'undefined') {
        return;
      }
      if (__self._TempSaveContent.hasOwnProperty(key)) {
        delete __self._TempSaveContent[key];
      }

      if (IsRemoveLocalStorage && typeof window !== 'undefined') {
        // window.localStorage.removeItem(key);

        const __RemoveData = async () => {
          await AsyncStorage.removeItem(key);
        };
        __RemoveData();
      }
    } catch (ex) {
      this.printLog(ex.toString());
    }
  }

  /**
   * 获取内容，
   * @method _GetContent
   * @param key 健名称。其实就是 _TempSaveContent的属性名称。
   * @return {*} 返回内容
   * @private
   */
  static async GetContent(key, IsUser) {
    try {
      let __Content = null;
      const __self = this.instance();
      if (__self._TempSaveContent.hasOwnProperty(key)) {
        __Content = __self._TempSaveContent[key];
        return __Content;
      }
      if (typeof window === 'undefined') {
        return null;
      }
      if (__Content === null || typeof __Content === 'undefined') {
        // const _value =  window.localStorage.getItem(key);
        const _value = await AsyncStorage.getItem(key);
        if (_value !== null && _value !== '' && typeof _value !== 'undefined') {
          __self._TempSaveContent[key] = JSON.parse(_value);
          __Content = __self._TempSaveContent[key];
        }
      }

      return __Content;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  /**
   * 浏览器信息
   * @returns {Browser}
   */
  static BrowserInfo() {
    const _Browser = {
      versions: () => {
        const uu = navigator.userAgent;
        // const app = navigator.appVersion;
        return {
          trident: uu.indexOf('Trident') > -1,                                     // IE内核
          presto: uu.indexOf('Presto') > -1,                                       // opera内核
          webKit: uu.indexOf('AppleWebKit') > -1,                                  // 苹果、谷歌内核
          gecko: uu.indexOf('Gecko') > -1 && uu.indexOf('KHTML') === -1,           // 火狐内核
          mobile: !!uu.match(/AppleWebKit.*Mobile.*/),                             // 是否为移动终端
          ios: !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                        // ios终端
          android: uu.indexOf('Android') > -1 || uu.indexOf('Adr') > -1,           // android终端
          iPhone: uu.indexOf('iPhone') > -1,                                       // 是否为iPhone或者QQHD浏览器
          iPad: uu.indexOf('iPad') > -1,                                           // 是否iPad
          webApp: uu.indexOf('Safari') === -1,                                     // 是否web应该程序，没有头部与底部
          weixin: uu.indexOf('MicroMessenger') > -1,                               // 是否微信 （2015-01-22新增）
          qq: uu.match(/\sQQ/i) === ' qq'                                          // 是否QQ
        };
      },
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return _Browser;
  }

  /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * @method __FormatDate
   * @param fmt
   * @param date
   * @return {*}
   * @example
   *  Utility.FormatDate('yyyy-MM-dd hh:mm:ss.S',new Date());
   * @constructor
   */
  static FormatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!date) {
      return '';
    }
    let __this = new Date();
    let _fmt = fmt || 'yyyy-MM-dd HH:mm:ss.S';
    if (date !== null) {
      if (Date.parse(date)) {
        __this = new Date(date);
      } else {
        try {
          __this = new Date(date);
        } catch (ex) {
          __this = new Date();
        }
      }
    }
    const oo = {
      'M+': __this.getMonth() + 1, //                               月份
      'd+': __this.getDate(), //                                    日
      'D+': __this.getDate(), //                                    日
      'H+': __this.getHours(), //                                   小时
      'h+': __this.getHours(), //                                   小时
      'm+': __this.getMinutes(), //                                 分
      's+': __this.getSeconds(), //                                 秒
      'q+': Math.floor((__this.getMonth() + 3) / 3), //             季度
      'S': __this.getMilliseconds() //                              毫秒
    };
    if (/(y+)/.test(_fmt)) {
      const fmt1 = _fmt.replace(RegExp.$1, (__this.getFullYear() + '').substr(4 - RegExp.$1.length));
      _fmt = fmt1;
    }
    for (const kk in oo) {
      if (new RegExp('(' + kk + ')').test(fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (oo[kk]) : (('00' + oo[kk]).substr(('' + oo[kk]).length)));
      }
    }
    return _fmt;
  }

  /**
   * 打印输出日志
   * @method __PrintLog
   * @param {object} args 内容
   * @private
   */
  static PrintLog(args) {
    //  return;
    try {
      let __callmethod = '';
      try {
        throw new Error();
      } catch (ex) {
        // console.log(e.stack);
        __callmethod = ex.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, '');
      }

      const _curDate = new Date();
      const _aa = _curDate.toLocaleDateString() + ' ' + _curDate.toLocaleTimeString() + '.' + _curDate.getMilliseconds();
      console.log('--begin->', _aa, ' call method :', __callmethod);
      const __content = JSON.stringify(args);
      console.log(__content);
    } catch (ex) {
      console.log('---------输出日志，传入的内容传为JSON出现在异常--------------');
      console.log(ex);
      console.log('---------输出日志，内容为下--------------');
      console.log(args);
    }
  }


  /**
    * 将一个 对象转成url参数与&分开
    *
    * @param params 参数对象
    * @param split 分割符
    * @returns {*}
    * @example {a:a,b:b,c:c,e:e}
    * a=a&b=b&c=c&e=e
    */
  static ConvertToUrlParams(params, options) {
    const { split, notFields } = options || {};
    if (this.IsUndefined(params) || params === null) {
      return '';
    }
    const __KeyValue = [];
    const self = this;
    const __JSONValue = (value) => {
      try {
        let __JValue;
        if (value === null) {
          return '';
        }
        const { constructor } = value;
        if (typeof constructor === 'undefined' || constructor === null) {
          return '';
        }
        switch (value.constructor.name) {
          case 'Object':
            __JValue = '{' + this.ConvertToUrlParams(value) + '}';
            break;
          case 'Array':
            __JValue = JSON.stringify(value);
            break;
          default:
            __JValue = value;
        }
        return __JValue;
      } catch (ex) {
        console.log(ex.message);
        return value || '';
      }
    };
    Object.keys(params).forEach((key) => {
      const __value = params[key];
      if (self.IsDefined(__value) && __value !== '') {
        if (key.toLowerCase() !== 'IsExistsNextData'.toLowerCase()) {
          if (notFields) {
            if (notFields.indexOf(key) === -1) {
              __KeyValue.push(key + '=' + __JSONValue(__value));
            }
          } else {
            __KeyValue.push(key + '=' + __JSONValue(__value));
          }
        }
      }
    });
    return __KeyValue.join(split ? split : '&');
  }

  /**
   * 将 map对象 转成 key-value 数组对象
   * @param row
   * @returns {Array}
   */
  static ConvertMapToObject(row) {
    if (this.IsUndefined(row) || this.IsNull(row) || row === '') {
      return [];
    }
    const __Array = [];
    Object.keys(row).forEach((key) => {
      const __obj = {};
      __obj.key = key;
      __obj.value = row[key];
      __Array.push(__obj);
    });
    return __Array;
  }

  static ParseUrl(url) {
    if (!url) {
      return {};
    }
    if (url.indexOf('?') < 0) {
      return {};
    }
    const val = url.split('?')[1];
    const pMap = {};
    val.split('&').forEach((row) => {
      const [key, value] = row.split('=');
      pMap[key] = encodeURIComponent(value);
    })
    return pMap;
  }
  /**
   * 页面跳转
   * @param url 要跳转的页面。
   * @param params 参数
   */
  static ToPage(urlInfo, params) {
    try {
      const history = this.GetContent(this.ConstItem.KeyHistory);
      if (!history) {
        return;
      }
      if (typeof urlInfo === 'object' && urlInfo.path === 'goback') {
        history.goBack();
        return;
      }
      const oParams = Object.assign({}, params, { _ts: new Date().getTime() });
      const opt = { pathname: typeof urlInfo === 'object' ? urlInfo.path : urlInfo, params: oParams, query: oParams, state: oParams };
      // opt.search = Utility.ConvertToUrlParams(oParams);
      // console.log(opt);
      history.push(opt);

    } catch (ex) {
      console.log(ex.toString());
    }
  }

  /**
   * 后退操作
   *
   * @static
   *
   * @memberOf Utility
   */
  static GoBack(times) {
    this.ToPage({ path: 'goback' }, { times: times });
  }

  /**
   * 格式化
   * @example
   * sprintf('Latitude: %s, Longitude: %s, Count: %d', 41.847, -87.661, 'two')
   * Expected output: Latitude: 41.847, Longitude: -87.661, Count: 0
   * @returns {*}
   */
  static Sprintf() {
    const args = arguments;
    const string = args[0];
    let __index = 1;
    return string.replace(/%((%)|s|d)/g, (mm) => {
      // m is the matched format, e.g. %s, %d
      let val = null;
      if (mm[2]) {
        val = mm[2];
      } else {
        val = args[__index];
        // A switch statement so that the formatter can be extended. Default is %s
        switch (mm) {
          case '%d':
            val = parseFloat(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
          default:
            break;
        }
        __index++;
      }
      return val;
    });
  }

  /**
   * 格式化
   * @example
   * format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
   * ASP is dead, but ASP.NET is alive! ASP {2}
   * @param format
   * @returns {*}
   */
  static Format(format) {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined'
        ? args[number] : match;
    });
  }

  /**
   * 事件处理
   * @param eventName 事件名称
   * @param args      参数名称1 
   */
  static $emit(eventName, args) {
    if (this.IsUndefined(eventName)) {
      return;
    }
    const event = this.GetContent(this.ConstItem.Event);
    if (this.IsUndefined(event) || event === null) {
      return;
    }
    if (!this.isFunction(event.emit)) {
      return;
    }
    event.emit(eventName, args);
  }

  /**
   * 添加事件
   * @param eventName  {string}  事件名称
   * @param callBack  {function} 回调的方法名称
   */
  static $on(eventName, callBack) {
    if (this.IsUndefined(eventName)) {
      return;
    }
    const event = this.GetContent(this.ConstItem.Event);
    if (this.IsUndefined(event) || event === null) {
      return;
    }
    if (!this.isFunction(event.on)) {
      return;
    }
    event.on(eventName, callBack);
  }

  /**
   * 弹出提示信息
   * @param Content 弹出显示内容
   * @param Title  弹出显示的标题，可以不填写，默认为当前导航条里的标题
   * @param ToPage 弹出来，页面跳转到下一个页面 {Url: Utility.ConstItem.UrlItem.Login, Options: {}}
   * @constructor
   */
  static ActionSheet(Content, Title, ToPage) {
    this.$emit(this.ConstItem.Events.ShowModel.OnActionSheet, {
      Title: Title, ContentInfo: { Content: Content }, ToPage: ToPage
    });
  }

  /**
   * 确定，取消窗体
   *
   * @static
   * @param {*} { Msg, Title = '提示' }
   * @returns
   * @memberof Utility
   */
  static async Confirm({ Msg, Title = '提示' }) {
    return new Promise((resolve, reject) => {
      Utility.PushGlobalStateArray('AlertMsgList', {
        DisabledCancel: false,
        Title, Content: Msg, onOk: () => {
          resolve(true)
        }, onCancel: () => {
          resolve(false);
        }
      })
    })
  }
  static Alert(msg, title) {
    let _title = title;
    let _okButton;
    if (this.isFunction(title)) {
      _title = '提示信息';
      _okButton = title;
    }
    this.$emit(this.ConstItem.Events.ShowModel.OnShowDialog,
      { Content: msg, Title: _title, okButton: _okButton, Options: { IsHideCancel: true } }
    );
  }

  /**
   * 打开加载动画
   */
  static Loading() {
    this.SeGlobalState('IsLoading', true);
  }

  /**
   * 关闭加载动画
   */
  static LoadingHide() {
    this.SeGlobalState('IsLoading', false);
  }

  /**
   * 将日期转为时间戳
   *
   * @static    * @param {any} date
   * @returns
   *
   * @memberOf Utility
   */
  static ConvertToTimestamp(date) {
    if (typeof date === 'undefined' || date === null || date === '') {
      return 0;
    }
    if (this.isDate(date)) {
      return date.constructor.name === 'Date' ? date.getTime() : new Date(date.replace('年', '-').replace('月', '-').replace('日', '').replace(/-/g, '/')).getTime();
    }
    return 0;
  }

  /**
   * 将时间戳转为日期类型
   *
   * @static    * @param {number} value
   * @returns
   * @example
   *    Utility.$convertToDateByTimestamp('1478131200000') -> 2016-11-03
   *    Utility.$convertToDateByTimestamp('1478131200000','yyyy年MM月dd日') -> 2016年11月03日
   * @memberOf Utility
   */
  static ConvertToDateByTimestamp(value, format) {
    if (this.$isNumber(value)) {
      const __date = new Date(parseInt(value, 0));
      return this.formatDate(format || 'yyyy-MM-dd', __date);
    }
    return '';
  }

  /**
   * 字符串转为日期类型
   *
   * @static    * @param {string} value 日期
   * @returns Date 或为 null
   * @example
   *  Utility.$convertToDateByString('2013-10-10');
   * @memberOf Utility
   */
  static ConvertToDateByString(value) {
    if (this.isDate(value)) {
      return value.constructor.name === 'Date' ? value : new Date(value.replace('年', '-').replace('月', '-').replace('日', ''));
    }
    return null;
  }

  /**
   * 状态转换，将状态转为对应显示的名称
   *
   * @static    * @param {object} obj 对象
   * @param {string} status 状态
   * @returns 返回状态对应的名称
   *
   * @memberOf Utility
   */
  static StatusConvert(obj, status) {
    if (this.IsUndefined(obj) || obj === null || obj === '') {
      return this.IsUndefined(status) ? '' : status;
    }
    if (this.IsUndefined(status)) {
      return '';
    }
    const __Value = obj[status];
    return __Value ? __Value : status;
  }

  /**
   * 格式化数字
   *
   * @static
   * @param {any} number
   * @returns
   *
   * @example Utility.$formatNumber(10000) ==> 10,000
   * @memberOf Utility
   */
  static FormatNumber(number) {
    if (!this.$isNumber(number)) {
      return number;
    }
    const __value = this.$trim(number);
    return String(__value).split('').reverse().join('').replace(/(\d{3})(?=[^$])/g, '$1,').split('').reverse().join('');
  }

  /**
   * 克隆数据
   *
   * @static
   * @param {*} obj
   * @returns
   * @memberof Utility
   */
  static Clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }


  /**
   * 加密
   *
   * @static
   * @param {*} val
   * @returns
   * @memberof Utility
   */
  static Md5(val) {
    if (!val) {
      return '';
    }
    return MD5(val).toString();
  }

  static async SeGlobalState(stateName, value) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    return dispatch({ type: typeMap.UPDATE_CONTENT, stateName, value });
  }

  static async PushGlobalStateArray(stateName, value) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    return dispatch({ type: typeMap.ARRAY_PUSH, stateName, value });
  }

  static async DeleteGlobalStateArray(stateName, value) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    return dispatch({ type: typeMap.ARRAY_DELETE, stateName, value });
  }

  static Toast(msg, times) {
    return this.ToastAdd(msg, times);
  }
  static async ToastAdd(msg, times = 1500) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    return dispatch({ type: typeMap.TOAST_ADD, value: { msg, times } });
  }

  static async ToastDelete(index) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    return dispatch({ type: typeMap.TOAST_DELETE, index });
  }


  /**
   * 数据请求。
   *
   * @static
   * @param {*} { method, apiInfo, stateName, args }
   * @returns
   * @memberof Utility
   */
  static async __HttpRequest({ method, apiInfo, stateName, args }) {
    const dispatch = await Utility.GetContent(Utility.ConstItem.KeyDispatch);
    if (!dispatch) {
      return;
    }
    const { params = {}, data = {}, headers } = args || {};
    const typeMap = await Utility.GetContent(Utility.ConstItem.KeyReduxTypeMap);
    const action = {
      types: [typeMap.LOADING, typeMap[(method || 'GET').toUpperCase()], typeMap.LOAD_SUCCESS, typeMap.LOAD_FAIL],
      promise: (client) => client[`on${method}`]({ apiInfo, params, data, headers }),
      options: { apiInfo, args },
      stateName,
    };

    return dispatch({ ...action });
  }

  /**
   * 获取数据
   *
   * @static
   * @param {*} { apiInfo, stateName, options }
   * @returns
   * @memberof Utility
   */
  static async onApiGet({ apiInfo, stateName, options }) {
    return this.__HttpRequest({ method: 'Get', apiInfo, stateName, args: options });
  }

  /**
   * 修改
   *
   * @static
   * @param {*} { apiInfo, stateName, options: { params, data } }
   * @returns
   * @memberof Utility
   */
  static async onApiPut({ apiInfo, stateName, options: { params = {}, data } }) {
    return this.__HttpRequest({ method: 'Put', apiInfo, stateName, args: { params, data } });
  }

  /**
   * 提交
   *
   * @static
   * @param {*} { apiInfo, stateName, options: { params, data } }
   * @returns
   * @memberof Utility
   */
  static async onApiPost({ apiInfo, stateName, options: { params = {}, data } }) {
    return this.__HttpRequest({ method: 'Post', apiInfo, stateName, args: { params, data } });
  }
  /**
   * 删除
   *
   * @static
   * @param {*} { apiInfo, stateName, options: { params } }
   * @returns
   * @memberof Utility
   */
  static async onApiDelete({ apiInfo, stateName, options: { params = {}, data = {} } }) {
    return this.__HttpRequest({ method: 'Delete', apiInfo, stateName, args: { params, data } });
  }


  /**
   * 删除
   *
   * @static
   * @param {*} { apiInfo, stateName, options: { params } }
   * @returns
   * @memberof Utility
   */
  static async onApiUpload({ apiInfo, stateName, options: { params = {}, data = {} } }) {
    return this.__HttpRequest({ method: 'Upload', apiInfo, stateName, args: { params, data } });
  }



  static get Token() {
    return Utility.GetContent(Utility.ConstItem.KeyToken);
  }

  static set Token(val) {
    Utility.SetContent(Utility.ConstItem.KeyToken, val, true);
  }
  static get UserInfo() {
    return Utility.GetContent(Utility.ConstItem.KeyUserInfo);
  }

  static set UserInfo(val) {
    Utility.SetContent(Utility.ConstItem.KeyUserInfo, val, true);
  }

}
