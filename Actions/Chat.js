export const updateText = text => {
	return { type: 'UPDATE_TEXT', text };
}

export const setListening = () => {
	return { type: 'LISTENING' };
}

export const stopListening = () => {
	return { type: 'STOP_LISTENING' };
}

export const setSpeechError = error => {
	return { type: 'SPEECH_ERROR', error };
}

export const clearVoiceData = () => {
	return { type: 'CLEAR_VOICE_DATA' }; 
}

export const sendMessage = text => {
	return { type: 'SEND_MESSAGE', text };
}

export const openChat = index => {
	return { type: 'OPEN_CHAT', index };
}

export const deleteChat = id => {
	return { type: 'DELETE_CHAT', id };
}