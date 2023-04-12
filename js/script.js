const search = document.querySelector('#searchField')
const searchBtn = document.querySelector('#searchButton')
const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#logradouro')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const uf = document.querySelector('#uf')
const info = document.querySelector("#info")

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const cepInput = search.value
  search.value = ""

  showMeCep(cepInput)
})

document.addEventListener("keypress", function(e) {
  if(e.key === 'Enter') {
    var btn = document.querySelector("#searchButton");
    btn.click();
  }
})

const searchCep = async (cep) => {
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
  const res = await fetch(apiUrl)
  const data = await res.json()
  return data
}

const showMeCep = async function (data) {
  const returnCep = await searchCep(data)

  if (returnCep.erro === true) {
    alert('CEP Inválido!')
    return
  }
  
  info.style.display = "flex"
  cep.innerText = returnCep.cep
  logradouro.innerText = returnCep.logradouro
  bairro.innerText = returnCep.bairro
  cidade.innerText = returnCep.localidade
  uf.innerText = returnCep.uf
}

const handleZipCode = (event) => {
  let input = event.target
  input.value = zipCodeMask(input.value)
}

const zipCodeMask = (value) => {
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{5})(\d)/,'$1-$2')
  return value
}
