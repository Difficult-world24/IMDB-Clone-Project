let form = document.getElementById('formContainer')
let noteSec = document.getElementById('cards-sec')


form.addEventListener('submit', submitForm)
noteSec.addEventListener('click',showModal)




function submitForm(e){
    let noteObj = {
        title:e.target.title.value,
        note:e.target.note.value,
        created:Date()
    }
    CreateCard(noteObj.title,noteObj.note,noteObj.created)
    e.preventDefault()
}

function CreateCard(title,note,created){

    let cards_sec = document.getElementById('cards-sec')

    //Create Card
    let div = document.createElement('div')
    div.setAttribute('title',created.slice(0,25))
    div.className = 'card m-4'

    div.innerHTML =  `
          <div class="card-body">
                <h5 class="card-title fs-2 border-bottom p-2">${title}</h5>
                <p class="card-text fs-5">${note}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Read More!</button>
            </div> 
    `   
    cards_sec.prepend(div)

    let total_notes = document.querySelector('h2 span')
    total_notes.textContent = cards_sec.childElementCount

}

/*

NOTE: The "read more" button will disabled if the paragraph length is less then 18


*/
function showModal(e){

    let modalDiv = document.getElementById('myModal')

    let modal = {
     title: modalDiv.querySelector('.modal-title'),
     paragraph : modalDiv.querySelector('.modal-body p'),
     modalDate : modalDiv.querySelector('.modal-footer .date')
    }

    if(e.target.classList.contains('btn')){
        let cardDiv = e.target.parentElement.parentElement
        
        modal.title.textContent = cardDiv.querySelector('h5.card-title').textContent
        modal.paragraph.textContent = cardDiv.querySelector('p.card-text').textContent
        modal.modalDate.textContent = cardDiv.getAttribute('title')

        
    }


}

