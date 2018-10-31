
//should move translation stuff
function showTranslation(event) {
	var obj = getEventTarget(event);
	if(obj.url.search('snd_') != -1) return; // old system
	var parts = obj.url.split('/').pop().split('.');
	if(parts.length != 2) return; // new system
	//trace(obj.url);
	ajax('/html5/xml/checklang.php', {soundfile:obj.url, cid:CID, lang:snd_language}, showTranslationResult);
}

//2.21.13 dh
function showTranslationResult(data) {
	if(data.text || data.soundfile){
		var lbl = document.getElementById('audioLangTranslationLbl');
		var aLenHistory = audioLangHistory.length;
		var audioLangHistoryUpdated = false;

		if(aLenHistory > 0){
			for(var i = 0; i < aLenHistory; i++){
				if(audioLangHistory[i].file == data.file){
					audioLangHistory.splice(i, 1);
					audioLangHistory.push({txt:decodeURIComponent(data.text), file:data.file, src:data.soundfile});
					audioLangHistoryUpdated = true;
					break;
				}
			}
		}

		if(lbl.innerHTML == decodeURIComponent(data.text))
			return;
		else
			lbl.innerHTML = decodeURIComponent(data.text);

		if(aLenHistory == 5 && audioLangHistoryUpdated == false) audioLangHistory.shift();
		if(audioLangHistoryUpdated == false) audioLangHistory.push({txt:lbl.innerHTML, file:data.file, src:data.soundfile});

		if(document.getElementById("audio_lang_history") && typeof alhSetupTranslations == 'function') {
			alhSetupTranslations();
		}
	}
}

function onAudioLangTranslationBoxClick(){
	showPopup('audio_lang_history');
}
