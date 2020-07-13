import Cookies from 'js-cookie'

const globalData = {};

function set(key, val) {
  globalData[key] = val;
  Cookies.set(key, val)
}

function get(key) {
  return globalData[key] || Cookies.get(key);
}

export default { set, get };
