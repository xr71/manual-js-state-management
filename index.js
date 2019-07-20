
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
    if (action.type === "ADD_TODO") {
        return state.concat([action.todo]);
    }

    return state;
}
