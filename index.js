
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


// APP CODE

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL ";
const REMOVE_GOAL = "REMOVE_GOAL";

// function for action creators

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal: goal
    }
}

function todos(state=[], action) {

    switch (action.type) {
        case ADD_TODO :
            return state.concat([action.todo]);
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({}, todo, { complete: !todo.complete  }))
        default :
            return state;
    }
}

function goals(state=[], action) {
    
    switch (action.type) {
        case ADD_GOAL :
            return state.concat([action.goal]);
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id);
        default :
            return state;
    }
}

function app(state={}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

mystore = createStore(app);

mystore.subscribe(() => {
    console.log(mystore.getState())
})

mystore.dispatch(addTodoAction({id:0, name:"learning"}))

mystore.dispatch(addTodoAction({id:1, name:"more learning"}))

mystore.dispatch(addTodoAction({id:2, name:"okay too much learning"}))



mystore.dispatch({
    type: REMOVE_TODO,
    id:2
})

mystore.dispatch({
    type: ADD_GOAL,
    goal: {
        id:0,
        name:"win"
    }
})


