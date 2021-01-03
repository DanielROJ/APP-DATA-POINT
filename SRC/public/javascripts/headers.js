const formLogin = document.querySelector('form')


formLogin.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new FormData(formLogin)
  const dJson = {}

  formData.forEach(function (value, key) {dJson[key] = value});

  fetch('/users', {
    method: 'POST',
    body: JSON.stringify(dJson),
    headers:{"Content-Type":"application/json;charset=UTF-8"}
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
})
