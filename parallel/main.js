const workerCode = document.querySelector('#workerCode').textContent;
const blob = new Blob([workerCode], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);

var worker;
var index = 0;

const workers = new Map();

function startWorker() {
    if(typeof(Worker) !== "undefined") {

      var workerIndex = index++;
      var workerName = 'Worker' + workerIndex;
      var worker =  new Worker(url);
      workers.set(workerName, {index: workerIndex, worker: worker});

      createLi(workerIndex);
      const canvas = document.getElementById("canvas_" + workerIndex);
      const offscreen = canvas.transferControlToOffscreen();

      worker.postMessage({ msg: 'start', name: workerName, canvas: offscreen }, [offscreen]);
    } else {
     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

function stopWorkers() {
    while(workers.size > 0){
      var entry = workers.entries().next().value;
      var workerName = entry[0];
      var worker = entry[1].worker;
      worker.postMessage({msg: 'stop', name: workerName});
      workers.delete(workerName);
    }

    document.getElementById("resort").innerHTML = "";
}

function createCanvas(canvasId){
    return '<canvas id="canvas_' + canvasId + '" width="1000" height="500" style="border: 1px solid;"></canvas>';
}

function createLi(id){
    var listItem = document.createElement("li");
    var child = createCanvas(id);
    listItem.innerHTML = createCanvas(id);
    resort.appendChild(listItem);
}