import { Utility } from "../services";

export default {
  Auth: {
    ApiList: { url: '/api/api/router/', },
    ApiListMethod: { url: '/api/api/router/method', },
    Modify: {
      url: '/api/api/router/',
      params: {
        id: { Require: true, Desc: '主键ID', Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] }
      },
      data: {
        path: { Require: true, Desc: '路径', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        method: { Require: true, Desc: '方法', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        is_auth: { Require: true, Desc: '是否要权限', Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        is_system: { Require: true, Desc: '是否系统', Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        state: { Require: true, Desc: '状态', Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        remark: { Require: true, Desc: '备注', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
      }
    },
    Add: {
      url: '/api/api/router/',
      data: {
        path: { Require: true, Desc: '路径', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        method: { Require: true, Desc: '方法', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        is_auth: { Require: false, Desc: '是否要权限', Default: 0, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        is_system: { Require: false, Desc: '是否系统', Default: 0, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        state: { Require: true, Desc: '状态', Default: 1, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        remark: { Require: true, Desc: '备注', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
      }
    },
    BatchAdd: {
      url: '/api/api/router/batch',
      data: {
        path: { Require: true, Desc: '路径', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        is_auth: { Require: false, Desc: '是否要权限', Default: 0, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        is_system: { Require: false, Desc: '是否系统', Default: 0, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        state: { Require: true, Desc: '状态', Default: 1, Rules: [{ Reg: Utility.IsNumber, Msg: '类型不正确' }] },
        remark: { Require: true, Desc: '备注', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] },
        methodList: { Require: true, Desc: '方法', Rules: [{ Reg: Utility.IsArray, Msg: '不能为空' }] },
      }
    },
    BatchDelete: {
      url: '/api/api/router/batch',
      params: {
        ids: { Require: true, Desc: '删除记录ID', Rules: [{ Reg: Utility.IsNotEmpty, Msg: '不能为空' }] }
      }
    },
    Init: { url: '/api/api/router/init' }
  },
  AuthGroup: {
    List: {
      url: '/api/auth/group/',
      params: {
        page: { Require: false, Default: 1 },
        size: { Require: false, Default: 20 }
      }
    },
    Add: {
      url: '/api/auth/group/',
      data: {
        auth_group_name: { Require: true, Desc: '权限名称', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] }
      }
    },
    Modify: {
      url: '/api/auth/group/',
      params: { id: { Require: true, Rules: [{ Msg: '角色ID', Reg: Utility.IsNotEmpty }] } },
      data: {
        auth_group_name: { Require: true, Desc: '角色名称', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] }
      }
    },
    Delete: {
      url: '/api/auth/group/',
      params: { id: { Require: true, Rules: [{ Msg: '角色ID', Reg: Utility.IsNotEmpty }] } },
    },
  },
  AuthGroupRouter: {
    BatchAdd: {
      url: '/api/auth/group/router/auth/batch',
      data: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
        router_ids: { Require: true, Desc: '接口ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsArray, }] },
      }
    },
    BatchDelete: {
      url: '/api/auth/group/router/auth/batch',
      data: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
        router_ids: { Require: true, Desc: '接口ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsArray, }] },
      }
    },
    Add: {
      url: '/api/auth/group/router/auth',
      data: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
        router_id: { Require: true, Desc: '接口ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
      }
    },
    Delete: {
      url: '/api/auth/group/router/auth',
      data: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
        router_id: { Require: true, Desc: '接口ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
      }
    },
    List: {
      url: '/api/auth/group/router/auth',
      params: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty, }] },
      }
    }
  },
  AuthUser: {
    List: {
      url: '/api/auth/user/',
      params: {
        user_id: { Require: true, Desc: '用户ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] }
      },
    },
    Operator: {
      url: '/api/auth/user/',
      data: {
        auth_group_id: { Require: true, Desc: '角色ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        user_id: { Require: true, Desc: '用户ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
      },

    }
  },
  RouterAuth: {
    Add: {
      url: '/api/auth/group/router/auth',
    },
    Delete: {
      url: '/api/auth/group/router/auth',
    },
    BatchAdd: {},
    BatchDelete: {}
  },
  ApiUserAuth: {
    List: { url: '/api/admin/user/auth' },
    Add: { url: '/api/admin/user/auth' },
    Put: {
      url: '/api/admin/user/auth',
      params: { id: { Require: true, } },
    },
    Delete: {
      url: '/api/admin/user/auth',
      params: { id: { Require: true, } }
    },
  },
  Classify: {
    All: { url: '/api/classify/all', },
    List: {
      url: '/api/classify/',
      params: {
        page: { Require: false, Default: 1 },
        size: { Require: false, Default: 10 }
      }
    },
    Detail: {
      url: '/api/classify/',
      params: {
        id: { Require: true }
      }
    },
    Add: {
      url: '/api/classify/',
      data: {
        c_tag: { Require: false, Default: '默认' },
        c_name: { Require: true, Desc: '名称', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        state: { Require: true, Desc: '状态 ', Default: 1, Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] }
      }
    },
    Delete: {
      url: '/api/classify/',
      params: {
        id: { Require: true, Desc: 'ID', Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] }
      }
    },
    Modify: {
      url: '/api/classify/',
      data: {
        id: { Require: false, Default: '默认' },
        c_tag: { Require: false, Default: '默认' },
        c_name: { Require: true, Desc: '名称', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        state: { Require: true, Desc: '状态 ', Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] }
      }
    }
  },
  UserInfo: {
    List: {
      url: '/api/user/',
      params: {
        page: { Require: false, Default: 1 },
        size: { Require: false, Default: 20 }
      }
    },
    Login: {
      url: '/api/user/login',
      data: {
        account_code: { Require: true, Desc: '帐号', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        password: { Require: true, Desc: '密码', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
      }
    },
    Info: { url: '/api/user/info', desc: '用户信息' },
    Register: {
      url: '/api/user/register',
      data: {
        account_code: { Require: true, Desc: '帐号不能为空' },
        password: { Require: true, Desc: '密码' },
        nickname: { Require: true, Desc: '昵称' },
        username: { Require: false, Desc: '真实名' }
      }
    }
  },
  Article: {
    List: {
      url: '/api/article/',
      params: {
        page: { Require: false, Default: 1 },
        size: { Require: false, Default: 20 }
      }
    },
    Add: {
      url: '/api/article/',
      data: {
        title: { Require: true, Desc: '标题', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        brief: { Require: true, Desc: '简介', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        content: { Require: true, Desc: '内容', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        state: { Require: true, Desc: '状态', Rules: [{ Msg: '不能为空', Reg: Utility.IsNumber }] },
        pv: { Require: true, Desc: '访问量', Default: 0, Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] },
        comment_count: { Require: true, Desc: '评论数量', Default: 0, Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] },
        classify_ids: { Require: false, Desc: '分类', Rules: [{ Msg: '类型不正确', Reg: Utility.IsArray }] },
      }
    },
    Modify: {
      url: '/api/article/',
      data: {
        id: { Require: true, Desc: '主键', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }, { Msg: '类型不正确', Reg: Utility.IsNumber }] },
        title: { Require: true, Desc: '标题', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        classify_ids: { Require: false, Desc: '分类', Rules: [{ Msg: '类型不正确', Reg: Utility.IsArray }] },
        brief: { Require: true, Desc: '简介', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        content: { Require: true, Desc: '内容', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] },
        state: { Require: true, Desc: '状态', Rules: [{ Msg: '不能为空', Reg: Utility.IsNumber }] },
        pv: { Require: true, Desc: '访问量', Default: 0, Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] },
        comment_count: { Require: true, Desc: '评论数量', Default: 0, Rules: [{ Msg: '类型不正确', Reg: Utility.IsNumber }] },
      }
    }
  },
  Attachment: {
    Upload: {
      url: '/api/attachment/upload',
      data: {
        file: { Require: true }
      }
    },
    List: {
      url: '/api/attachment/',
      params: {
        page: { Require: false, Default: 1 },
        size: { Require: false, Default: 20 }
      }
    },
    Delete: {
      url: '/api/attachment/',
      params: {
        fileIds: { Require: true, Desc: '文件ID', Rules: [{ Msg: '不能为空', Reg: Utility.IsNotEmpty }] }
      }
    }
  }
}