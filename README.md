# Ivory - Mastodon RSS Bot
[![Build Status](https://travis-ci.org/skhameneh/ivory.svg?branch=master)](https://travis-ci.org/skhameneh/ivory)  
  
RSS bot for Mastodon

## Usage
  
No need to clone the repo, copy and edit the [docker-compose.yml](https://github.com/skhameneh/ivory/blob/master/docker-compose.yml "docker-compose.yml") file and run:
```
docker stack deploy -c docker-compose.yml ivory
```

And if you don't have an Oauth token, see:  
https://tinysubversions.com/notes/mastodon-bot/

env.MASTODON_TOKEN  
env.MASTODON_TIMEOUT || 60000  
env.MASTODON_URL || 'https://mastodon.engineering/api/v1/'  
env.RSS_URL  
env.UPDATE_INTERVAL || 600000  

## Credits

Shawn Khameneh: Author  
  
And thanks to the many contributors on npm!


## License

Apache License 2.0