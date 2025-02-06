const canvas = document.getElementById("canvas");
const offscreen = canvas.transferControlToOffscreen();

const workerCode = document.querySelector('#workerCode').textContent;
const blob = new Blob([workerCode], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);

var worker;


function startWorker() {
  var hasOffscreenSupport = !!canvas.transferControlToOffscreen;
  if (hasOffscreenSupport) {
    if(typeof(Worker) !== "undefined") {

      var workerName = 'Worker1';
      if (worker == null) {
       worker = new Worker(url);
       worker.postMessage({ msg: 'start', name: workerName, canvas: offscreen },
             [offscreen]);
      } else {
        worker.postMessage({ msg: 'start', name: workerName });
      }

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
  } else {
    canvas
      .getContext('2d')
      .fillText(
      'Sorry, your browser does not support Offscreen rendering...',
      20,
      20
      );
  }
}

function pauseWorker() {
		var workerName = 'Worker1';
		worker.postMessage({msg: 'stop', name: workerName});
		// worker.terminate();
		// worker = undefined;
}