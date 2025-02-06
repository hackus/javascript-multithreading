var index = 0;
const workers = new Map();
var dataURL = '';

var openFile = function(event) {
	var input = event.target;

	var reader = new FileReader();
	console.log('test');
	reader.onload = function(){
		
	  dataURL = reader.result;
	  console.log(dataURL);
	  
	};
	reader.readAsDataURL(input.files[0]);	
}


function startWorker() {
	
  if(typeof(Worker) !== "undefined") {
	  
	var workerIndex = index++;
	var workerName = 'Worker' + workerIndex;
	var worker =  new Worker(dataURL);
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