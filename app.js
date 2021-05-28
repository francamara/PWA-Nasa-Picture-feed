const apiUrlDaily = 'https://api.nasa.gov/planetary/apod'

const apiUrlMars =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000'

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

function imgContainerCreator(
  imgSrc,
  titleSource,
  explanationSource,
  parentContainer
) {
  // MAIN CONTAINER
  const div = document.createElement('div')
  div.className = 'card'
  // TITLE
  const title = document.createElement('h3')
  title.textContent = titleSource
  // EXPLANATION
  const p = document.createElement('p')
  p.className = 'explanation'
  p.textContent = explanationSource
  // IMAGE
  const img = document.createElement('img')
  img.src = imgSrc
  // VIEW MORE BTN
  const btn = document.createElement('button')
  btn.className = 'read-more'
  btn.textContent = 'Read more...'
  div.appendChild(title)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
  parentContainer.appendChild(div)
}

request(`${apiUrlDaily}?api_key=${apiKey}`).then((content) => {
  container = document.querySelector('.daily-img')
  imgContainerCreator(
    content.url,
    content.title,
    content.explanation,
    container
  )
})

request(`${apiUrlMars}&api_key=${apiKey}`).then((content) => {
  container = document.querySelector('.mars-feed')
  for (i = 0; i < 10; i++) {
    imgContainerCreator(
      content.photos[i].img_src,
      `Rover: ${content.photos[i].rover.name}`,
      `Camera: ${content.photos[i].camera.full_name}`,
      container
    )
  }
})
