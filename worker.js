var name;
var i = 0;

self.addEventListener('message', function(e) {	
  if(e.data[1] == 'Start') {	  
	name = e.data[0];
	i = 0;	
	processMessage()		
  } else if(e.data[1] == 'Stop') {	  
	   	console.log('Closing ' + e.data[0]);
		self.close();
  }
});

function processMessage(){
	i++;
	self.postMessage([name, i]);  
	setTimeout('processMessage()', 500)
}