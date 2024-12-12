/* global chrome */
import './App.css';


function App() {
  const handleExtracttext =()=>{
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id,{type:'ExtractText'},(response)=>{
        console.log(response.success)
        window.close()
      })
    })

  }

  return (
    <div className="App">
      <h1>Reading Mode</h1>
      <button onClick={handleExtracttext}>Extract text</button>
    </div>
  );
}

export default App;
