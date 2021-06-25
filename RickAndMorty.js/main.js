const container = document.querySelector('.container')

const refBtn = document.querySelector('.btn-success')



async function FetchApi(start){
    try{
        const request = await fetch(`https://rickandmortyapi.com/api/character/${start}`)
        const response = await request.json()
        return response
    }catch(err){
        console.error(err)
    }
    
    
}


function ShowCharacters(resObj){

    if(resObj.status == 'Alive'){
        var stat = 'success'
    }else if(resObj.status == 'Dead'){
        var stat = 'danger'
    }else{
        var stat = 'secondary'
    }


    let content  = `
    <div class="card px-2 pt-2 border-dark rounded m-2 " style="width: 18rem;">
    <img src="${resObj.image}" class="card-img-top" alt="...">
            <div class="card-body ps-0 pb-1">
            <h2 class="card-title ps-2">${resObj.name}</h2>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Species <span id="specie" class="badge bg-secondary float-end">${resObj.species}</span>
            </li>
            <li class="list-group-item">Status <span id="stat" class="badge bg-${stat} float-end">${resObj.status}</span>
            </li>
            <li class="list-group-item">Gender <span id="gen" class="badge bg-primary float-end">${resObj.gender}</span>
            </li>
            </ul>
            </div>
            </div>
            `
            container.innerHTML = content 
        }
        
        
        
        
        


function getChar(){
    FetchApi(Math.floor(Math.random() * 670) + 1)
    .then((data) => ShowCharacters(data))
    .catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', getChar)


refBtn.addEventListener('click', getChar)
