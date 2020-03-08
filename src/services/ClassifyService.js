import { Utility, ApiMap } from '.';

class ClassifyService {
  /**
   * 翻页
   *
   * @param {*} { page, size }
   * @returns
   * @memberof ClassifyService
   */
  async List({ page, size }) {
    return Utility.onApiGet({ apiInfo: ApiMap.Classify.List, stateName: 'ClassifyInfo', options: { params: { page, size } } });
  }

  /**
   * 所有
   *
   * @returns
   * @memberof ClassifyService
   */
  async All() {
    return Utility.onApiGet({ apiInfo: ApiMap.Classify.All, stateName: 'ClassifyAll', options: {} });
  }

  /**
   * 详情
   *
   * @param {*} id
   * @returns
   * @memberof ClassifyService
   */
  async Detail(id) {
    return Utility.onApiGet({ apiInfo: ApiMap.Classify.Detail, stateName: 'ClassifyDetailById', options: { id } });
  }

  /**
   * 添加
   *
   * @param {*} data
   * @returns
   * @memberof ClassifyService
   */
  async Add(data) {
    const info = await Utility.onApiPost({ apiInfo: ApiMap.Classify.Add, stateName: 'ClassifyAdd', options: { data } });
    this.All();
    return info;
  }

  /**
   * 修改
   *
   * @param {*} data
   * @returns
   * @memberof ClassifyService
   */
  async Modify(data) {
    const info = await Utility.onApiPut({ apiInfo: ApiMap.Classify.Modify, stateName: 'ClassifyModify', options: { data } })
    this.All();
    return info;
  }


  /**
   * 删除
   *
   * @param {*} id
   * @returns
   * @memberof ClassifyService
   */
  async Delete(id) {
    const info = await Utility.onApiDelete({ apiInfo: ApiMap.Classify.Delete, stateName: 'ClassifyDelete', options: { params: { id } } })
    this.All();
    return info;
  }
}


export default new ClassifyService();