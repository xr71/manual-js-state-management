
function createStore(reducer) {

    let state = [];
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        console.log(listener);
        console.log(listeners);

        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    };

    const dispatch = (action) => {

        state = reducer(state, action);

        listeners.forEach((l) => {l()});
    };

    return {
        getState,
        subscribe,
        dispatch
    }
}

function todos(state=[], action) {

    switch (action.type) {
        case "ADD_TODO" :
            return state.concat([action.todo]);
        case "REMOVE_TODO" :
            console.log("TODO");
        case "TOGGLE_TODO" :
            console.log("TODO");
        default :
            return state;
    }
}
