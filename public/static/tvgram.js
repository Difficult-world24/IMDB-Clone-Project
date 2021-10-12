

	export async function RequestInfo(showName){
		//this method is importent it returns whether the is exist or not!
		console.log('Requesting Show...');
		try{
			const ShowRequest = await axios.get('http://api.tvmaze.com/singlesearch/shows',{params:{q:showName}})
			return ShowRequest.data;
		}catch(err){
			throw err;
		}
	}


	export async function RequestSeasons(showID){
		// if no argument were given then return the array of seasons!
		console.log("Requesting Seasons...");
			try{
			const SeasonsRequest = await axios.get(`http://api.tvmaze.com/shows/${showID}/seasons`)
			return SeasonsRequest.data;
		}catch(err){
			throw err;
		}
	}

	export async function RequestSeasonEpisode(seasonID){
		console.log(`Requesting Season Episodes...`);
			try{
				const EpisodesRequest = await axios.get(`http://api.tvmaze.com/seasons/${seasonID}/episodes`)
				return EpisodesRequest.data;
			}catch(err){
				throw err;
			}
	}

