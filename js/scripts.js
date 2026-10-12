const categorySelect = document.querySelector('#category')
const amountInput = document.querySelector('#amount')
const titleInput = document.querySelector('#company-title')
const submitButton = document.querySelector('form button[type="submit"]')
const form = document.querySelector('form')
const expenseList = document.querySelector('.expense-list')

//quando abrir as opçoes do select, a opçao default 'selecione' desaparece
categorySelect.addEventListener('focus', () => {
  if (categorySelect.value) {
    categorySelect[0].style.display = 'none'
  }

  //quando focado remove a classe error e fica com a aparencia de focus novamente
  categorySelect.classList.remove('error')
})
titleInput.addEventListener('focus', () => {
  titleInput.classList.remove('error')
})
amountInput.addEventListener('focus', () => {
  amountInput.classList.remove('error')
})

//quando é blur, verifica novamente se está tudo certo com a validação
categorySelect.addEventListener('blur', () => {
  validateForm()
})
titleInput.addEventListener('blur', () => {
  validateForm()
})
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

  //se tudo estiver preenchido, segue para inserir' a despesa
  if (validateForm()) {

    //salva os valores digitados pelo usuário, no title, deixa com a primeira letra maiuscúla
    const titleValue = titleInput.value.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
    const categoryValue = categorySelect.options[categorySelect.selectedIndex].textContent
    const amountValue = amountInput.value

    //cria os elementos e insere na lista
    const li = document.createElement('li')
    const expenseIcon = document.createElement('span')
    const expenseDescription = document.createElement('span')
    const expenseValue = document.createElement('span')
    const expenseCategory = document.createElement('span')
    const imgCategory = document.createElement('img')
    const imgRemove = document.createElement('img')

    expenseIcon.id = 'expense-icon'
    expenseDescription.id = 'expense-description'
    expenseValue.id = 'expense-value'
    expenseCategory.id = 'expense-category'

    imgCategory.src = '../assets/icons/food.svg'
    imgRemove.src = '../assets/icons/remove.svg'

    expenseIcon.append(imgCategory)
    expenseDescription.textContent = titleValue
    expenseCategory.textContent = categoryValue
    expenseValue.textContent = amountValue
    expenseValue.append(imgRemove)

    expenseDescription.append(expenseCategory)
    li.append(expenseIcon, expenseDescription, expenseValue)
    expenseList.append(li)


    //limpa os campos após a insersão
    titleInput.value = ''
    categorySelect.value = 0
    amountInput.value = ''

  }
})

