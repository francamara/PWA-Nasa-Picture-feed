const apiUrlDaily = 'https://api.nasa.gov/planetary/apod'

const apiKey = 'NT2ybEVssuTq6Lb3Bf6JKPDvbbUsj5A89hbAaROG'

function request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        return resolve(response)
      })
      .catch((error) => reject(error))
  })
}

function imgContainerCreator(src, parentContainer) {
  const div = document.createElement('div')
  const img = document.createElement('img')
  img.src = src
  div.appendChild(img)
  parentContainer.appendChild(div)
}

request(`${apiUrlDaily}?api_key=${apiKey}`).then((content) => {
  container = document.querySelector('.daily-img')
  imgContainerCreator(content.hdurl, container)
})
