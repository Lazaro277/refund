const categorySelect = document.querySelector('#category')
const amountInput = document.querySelector('#amount')
const titleInput = document.querySelector('#company-title')
const submitButton = document.querySelector('form button[type="submit"]')
const form = document.querySelector('form')
const expenseList = document.querySelector('.expense-list')
let countExpense = 0
let totalAmount = 0
let expenses = []

// recupera as despesas salvas no navegador
try {
  const savedExpenses = localStorage.getItem('refund-expenses')

  expenses = savedExpenses ? JSON.parse(savedExpenses) : []

  if (!Array.isArray(expenses)) {
    expenses = []
  }
} catch (error) {
  expenses = []
  localStorage.removeItem('refund-expenses')
}

// salva as despesas no navegador
function saveExpenses() {
  localStorage.setItem('refund-expenses', JSON.stringify(expenses))
}

function renderExpenses() {
  // Remove as despesas exibidas anteriormente, mantendo a mensagem de lista vazia
  expenseList.querySelectorAll('li:not(#empty-message)').forEach(li => li.remove())

  // Cria novamente os elementos de cada despesa salva
  expenses.forEach(expense => {
    const li = document.createElement('li')
    const expenseIcon = document.createElement('span')
    const expenseDescription = document.createElement('span')
    const expenseValue = document.createElement('span')
    const expenseCategory = document.createElement('span')
    const imgCategory = document.createElement('img')
    const imgRemove = document.createElement('img')

    // Adiciona os IDs necessários para a estilização
    expenseIcon.id = 'expense-icon'
    expenseDescription.id = 'expense-description'
    expenseValue.id = 'expense-value'
    expenseCategory.id = 'expense-category'

    imgCategory.src = `assets/icons/${imagesNames[expense.category].nameImage}.svg`
    imgRemove.src = 'assets/icons/remove.svg'
    imgRemove.style.cursor = 'pointer'

    imgRemove.addEventListener('click', () => {
      expenses = expenses.filter(item => item.id !== expense.id)

      saveExpenses()
      renderExpenses()
    })

    expenseDescription.textContent = expense.title
    expenseCategory.textContent = expense.category
    expenseValue.textContent = `R$ ${formatCurrencyBRL(expense.amount)}`

    expenseIcon.append(imgCategory)
    expenseDescription.append(expenseCategory)
    expenseValue.append(imgRemove)

    li.append(expenseIcon, expenseDescription, expenseValue)
    expenseList.append(li)
  })

  // Atualiza a quantidade de despesas
  const count = expenses.length

  countExpenseElement.textContent = `${count} ${count === 1 ? 'despesa' : 'despesas'}`

  // Recalcula o valor total
  totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)

  document.querySelector('#total-value').textContent = formatCurrencyBRL(totalAmount)

  // Atualiza a mensagem de lista vazia
  emptyList()
}

const countExpenseElement = document.querySelector('#count-expense')

const imagesNames = {
  Alimentação: {
    nameImage: 'food'
  },
  Hospedagem: {
    nameImage: 'accommodation'
  },
  Transporte: {
    nameImage: 'transport'
  },
  Serviços: {
    nameImage: 'services'
  },
  Outros: {
    nameImage: 'others'
  },
}

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

  //adiciona o R$ no input, e se tiver vazio remove. E formata para o padrao brasileiro
  amountInput.value = amount ? `R$ ${formatCurrencyBRL(amount)}` : ''
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

  //retorna para o submit verificar tudo foi preenchido para ser cadastrado
  return hasValue && hasCategory && hasTitle
}

//formata para ficar com 2 casas decimais e virgula
function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return value
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (validateForm()) {
    const titleValue = titleInput.value.replace(
      /(^\w{1})|(\s+\w{1})/g,
      letra => letra.toUpperCase()
    )

    const categoryValue = categorySelect.options[categorySelect.selectedIndex].textContent

    const amountValue = amountInput.value

    const numericAmount = Number(
      amountValue.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
    )

    // Adiciona a nova despesa ao array
    expenses.push({
      id: crypto.randomUUID(),
      title: titleValue,
      category: categoryValue,
      amount: numericAmount
    })

    // Salva e atualiza a lista
    saveExpenses()
    renderExpenses()

    // Limpa os campos após a inserção
    titleInput.value = ''
    categorySelect.value = 0
    amountInput.value = ''

    // Coloca o foco no título
    titleInput.focus()
  }
})

function emptyList() {
  expenseList.classList.toggle('hide-empty-message', expenseList.querySelectorAll('li').length !== 1)
}

// Exibe as despesas salvas ao carregar a página
renderExpenses()

