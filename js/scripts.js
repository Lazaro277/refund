const categorySelect = document.querySelector('#category')
const amountInput = document.querySelector('#amount')
const titleInput = document.querySelector('#company-title')
const submitButton = document.querySelector('form button[type="submit"]')
const form = document.querySelector('form')

//quando abrir as opçoes do select, a opçao default 'selecione' desaparece
categorySelect.addEventListener('focus', () => {
  if (categorySelect.value) {
    categorySelect[0].style.display = 'none'
  }

  //quando focado remove a classe error e fica com a aparencia de focus novamente
  categorySelect.classList.remove('error')
})

//quando focado remove a classe error e fica com a aparencia de focus novamente
titleInput.addEventListener('focus', () => {
  titleInput.classList.remove('error')
})

//quando focado remove a classe error e fica com a aparencia de focus novamente
amountInput.addEventListener('focus', () => {
  amountInput.classList.remove('error')
})

//quando é blur, verifica novamente se está tudo certo com a validação
categorySelect.addEventListener('blur', () => {
  validateForm()
})

//quando é blur, verifica novamente se está tudo certo com a validação
titleInput.addEventListener('blur', () => {
  validateForm()
})

//quando é blur, verifica novamente se está tudo certo com a validação
amountInput.addEventListener('blur', () => {
  validateForm()
})

//a cada mudança e digito nos inputs e select, chama validateForm
categorySelect.addEventListener('change', validateForm)
titleInput.addEventListener('input', validateForm)

//mesmo com o botão disabled, se clicado ele verifica e mostra erros
submitButton.addEventListener('click', validateForm)

//formata o campo amount, deixando com o R$ no inicio e aceitando somente números
amountInput.addEventListener('input', () => {
  //remove tudo que não é número
  const digits = amountInput.value.replace(/\D/g, '')
  //divide o valor por 100, para ficar com o padrão 0,00
  const amount = Number(digits || 0) / 100
  //formata para ficar com 2 casas decimais e virgula
  const formattedAmount = amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  //adiciona o R$ no input, e se tiver vazio remove
  amountInput.value = amount ? `R$ ${formattedAmount}` : ''
  //move sempre o cursor para o final do campo
  amountInput.setSelectionRange(amountInput.value.length, amountInput.value.length)

  validateForm()
})

function validateForm() {
  //verifica se cada campo tem valor
  const hasValue = amountInput.value.trim() !== ''
  const hasTitle = titleInput.value.trim() !== ''
  const hasCategory = Number(categorySelect.value) !== 0

  //se não tiver valor, adiciona a classe disabled no botao
  submitButton.classList.toggle('disabled', !hasValue || !hasCategory || !hasTitle)

  //cada input recebe a classe error, se for vazio na validação
  titleInput.classList.toggle('error', !hasTitle)
  categorySelect.classList.toggle('error', !hasCategory)
  amountInput.classList.toggle('error', !hasValue)

  //retorna para o submit verificar tudo foi preenchido para ser cadastrado
  return hasValue && hasCategory && hasTitle
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  //se tudo estiver preenchido, segue para inserir a despesa
  if (validateForm()) {
    console.log(titleInput.value, categorySelect.options[categorySelect.selectedIndex].textContent, amountInput.value)

    //limpa os campos após a insersão
    titleInput.value = ''
    categorySelect.value = 0
    amountInput.value = ''

  }
})

