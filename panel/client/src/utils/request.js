import axios from "axios";
import globalData from './global_data'
import util from './util'
import { Loading } from 'element-ui';

function request(url, data = {}, method = "GET") {
  return new Promise(((resolve, reject) => {
    const loadingInstance = Loading.service();
    axios({
      url
      , data
      , method
      , headers: {
        Authorization: globalData.get("token") || '',
      }
    })
      .then(({ data }) => {
        loadingInstance.close();
        if (data.error) {
          util.showToast({ type: "error", message: data.error })
        } else {
          if (data.type && data.message) {
            util.showToast({ type: data.type, message: data.message })
          }
          resolve(data)
        }
      }).catch(({ response }) => {
        loadingInstance.close();
        util.showToast({ type: "error", message: response.data.error || "网络错误" })
        reject(response)
      });
  }))
}

request.get = (url, data = {}) => request(url, data, "GET");

request.post = (url, data = {}) => request(url, data, "POST");

request.delete = (url, data = {}) => request(url, data, "DELETE");

request.patch = (url, data = {}) => request(url, data, "PATCH");

export default request;
