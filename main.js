var index = 0;
const workers = new Map();
var dataURL = '';

var openFile = function(event) {
	var input = event.target;

	var reader = new FileReader();
	console.log('test');
	reader.onload = function(){
		
		// //convert string to blob
		// const str2blob = (txt) => new Blob([txt]);
		// //blob converted to URL
		// const url = URL.createObjectURL(str2blob('console.log("string worker")'));
		
	  dataURL = reader.result;
	  console.log(dataURL);
	  
	  
	  
	  // var output = document.getElementById('output');
	  // output.src = dataURL;
	  
	};
	// reader.readAsText(input.files[0]);
	reader.readAsDataURL(input.files[0]);	
}


function startWorker() {
	
  if(typeof(Worker) !== "undefined") {
	  
	var workerIndex = index++;
	var workerName = 'Worker' + workerIndex;
	var worker =  new Worker(dataURL);
	// alert('worker' + worker);
	workers.set(workerName, worker);
	
	// alert('Posting message');
	worker.postMessage([workerName, 'Start']);
	
	worker.addEventListener("message", e => {
		// alert('Waiting for worker response');
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
		// alert('Stopping worker' + workerName);
		var worker = workers.get(workerName);
		worker.postMessage([workerName, 'Stop']);		
		workers.delete(workerName);		
		// worker.terminate();
		// worker = undefined;
  }
  
  document.getElementById("resort").innerHTML = "";
}