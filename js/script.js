const search = document.querySelector('#searchField')
const searchBtn = document.querySelector('#searchButton')
const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#logradouro')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const uf = document.querySelector('#uf')
const info = document.querySelector("#info")

const INVALID_CEP = 'CEP Inválido!'
const lengthCepWithMask = 9

searchBtn.addEventListener("click", (event) => {
  event.preventDefault()

  const cepInput = search.value
  search.value = ""

  showMeCep(cepInput)
})

document.addEventListener("keypress", function(event) {
  if(event.key === 'Enter') {
    var btn = document.querySelector("#searchButton");
    btn.click();
  }
})

const searchCep = async (cep) => {

  if (cep.length < lengthCepWithMask) {
    return alert(INVALID_CEP)
  }

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
  const res = await fetch(apiUrl)
  return res.json()
}

const showMeCep = async function (data) {
  const returnCep = await searchCep(data)

  if (returnCep.erro) {
    return alert(INVALID_CEP)
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
