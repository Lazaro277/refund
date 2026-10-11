const categorySelect = document.querySelector('#category')
const amountInput = document.querySelector('#amount')

categorySelect.addEventListener('focus', () => {
  if (categorySelect.value) {
    categorySelect[0].style.display = 'none'
  }
})

amountInput.addEventListener('input', () => {
  const digits = amountInput.value.replace(/\D/g, '')
  const amount = Number(digits || 0) / 100
  const formattedAmount = amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  amountInput.value = amount ? `R$ ${formattedAmount}` : ''
  amountInput.setSelectionRange(amountInput.value.length, amountInput.value.length)
})

