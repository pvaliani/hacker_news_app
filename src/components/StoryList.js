// import Story component into the Story List we are rendering
import Story from "./Story";

// destructure the stories being passed to the list
const StoryList = ({stories}) =>{
    // not rendering the storylist here we pass the story through and render that
    const storyNodes = stories.map((story, index)=>{
        return (<Story story={story} index={index+1}/>);
    });

    return (
        <div style={{background: "#fffdd0"}}>
        {storyNodes}
        </div>
    );
}

export default StoryList;



