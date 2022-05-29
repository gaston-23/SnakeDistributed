// import client from './redis.js';

// window.onload = function(){
  let scores = [];
  try {
    const ws = new WebSocket("ws://localhost:3001/data");
    
    ws.onopen = function open() {
      ws.send('getAll');
      // sendValue({ name: 'Guest001', score: 111 })
    };
    ws.onmessage = ({data}) => {
      let message =  JSON.parse(data);
      scores = message;
      console.log(message);
      writeScores(scores)
    }
    

    document.addEventListener('itemInserted',(e)=>{
      console.log({ name: 'Gast404', score: e.value });
      let name = document.getElementById("name").value;
      if (name == ''){
        name = 'null'
      }
      sendValue({ name: name, score: e.value })
      // ws.send({ name: 'Gast404', score: e.value })
    },false)
  } catch(err) {
    console.log(err);
  }

  var originalSetItem = localStorage.setItem; 

  function sendValue(val) {
    var xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:3000/?name=${val.name}&score=${val.score}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
  }
// } 
function writeScores(s) {

  for (let i = 0; i < s.length; i++) {
    
    var htmlWrapper = document.getElementById(i);
    var htmlTemplate = `<span >${s[i].name+': '+s[i].score}</span>` ;
    htmlWrapper.innerHTML = htmlTemplate;

    // var tag = document.createElement("p"); // <p></p>
    // let getter = client.get(i)
    // if (getter) {
      // var text = document.createTextNode(JSON.parse(getter));
      // var text = document.createTextNode(s[i].name+': '+s[i].score);
      
      // tag.appendChild(text); // <p>TEST TEXT</p>
      // var element = document.getElementsByTagName("body")[0];
      // element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>
    // }
  }
}

