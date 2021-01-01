import './App.css';

import {useState, useEffect} from "react";

import StoryList from "./components/StoryList";

function App() { // Container for the articleIds and stories state

  // we are saving the article Id's into the state. So with use effect we are saing when someone writes to that data 
  // need to do a useEffect for when the app starts up and when the state changes - filter, map, reduce, find are mdn functions to look at

  const [articleIds, setArticleIds] = useState([]);
  const [stories, setStories] = useState([]);

  // we'll mod this to pass in a number of of stories i.e the first numStories of id's

  const fetchStoryData = (storyIds, numStories) => {
    // take off the first numStories id's - we'll define the exact number of stories we want below
    const topStories = storyIds.slice(0, numStories);

     // with the numStories ids loop over them i.e the stories array - we are now going to do a fetch for each id on the api for the story id

    // map every url to the promise of the fetch
    let promises = topStories.map(storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`));
    console.log(promises);

    // Promise.all waits until all promises are resolved i.e all the slices we are looking for. Promise.all takes an array of promises, waits for them to be fulfilled then does a then - responses is the array of promises which are returned. Promises.all is the array equivalent of what's going on in the useffect. We are fetching by story ID because each story on hacker news has a separate .json file labelled by that id in the URL i.e id 25605156 corresponds to a story by "ingve". Every single id is a story which has its own .json file. So we want to loop through by storyId in the url.

    // Promise.all waits until all promises are resolved
    Promise.all(promises) //accepts an array of promises
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(stories => setStories(stories));
  }

  useEffect(()=>{
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      // this is the fetch which retrieves all top story ids as a single .json object
    .then((res)=>res.json())
    .then((data)=>{
      // setArticleId's will take this new data i.e all the story ID's from the top 500 stories and store it in the useState
      setArticleIds(data);
    });

  },[]);
  // Initialise empty array as a second argument to stop the app from looping 

  // A fetch returns an object - when we make a call using fetch and it returns a promise object to say it will provide the data - it requires time  because its making a get request to the server - fetch is an asynchronous type. UseEffect watches a part of our state variable i.e article id's then triggers a function. So it watches for an articleID then when there is an article Id it will do a fetch for the actual story object.

  useEffect(()=>{ // watches a part of your state (a single state variable)

    // perform the fetch of story data using the articleId's which have come from setArticleId's in useState, do this for the first 15 stories

    fetchStoryData(articleIds, 15);
  },[articleIds])

  // articleId's array on line 54 means the array i.e program will run for the full list of articleID objects

    // The second useEffect here will watch the articleIDs so when the articleIDs change we want to fetch the story data

  return (
    <div style={{backgroundColor: "#ff6600"}}>
      <h5 >Hacker News Client</h5>
      <StoryList stories={stories}/>
    </div>
  );
}

export default App;