// 简单防抖函数，先执行一次
export const debounce = function (fn, wait = 500) {
  let timer = null;
  return (...args) => {
    if (!timer) fn.apply(this, args)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}
