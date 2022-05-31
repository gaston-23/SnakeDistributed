// import client from './redis.js';


// window.onload = function(){

  // let front = "http://10.64.64.71:3000"
  let front = "http://localhost:3000"
  let scores = [];
  try {
    const ws = new WebSocket("ws://localhost:3001");
    
    ws.onopen = function open(ev) {
      // ws.send('new_score' ,{channel: 'new_score' , name: 'Guest001', score: 111 });
      // sendValue({ name: 'Guest001', score: 111 })
    };
    console.log(ws);

    // ws.send('new_score' ,{channel: 'new_score' , name: 'Guest001', score: 111 });
    ws.onmessage = ({data}) => {
      let message =  JSON.parse(data);
      scores = message;
      console.log(message);
      writeScores(scores)
    }
    // getTable()

    document.addEventListener('itemInserted',(e)=>{
      let name = document.getElementById("name").value;
      if (name == ''){
        name = 'null'
      }
      // sendValue({ name: name, score: e.value });
      console.log(ws);
      ws.send(JSON.stringify({ name: name, score: e.value }))
    },false)
  } catch(err) {
    console.log(err);
  }
  var originalSetItem = localStorage.setItem; 

  // function sendValue(val) {
  //   var xhr = new XMLHttpRequest();
  //     xhr.open("POST", `${front}/?name=${val.name}&score=${val.score}`, true);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.onerror= (ev)=>{
  //       console.log('oe',ev);
  //     }
  //     xhr.send();
  //     // getTable();
  // }
  // function getTable(){
  //   var xhr = new XMLHttpRequest();
  //     xhr.open("GET", `${front}/tables`, true);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.onerror= (ev)=>{
  //       console.log('oe',ev);
  //     }
  //     setTimeout(() => {
  //       console.log(xhr);
  //       console.log(xhr.status);
  //       if (xhr.status == 200){
  //         console.log('222');
  //         let data = JSON.parse(xhr.response)
  //         console.log(data);
  //         let scores = data.resp;
  //         writeScores(scores)
  //       }
  //     }, 1000);
  //     xhr.send();
      
  // }
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

