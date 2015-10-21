var global_Username;
var global_Game;
var global_StaffName;
var global_AcceptMessage;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	/* Get the Username */
	var res = request.source.split("line popupctrl");
	if(res.length > 1)
	{
		var staffUntidy = request.source.split("span");
		var temp = staffUntidy[1].split(">");
		staffUntidy = temp[1].split("<");
		
		global_StaffName = staffUntidy[0];
		
		var nameUntidy = res[1].split("strong");
		if(nameUntidy.length > 1)
		{
			var nameTidy = nameUntidy[1].split(">");
			if(nameTidy.length > 2)
			{
			  nameUntidy = nameTidy[2].split("<");
			
			  
			}
			else
			{
			  nameUntidy = nameTidy[1].split("<");
			}
			var userName = nameUntidy[0];
	          global_Username = userName;
			  
			  
			  /* Get the game that has been applied to */
			  var resTitle = request.source.split("threadtitle");
			  if(resTitle.length > 1)
			  {
				  var titleUntidy = resTitle[1].split(">");
				  if(titleUntidy.length > 2)
				  {
					  var Title = titleUntidy[2].substring(0,titleUntidy[2].length - 3);
					  var Game = Title.substring(userName.length + 29);
					  if(Game == "CS:GO")
					  {
					    /* There's a difference between the application and the interview tool */
						Game = "Counter Strike";
					  }
					
					  if(Game == "DOTA")
					  {
						  /* There's a difference between the application and the interview tool */
						  Game = "Dota 2";
					  } 						
					
	                  global_Game = Game;
					  // print out the message
					  message.innerText = Title + "\n\n Username: " + userName + "\n" + "Game : " + Game;
				
				  }
				  else
				  {
					  message.innerText = "Error: Title Untidy Split is smaller than 2";
				  }

			}else
			{
				message.innerText = "Error: NameTIdy is smaller than 3";
			}
		}
		else
		{
			message.innerText = "Error: Username Untidy Split is smaller than 2";
		}
	}
	else
	{
		message.innerText = "Error: Username Split is smaller than 2";
	}

	
	
  }
});

function click(e) {
	
	global_AcceptMessage = "Hello " + global_Username + "! I have [B][COLOR=\"#00FF00\"]accepted[/COLOR][/B] your application. \\n \\n \
Feel free to join us on TeamSpeak at [U]ts3.thechaosvanguard.co.uk[/U] and hop down to the " + global_Game + " Waiting Room in the Applicants area. It is located at the top just below the Main Lobby. From there, you can poke a " + global_Game + " moderator or recruiter to help you finish off your application. In the event that there are no " + global_Game + " moderators or recruiters online, feel free to poke any other moderator or recruiter for assistance. \
[I]You can poke a TeamSpeak user by right-clicking his name, selecting the \"Poke Client\" option and entering a reason for your poke.[/I]\\n \
\\n\
Good luck, and welcome to The Chaos Vanguard!\\n\\n" + global_StaffName;
	
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.innerText='" + global_AcceptMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor_backup.innerHTML='" + global_AcceptMessage + "'"});
	  
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.value='" + global_AcceptMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"document.forms['quick_reply'].submit()"});
  window.close();
}

function declineClick(e) {
	
	var DeclineMessage = "Hello " + global_Username + "! I have unfortunately [B][COLOR=\"#FF0000\"]declined[/COLOR][/B] your application. \\n \\n \
Chaos Vanguard has a strict 16+ policy. We hope that you re-apply when you turn 16. \
\\n\
\\n" + global_StaffName;
	
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.innerText='" + DeclineMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor_backup.innerHTML='" + DeclineMessage + "'"});
	  
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.value='" + DeclineMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"document.forms['quick_reply'].submit()"});
  window.close();
}

function pendingClick(e) {
	
	var PendingMessage = "Hello " + global_Username + "! I have left your application [B]pending[/B]. \\n \\n \
This is because you currently do not have a working microphone, which is needed to join the community. Once you have a \
working microphone please reply to this thread :\) \
\\n\
\\n" + global_StaffName;
	
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.innerText='" + PendingMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor_backup.innerHTML='" + PendingMessage + "'"});
	  
  chrome.tabs.executeScript(null,
      {code:"vB_Editor_QR_editor.value='" + PendingMessage + "'"});
  chrome.tabs.executeScript(null,
      {code:"document.forms['quick_reply'].submit()"});
  window.close();
}

function onWindowLoad() {

      var message = document.querySelector('#message');

      chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
      }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
      });

  
      var accept = document.getElementById('clickMe');
      accept.addEventListener('click', click);
	  
	  var decline = document.getElementById('decline');
      decline.addEventListener('click', declineClick);
	  
	  var decline = document.getElementById('pending');
      decline.addEventListener('click', pendingClick);

}

window.onload = onWindowLoad;