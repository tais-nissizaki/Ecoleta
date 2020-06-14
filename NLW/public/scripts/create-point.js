/*procurar no site : https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet*/
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    /**função anonima que retorna um valor  (res => res.json() )  */
    .then( (res) => {return res.json() }) 
    .then( states => { 

        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
    
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) 
    .then( cities => { 

        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}







document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

// pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems= document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove javascript class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados, se sim pegar

    const alreadySelected = selectedItems.findIndex(function(item){
        return item == itemId
    })
    // se ja estiver, tirar da seleção
    //encontra index do array
    if(alreadySelected >=0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    //se não adicionar à seleção
    } else {
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}