// import { RECEIVE_PROJECT, RECEIVE_PROJECT_DRAFT } from "../actions/project_actions";
// import { RECEIVE_REWARDS } from "../actions/reward_actions";


const rewardsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "RECEIVE_REWARD":
            return Object.assign({}, state);
        default:
            return state;
    };
};

export default rewardsReducer;