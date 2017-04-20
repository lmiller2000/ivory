var FeedParser = require('feedparser')
var request = require('request')

var Masto = require('mastodon')

var M = new Masto({
	access_token: process.env.MASTODON_TOKEN,
	timeout_ms: process.env.MASTODON_TIMEOUT || 60000,
	api_url: process.env.MASTODON_URL || 'https://mastodon.engineering/api/v1/'
})

let guids = []
let newItems = []
let firstCall = true


let postItem = (item)=>{
	M.post('statuses', {
		status: item.title + ' \n' + item.link,
		visibility: 'public',
	})
}

let update = ()=>{
	let feedparser = new FeedParser()
	
	feedparser.on('error', (error)=>{
	  // do something
	  console.log('ERROR', error)
	})

	feedparser.on('readable', ()=>{
		let stream = feedparser
		let meta = stream.meta
		let item
		
		let itemsToAdd = []
		
		while(item = stream.read()) {
			if(guids.indexOf(item.guid) === -1) {
				guids.push()
				
				newItems.push({
					guid: item.guid,
					title: item.title,
					description: item.description,
					link: item.link,
					author: item.author
				})
				
				if(guids.length > 200) {
					guids.shift()
				}
			}
		}
	})

	feedparser.on('end', (err)=>{
		if(firstCall) {
			console.log('First call, ignoring results, count ' + newItems.length + '.')
			firstCall = false
			newItems = []
			return
		}
		console.log('Posting new items, count ' + newItems.length + '.')
		for(let item of newItems) {
			console.log('Item', item)
			postItem(item)
		}
		newItems = []
	})
	
	console.log('Requesting RSS feed.')
	let req = request(process.env.RSS_URL)
	req.on('response', function(res) {
		let stream = this

		if (res.statusCode !== 200) {
			this.emit('error', new Error('Bad status code'))
		} else {
			console.log('Streaming RSS response to parser.')
			stream.pipe(feedparser)
		}
	})
}

setInterval(update, process.env.UPDATE_INTERVAL || 600000)
update()

console.log('Started.')