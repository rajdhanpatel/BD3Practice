//BD3Practice session

const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let watchlist = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://www.w3schools.com/js/',
  },
  {
    videoId: 2,
    title: 'Node.js Basic',
    watched: true,
    url: 'https://www.w3schools.com/js/',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://www.w3schools.com/js/',
  },
];

//1. update watched status by videoID
function UpdateWathchedData(watchlist, videoID, getWatchedInBooleanFromQuery) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].videoId === videoID)
      watchlist[i].watched = getWatchedInBooleanFromQuery;
  }
  return watchlist;
}
app.get('/watchlist/update', (req, res) => {
  let videoID = parseInt(req.query.videoId);
  let getWatchedInBooleanFromQuery = req.query.watched === 'true';
  let result = UpdateWathchedData(
    watchlist,
    videoID,
    getWatchedInBooleanFromQuery
  );
  res.json(result);
});

// delete object by videoId
// we will not use any delete method. we use only filter method to skip that videoId

function deleteByVideoID(oneObj, videoIDFromQueryParam) {
  //return oneObj.vidoeId == videoIDFromQueryParam; //using this line output will be obj who are having videoIDFromQueryParam

  return oneObj.videoId != videoIDFromQueryParam;
}
app.get('/watchlist/delete', (req, res) => {
  let videoIDFromQueryParam = req.query.videoId;
  let storeInArr = watchlist.filter((oneObj) =>
    deleteByVideoID(oneObj, videoIDFromQueryParam)
  );
  res.json(storeInArr);
});

// find the name amit and if present return that name else say does not exist
names = ['amit', 'site', 'Sita', 'RaHUl'];

function findByName(oneEle, nameFromParam) {
  return oneEle === nameFromParam;
}
app.get('/names/find/:name', (req, res) => {
  let nameFromParam = req.params.name;
  let returnName = names.find((oneEle) => findByName(oneEle, nameFromParam));
  if (!returnName) res.json({ success: false, name: 'name does not exist' });
  res.json({ name: returnName });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
