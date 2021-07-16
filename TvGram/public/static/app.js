import {RequestInfo,RequestSeasonEpisode,RequestSeasons} from './tvgram.js'

//General Grabing
const searchForm = document.querySelector('.input-group')
const showContainer = document.querySelector('.show-container')
const btnContainer = document.querySelector('.btns')
const EpisodeContainer = document.querySelector('.episodes')


searchForm.addEventListener('submit',async function(evt){
	evt.preventDefault()
	const{showname} = this.elements;

	let info =  await RequestInfo(showname.value)
	let seasonsBtn = await RenderSeasonsBtn(info.id)
	//Adding Show info and removing the previous one's
	showContainer.removeChild(showContainer.firstChild)
	showContainer.prepend(RenderInfo(info))

	//Adding Season Buttons and removing he previous one's
	btnContainer.removeChild(btnContainer.firstChild)
	btnContainer.append(seasonsBtn.buttons)

	//Adding Episodes and removing the prvious one's
	EpisodeContainer.removeChild(EpisodeContainer.firstChild)
	await RenderEpisodes(seasonsBtn.firstSeasonid)

	showname.value = ''


})

showContainer.addEventListener('click', function(evt){
	// sbtn is "Season Button", in dropdown menu in between episodeContainer and InfoContainer
    if(evt.target.classList.contains('sbtn')){
		let spanBtn = showContainer.querySelector('#btnGroupDrop1').querySelector('span');
		spanBtn.textContent = evt.target.textContent

		//Removing element for EpisodeContainer then appending Episodes element!
		EpisodeContainer.removeChild(EpisodeContainer.firstChild)
		RenderEpisodes(evt.target.dataset.sid)
    }
	//showing and hiding summary paragraph
	if(evt.target.classList.contains('summbtn')){
		evt.target.querySelector('img').classList.toggle('icnrote')
		showContainer.querySelector('.summ').classList.toggle('d-none')
	}
})



function RenderInfo(data){
    let textCol = 'text-danger'
    if(data.status !== 'Ended'){
        textCol = 'text-success'
    }
	let img = 'http://placehold.jp/24/1c1f23/ffffff/250x50.png?text=no+image+found' //Default image if correct not found!
	if(data.image !== null){
		img = data.image.medium;
	}

    const dataString = document.createElement('section')
    dataString.className = 'container border rounded mb-2 p-2'
     dataString.innerHTML = `
			<div class="row">
				<div class="col-md-4 border-end info mb-1">
					<img src="${img}" alt="showPoster"
						class="rounded shadow mb-2">
					<h5 class="card-title mb-0">${data.name}</h5>
				</div>
				<div class="col-md font-monospace">
					<div class="ps-1">
						<h6 class="mb-0 fs-2">${data.rating.average}/10⭐</h6>
						<p class="lead">${data.genres}</p>
					</div>
					<ul class="list-group-items p-0 mb-1">
						<li class="list-group-item">Language: <span>${data.language}</span></li>
						<li class="list-group-item">Status: <span class="${textCol}">${data.status}</span></li>
						<li class="list-group-item">RunTime: <span>${data.runtime}</span></li>
						<li class="list-group-item">Premiered: <span>${new Date(data.premiered).toDateString()}</span></li>
						<li class="list-group-item">Type: <span>${data.type}</span></li>
					</ul>
					<button
						class="btn summbtn btn-dark w-100 mb-2 d-flex justify-content-between align-items-center">Story
						Summary
						<img src="assets/expand_more_white_36dp.svg" alt="expand more" class="float-end">
					</button>
				</div>
			</div>
			<div class="row summ d-none">
            ${data.summary}
            </div>
	
    `
	return dataString;
	/*
	This function returns HTML Element String of show info such as status, air date and so on!
	*/
}

async function RenderSeasonsBtn(showId){
    let data = await RequestSeasons(showId)
	//Creating season buttons container
	let btnGroup = document.createElement('div')
	btnGroup.className = 'btn-group-vertical ps-2 font-monospace'
	//making un-ordered list for season no buttons	
	let ul = document.createElement('ul')
	ul.className = "dropdown-menu seasons-cont p-1"

    let listItems = '' // Single listiItem String
    for(let item of data){
        let li = `
        <li>
           <button class="dropdown-item sbtn btn btn-outline-primary mb-2" data-sid="${item.id}">${item.number}</button>
        </li>
        `
        listItems += li;
    }
	ul.innerHTML = listItems
	btnGroup.innerHTML = `
	<button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
				aria-expanded="false">
				Season <span class="badge bg-dark">1</span>
			</button>
	`
	btnGroup.append(ul)
	return {'buttons':btnGroup, firstSeasonid:data[0].id} 
	/* buttons property contains div of season number button's markup!
		"FirstSeasonid" contains current show's first season id in order to show the first seasons's episode on search!
		
	*/
}

async function RenderEpisodes(sid){
	//sid is short for "SeasonID"
    const data = await RequestSeasonEpisode(sid)
	
    let dataString = ''
    for(let item of data){

	let img = 'http://placehold.jp/24/1c1f23/ffffff/250x50.png?text=no+image+found' // Some episodes don't have image so that is default!
	if(item.image !== null){
		img = item.image.medium;
	}
		
    let itemString =`
    			<div class="card mb-3 p-2">
				<div class="row g-0 align-items-center border-bottom">
					<div class="col-md-4">
						<img src="${img}"
							class="img-fluid rounded shadow ms-3 mb-3" alt="Show Poster">
					</div>
					<div class="col-md-8">
						<ul class="list-items font-monospace ps-1">
							<li class="list-group-item">Title: <span>${item.name}</span></li>
							<li class="list-group-item">First Air: <span>${new Date(item.airdate).toDateString()}</span></li>
							<li class="list-group-item">Episode: <span>${item.number}</span></li>
							<li class="list-group-item">Season: <span>${item.season}</span></li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="card-body p-1">
							<p class="card-text">
							${item.summary}
							</p>
						</div>
					</div>
				</div>
			</div>
    `
    dataString += itemString;
    }
	EpisodeContainer.innerHTML = dataString //This contains Episode card HTML markup!
}


