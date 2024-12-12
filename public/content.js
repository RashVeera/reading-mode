function createSidebar(extractedText) {
    let existingSidebar = document.getElementById("reading-mode-sidebar");
    const synth = window.speechSynthesis; 
    if (existingSidebar) {
      existingSidebar.innerText = extractedText;
      return;
    }
  
    const sidebar = document.createElement("div");
    sidebar.id = "reading-mode-sidebar";
    sidebar.style.position = "fixed";
    sidebar.style.top = "0";
    sidebar.style.right = "0";
    sidebar.style.width = "30%";
    sidebar.style.height = "90%";
    sidebar.style.backgroundColor = "#f4f4f4";
    sidebar.style.borderLeft = "1px solid #ccc";
    sidebar.style.overflowY = "auto";
    sidebar.style.padding = "1rem";
    sidebar.style.margin = "1rem";
    sidebar.style.zIndex = "10000"; 
    sidebar.style.fontFamily = "Arial, sans-serif";
    sidebar.style.fontSize = "16px";
    sidebar.style.lineHeight = "1.5";
    sidebar.style.color = "#333";
  
    const textContainer = document.createElement("div");
    textContainer.innerText = extractedText;
    textContainer.style.paddingTop="1rem"
    sidebar.appendChild(textContainer);
  
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "5px 10px";
    closeButton.style.backgroundColor = "#ff5f57";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "3px";


    const SpeechButton = document.createElement("button");
    SpeechButton.innerText = "Speech";
    SpeechButton.style.position = "absolute";
    SpeechButton.style.top = "10px";
    SpeechButton.style.right = "70px";
    SpeechButton.style.padding = "5px 10px";
    SpeechButton.style.backgroundColor = "#ff5f57";
    SpeechButton.style.color = "white";
    SpeechButton.style.border = "none";
    SpeechButton.style.cursor = "pointer";
    SpeechButton.style.borderRadius = "3px";

    const PauseButton = document.createElement("button");
    PauseButton.innerText = "Pause";
    PauseButton.style.position = "absolute";
    PauseButton.style.top = "10px";
    PauseButton.style.right = "140px";
    PauseButton.style.padding = "5px 10px";
    PauseButton.style.backgroundColor = "#ff5f57";
    PauseButton.style.color = "white";
    PauseButton.style.border = "none";
    PauseButton.style.cursor = "pointer";
    PauseButton.style.borderRadius = "3px";
  
    closeButton.onclick = () => {
      sidebar.remove();
      synth.cancel()
    };
    SpeechButton.onclick=()=>{
    const utterThis = new SpeechSynthesisUtterance(extractedText);
    synth.speak(utterThis);

    }

    PauseButton.onclick=()=>{
        synth.pause()
    }

    sidebar.appendChild(closeButton);
    sidebar.appendChild(PauseButton);

    sidebar.appendChild(SpeechButton);
  
    document.body.appendChild(sidebar);
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ExtractText") {
      const extractedText = document.body.innerText; 
      createSidebar(extractedText);
      sendResponse({ success: true });
    }
    return true;
  });
  