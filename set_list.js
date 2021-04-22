window.localStorage.setItem('curr_index', 0); 
window.localStorage.setItem('last_index', 0);
window.localStorage.setItem('stop_index', 0); 
window.localStorage.removeItem('results');

fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'fileInput';
fileInput.style.display = 'none';
fileInput.onchange = function(e) {
  var file = e.target.files[0];
  
  if (!file)
    return;

  var reader = new FileReader();
  
  reader.onload = function(d) {
    window.localStorage.setItem('list', d.target.result); 
  }

  reader.readAsText(file);
};

document.body.appendChild(fileInput);
fileInput.click();

