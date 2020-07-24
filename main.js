
console.log(window.Redux)

const { createStore } = window.Redux

const initalState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY': {
      const newList = [...state];
      newList.push(action.payload);

      return newList
    }
    default:
      return state;
  }
  
}

const store = createStore(hobbyReducer);

// Render

const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;
  
  const ulElement = document.querySelector('#hobbyListID');
  if (!ulElement) return;

  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');

    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }

}

// Render inital hobby list

const initalHobbyList = store.getState();
renderHobbyList(initalHobbyList);


// Handle form submit hobby 
const formElement = document.querySelector('#hobbyFormID');
if (formElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hobbyTextIDElement = formElement.querySelector('#hobbyTextID');
    if (!hobbyTextIDElement) return;
    console.log('SUBMIT', hobbyTextIDElement.value);

    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextIDElement.value
    };

    store.dispatch(action);
    formElement.reset()
  };

  formElement.addEventListener('submit', handleFormSubmit)
}

store.subscribe(() => {
  console.log('State update', store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);
  // localStore
  localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));

});







