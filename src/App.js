import './App.css';
import Intro from './components/intro'
import Name from './components/name';
import ChatResponse from './components/chatResponse';
import Decades from './components/decades';
import GenerateSitcom from './components/generateSitcom';
import ThreeTopics from './components/threeTopics';

function App() {
  
  
  return (
   <>
    <main>
      {/* <div className='container'> */}
        <Intro step={ 1 } />
        <Name step={ 2 } />
        <Decades step={ 3 } />
        <ThreeTopics step={ 4 } />
        <GenerateSitcom step={ 5 } />
        <ChatResponse step={ 6 } />
      {/* </div> */}
    </main>
   </>
  );
}


export default App;
