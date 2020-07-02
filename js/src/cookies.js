// Get Cookie
const getCookie = cname => {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return '';
}

// Set Cookie
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  var expires = 'expires='+ d.toUTCString()
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

const checkIfEu = url => {
  const eu = ['AL', 'AD', 'AT', 'AZ', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'GE', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'KZ', 'XK', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'UA', 'GB', 'VA']

  fetch('https://pro.ip-api.com/json/?key=EEKS6bLi6D91G1p').then(res => res.json()).then(data => {
    const code = data.countryCode
    if (eu.indexOf(code) > 0 && getCookie('cookiesAccepted') != 'true') {
      const cookiesStatementContainer = document.createElement('div')
            cookiesStatementContainer.setAttribute('class', 'c-fixed-bottom c-p-3')
            cookiesStatementContainer.setAttribute('id', 'c-cookies-statement')

      const cookiesStatement = document.createElement('div')
            cookiesStatement.innerHTML = `By continuing to use the site, you agree to the use of cookies for analytics, personalized content and ads. <a href="${url}">Learn More</a>`
            cookiesStatement.setAttribute('class', 'c-alert c-alert-primary c-mb-2 c-text-center c-d-inline')
      
      const cookiesStatementButton = document.createElement('button')
            cookiesStatementButton.classList.add('c-btn', 'c-btn-sm', 'c-btn-primary', 'c-ml-3')
            cookiesStatementButton.innerHTML = 'Accept'
            cookiesStatementButton.addEventListener('click', () => {
              setCookie('cookiesAccepted', true, 365)
              cookiesStatement.remove()
            }, false)
      
      cookiesStatement.appendChild(cookiesStatementButton)
      cookiesStatementContainer.appendChild(cookiesStatement)
      document.body.appendChild(cookiesStatementContainer)
    }
  }).catch(err => {
    throw err
  })
}

window.onload = function(){
  checkIfEu('/about/legal/cookies/')
};