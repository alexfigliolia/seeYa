const messages = [{
	id: 1, 
	user: 'George Figliolia',
	text: 'Talk soon?'
}, {
	id: 2, 
	user: 'Alex Figliolia',
	text: 'Cool'
}, {
	id: 3, 
	user: 'George Figliolia',
	text: 'On my way to Long Island'
}, {
	id: 4, 
	user: 'Alex Figliolia',
	text: 'Whats doing'
}, {
	id: 5, 
	user: 'George Figliolia',
	text: 'Hey'
}, {
	id: 6, 
	user: 'Alex Figliolia',
	text: 'Hey man!'
}];

const initialState = {
	conversations: [{
		id: 1, 
		user: 'George Figliolia',
		image: null
	}, {
		id: 2, 
		user: 'Erica Figliolia',
		image: null
	}, {
		id: 3, 
		user: 'Steve Figliolia',
		image: null
	}, {
		id: 4, 
		user: 'Dana Figliolia',
		image: null
	}, {
		id: 5, 
		user: 'Ronald Figliolia',
		image: null
	}, {
		id: 6, 
		user: 'Vincent Figliolia',
		image: null
	}],
	messages,
	activeIndex: null,
	activeMessages: [],
	text: '',
	listening: false,
	speechError: ''
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_TEXT':
			return Object.assign({}, state, { text: action.text });
		case 'SEND_MESSAGE':
			return Object.assign({}, state, { messages: [{
					id: state.messages.length + 1,
					user: 'Alex Figliolia',
					text: action.text
				}, ...state.messages], 
				text: '' 
			});
		case 'OPEN_CHAT':
			return Object.assign({}, state, { activeIndex: action.index });
		case 'LISTENING':
			return Object.assign({}, state, { listening: true });
		case 'STOP_LISTENING':
			return Object.assign({}, state, { listening: false });
		case 'SPEECH_ERROR':
			return Object.assign({}, state, { speechError: action.error });
		case 'CLEAR_VOICE_DATA':
			return Object.assign({}, state, { listening: false, speechError: '' });
		default:
			return state;
	}
} 