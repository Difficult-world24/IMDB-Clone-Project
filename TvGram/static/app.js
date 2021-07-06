const summaryBtn = document.querySelector('.summbtn')
const summary = document.querySelector('.summ')
summaryBtn.addEventListener('click',function(){
    this.querySelector('img').classList.toggle('icnrote')
    summary.classList.toggle('d-none')
})


	async function RequestInfo(showName){
		//this method is importent it returns whether the is exist or not!
		console.log('Requesting Show...');
		try{
			const ShowRequest = await axios.get('http://api.tvmaze.com/singlesearch/shows',{params:{q:showName}})
			return ShowRequest.data;
		}catch(err){
			throw err;
		}
	}


	async function RequestSeasons(showID){
		// if no argument were given then return the array of seasons!
		console.log("Requesting Seasons...");
			try{
			const SeasonsRequest = await axios.get(`http://api.tvmaze.com/shows/${showID}/seasons`)
			return SeasonsRequest.data;
		}catch(err){
			throw err;
		}
	}

	async function RequestSeasonEpisode(seasonID){
		console.log(`Requesting Season Episodes...`);
			try{
			const EpisodesRequest = await axios.get(`http://api.tvmaze.com/seasons/${seasonID}/episodes`)
			return EpisodesRequest.data;
		}catch(err){
			throw err;
		}
	}





async function Requesting(){
	const itself = await RequestInfo('13rw')
	console.log(itself);
	// const seasons = await RequestSeasons(itself.id)
	// console.log(seasons);
	// const episode = await RequestSeasonEpisode(seasons[3].id)
	// console.log(episode);
}

const data = {

    "id": 36666,
    "url": "https://www.tvmaze.com/shows/36666/looking-for-alaska",
    "name": "Looking for Alaska",
    "type": "Scripted",
    "language": "English",
    "genres": [
        "Drama",
        "Romance"
    ],
    "status": "Ended",
    "runtime": 60,
    "averageRuntime": 60,
    "premiered": "2019-10-18",
    "officialSite": "https://www.hulu.com/series/looking-for-alaska-de237b2b-f39a-437a-ab5c-610c50298c20",
    "schedule": {
        "time": "",
        "days": []
    },
    "rating": {
        "average": 7.7
    },
    "weight": 75,
    "network": null,
    "webChannel": {
        "id": 2,
        "name": "Hulu",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        }
    },
    "dvdCountry": null,
    "externals": {
        "tvrage": null,
        "thetvdb": 359638,
        "imdb": "tt3829868"
    },
    "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/209/523206.jpg",
        "original": "https://static.tvmaze.com/uploads/images/original_untouched/209/523206.jpg"
    },
    "summary": "<p><b>Looking for Alaska</b> thrusts us into the perspective of Miles \"Pudge\" Halter who is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave \"the Great Perhaps\" even more (Francois Rabelais, poet). He heads off to the sometimes crazy and anything-but-boring world of Culver Creek Boarding School, and his life becomes the opposite of safe. Because down the hall is Alaska Young. The gorgeous, clever, funny, sexy, self-destructive, screwed up, and utterly fascinating Alaska Young. She is an event unto herself. She pulls Pudge into her world, launches him into the Great Perhaps, and steals his heart. Then. . . After. Nothing is ever the same.</p>",
    "updated": 1616881125,
    "_links": {
        "self": {
            "href": "https://api.tvmaze.com/shows/36666"
        },
        "previousepisode": {
            "href": "https://api.tvmaze.com/episodes/1665509"
        }
    }













}