const workerCode = document.querySelector('#workerCode').textContent;
const blob = new Blob([workerCode], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);

var index = 0;
const workers = new Map();

function startWorker() {
	
  if(typeof(Worker) !== "undefined") {

	var workerIndex = index++;
	var workerName = 'Worker' + workerIndex;
	var worker =  new Worker(url);
	workers.set(workerName, worker);

	worker.postMessage([workerName, 'Start']);
	
	worker.addEventListener("message", e => {
		if (e.data) {
			const listItem = document.createElement("li"); 
			listItem.textContent = e.data[0] + '|' + e.data[1];				
			resort.appendChild(listItem);
		}
	})	
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
  }
}

function stopWorkers() {

  while(workers.size > 0) {
		var workerIndex = --index;
		var workerName = 'Worker' + workerIndex;
		var worker = workers.get(workerName);
		worker.postMessage([workerName, 'Stop']);		
		workers.delete(workerName);		
		// worker.terminate();
		// worker = undefined;
  }
  
  document.getElementById("resort").innerHTML = "";
}