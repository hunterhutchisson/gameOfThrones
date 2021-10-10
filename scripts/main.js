$(() => {
    let pageNum = 0;
    let charArr = []
    function getNames(pageNum){
        $.get(`https://www.anapioficeandfire.com/api/characters?page=${pageNum}&pageSize=50`)
        .done((response) => {
            if(response.length > 0){
                pageNum++;
                charArr = [...charArr, ...response]
                getNames(pageNum)
            }
            else{
                let container = document.querySelector('#attach-here')
                for (let index = 0; index < charArr.length; index++){
                    let charObj = charArr[index];
                    let allegianceList = charObj.allegiances
                    let row = document.createElement('div')
                    row.setAttribute('class', 'row')
                    row.innerHTML = '<hr>'
                    let divTotal = document.createElement('div')
                    divTotal.setAttribute('class', "dropdown")
                    let divName = document.createElement('div')
                    if (charObj.name != ""){
                        divName.textContent =`${charObj.name}`
                    }
                    else{
                        divName.textContent = `${charObj.aliases[0]}`
                    }
                    console.log(divName);
                    let button = `
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        ${allegianceList.length} houses
                    </button>`
                    let ul = document.createElement('ul')
                    ul.setAttribute('class', 'dropdown-menu')
                    ul.setAttribute('style', 'padding: 10px;')
                    if (allegianceList.length>0){
                        allegianceList.forEach(element => {
                            let li = document.createElement('li')
                            $.get(`${element}`)
                            .done((response) => {
                                li.textContent = `${response.name}`
                                ul.appendChild(li)
                            })
                        });
                    }
                    else{
                        ul.textContent = 'no loyalty'
                    }
                    divTotal.innerHTML += button
                    divTotal.appendChild(ul)
                    row.appendChild(divName)
                    row.appendChild(divTotal)
                    container.appendChild(row)
                    }
            }
            })
    }
getNames(pageNum)
})




