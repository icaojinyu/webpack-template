// 判断当前设备是否为移动端
export function isMobile() {
  let agent = window.navigator.userAgent
  let re = /iPhone|iPad|iPod|Android|webOS|BlackBerry|SymbianOS|Windows Phone/i
  return re.test(agent)
}

export function obj2str(obj) {
  let arr = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
  }
  return arr.join('&')
}

export function jsonp(option = {}) {
  return new Promise((resolve, reject) => {
    let {url, params = {}, fnKey = 'callback', timeout = 60 * 10} = option
    let callbackName = params[fnKey] = `jsonp${Date.now()}`
    let script = document.createElement('script')
    document.body.appendChild(script)
    url += url.indexOf('?') === -1 ? '?' + obj2str(params) : '&' + obj2str(params)
    script.src = url

    let timer = setTimeout(() => {
      reject()
    }, timeout)

    window[callbackName] = function (data) {
      resolve(data)
      document.body.removeChild(script)
      clearTimeout(timer)
      delete window[callbackName]
    }
  })
}

export function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

export function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let base = arr.splice(~~arr.length / 2, 1)[0]
  let left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(base, quickSort(right))
}
