const form = document.getElementById("Conv_form")
const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency")
const ConvertedAmount = document.getElementById("ConvertedAmount")
const toCurrency = document.getElementById("toCurrency")
const button = document.getElementById("Conv_Button")
const loading = document.querySelector(".loading")
const result = document.querySelector(".result")
const error = document.querySelector(".error")
const API_URL = "https://api.exchangerate-api.com/v4/latest/"



async function convertMoney() {


    /*O css foi chamado para alterar o display do loading de none para block*/
    loading.style.display = "block"
    error.style.display = "none"
    result.style.display = "none"

     if(fromCurrency.value === toCurrency.value){
        loading.style.display = "none"
        error.style.display = "block"
        error.innerHTML = "Selecione moedas distintas"
        return
     }

    

    /*Tenta acessar o servidor*/
    try {
        
        const response = await fetch(API_URL + fromCurrency.value)
        const data = await response.json()

        const rate = data.rates[toCurrency.value]
        const convertedValue = (amount.value * rate).toFixed(3)

        ConvertedAmount.value = convertedValue
        result.style.display = "block"
        loading.style.display = "none"

        result.innerHTML =
                `<div style="font-size: 1.4rem;">
                        ${amount.value} ${fromCurrency.value} = ${ConvertedAmount.value} ${toCurrency.value}
                  </div>
                  <div style="font-size: 0.7rem; opacity: 0.8;">
                       Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
                  </div>`


    /*Serve para caso ocorra um erro ao acessar o servidor*/
    } catch (err) {
        error.style.display = "block"
        error.innerHTML = "Ocorreu um erro ao acessar o servidor"


    }
}


addEventListener("submit", (e) => {
    e.preventDefault()
    convertMoney()
})