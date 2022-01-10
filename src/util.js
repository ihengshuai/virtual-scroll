export const imgs = [
  'https://s4.ax1x.com/2022/01/10/7ETQ56.png',
  'https://s4.ax1x.com/2022/01/10/7ETnbR.jpg',
  'https://s4.ax1x.com/2022/01/10/7ETVv4.png',
  'https://s4.ax1x.com/2022/01/10/7Eoq4f.png',
  'https://s4.ax1x.com/2022/01/10/7E4ntU.jpg',
  'https://s4.ax1x.com/2022/01/10/7E4J76.jpg',
  'https://s4.ax1x.com/2022/01/10/7E4w1H.png',
  'https://s4.ax1x.com/2022/01/10/7E424S.jpg',
  'https://s4.ax1x.com/2022/01/10/7ETxJK.jpg',
  'https://s4.ax1x.com/2022/01/10/7E7PLd.png',
]

export function throttle(fn, delay = 500) {
  let timer
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
