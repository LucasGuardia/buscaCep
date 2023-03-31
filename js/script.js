const search = document.querySelector('#searchField')
const searchBtn = document.querySelector('#searchButton')
const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#logradouro')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const uf = document.querySelector('#uf')


searchBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const cepInput = search.value
  search.value = ""

  showMeCep(cepInput)
})

const searchCep = async (cep) => {
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  const res = await fetch(apiUrl)
  const data = await res.json()

  return data
}

const showMeCep = async function (data) {
  const returnCep = await searchCep(data)

  cep.innerText = returnCep.cep
  logradouro.innerText = returnCep.logradouro
  bairro.innerText = returnCep.bairro
  cidade.innerText = returnCep.localidade
  uf.innerText = returnCep.uf
}