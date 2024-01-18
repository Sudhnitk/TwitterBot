const Twit = require('twit');
require('dotenv').config();

const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const T = new Twit(twitterConfig);

const hashtagToTrack = 'WorkFromHome';

const stream = T.stream('statuses/filter', { track: `#${hashtagToTrack}` });

stream.on('tweet', (tweet) => {
  T.post('favorites/create', { id: tweet.id_str }, (err) => {
    if (err) {
      console.error('Error liking tweet:', err);
    } else {
      console.log('Liked:', tweet.text);
    }
  });

  T.post('statuses/retweet/:id', { id: tweet.id_str }, (err) => {
    if (err) {
      console.error('Error retweeting tweet:', err);
    } else {
      console.log('Retweeted:', tweet.text);
    }
  });
});
