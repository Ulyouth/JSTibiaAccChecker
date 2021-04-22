# JSTibiaAccChecker

* Script to check a list of Tibia accounts for validity
* Bypasses Cloudflare's "Under Attack" mode
* Inputs/Outputs lists' contents to the local browser's storage, which can be queried/modified using Javascript
* Cannot be weaponized (easily) since your IP will get blocked in no time if you have no method of changing it dynamically
* Even if you can do that, it still runs pretty darn slow and you won't be able to check a large amount of data with it (unless you are also creative 🙃)
* Intended only to be a "Proof-of-Concept"

# Usage

First of all, you'll probably need a browser extension to run the code, since simply copying and pasting it onto the address bar will only run the code once, but it must run continuosly instead. I used the **Custom JavaScript for Websites 2** myself, which you can download from the link below:

https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk

Next you should do the following:
* Run the contents of the 'set_list.js' anywhere on the Tibia domain
* If the 'Select file' window doesn't pop up automatically, click on some link to trigger it
* Select the list to be checked
* Run the contents of 'tibia.js'
* Sit back and watch the magic happen! 🧙🏻‍♂️

To extract the results you can run the following code directly on the browser's console and save the results somewhere:

`console.log(window.localStorage.getItem('results'))`
