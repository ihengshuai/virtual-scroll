export function fetchData(delay = 200, notError = true) {
  return new Promise((resolve, reject) => {
    console.log('------>fetch')
    if(notError) {
      setTimeout(resolve, delay)
    } else {
      const mockStatus = Math.floor(Math.random() * 100000)
      if(mockStatus % 2) {
        setTimeout(resolve, delay)
      } else {
        setTimeout(reject, delay)
      }
    }
  })
}