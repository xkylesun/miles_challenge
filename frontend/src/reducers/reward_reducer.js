// import { RECEIVE_PROJECT, RECEIVE_PROJECT_DRAFT } from "../actions/project_actions";
// import { RECEIVE_REWARDS } from "../actions/reward_actions";
import { ADD_REWARD, DELETE_REWARD, MOVE_REWARD } from "../actions/reward_actions"

const rewardsReducer = (state = {}, action) => {
    Object.freeze(state);
    let tmp = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_REWARD:
            addReward(tmp, action.rewardId, action.category);
            return tmp;
        case DELETE_REWARD:
            removeReward(tmp, action.rewardId, action.category)
            return tmp;
        case MOVE_REWARD:
            moveReward(tmp, action.rewardId, action.start, action.end);
            return tmp;
        default:
            return state;
    };
};

export default rewardsReducer;

function addReward(obj, rewardId, col){
    for (let i = 0; i < obj[col].length; i++){
        if (obj[col][i] === rewardId) return false;
    }
    obj[col].push(rewardId);
    return true;
}

function removeReward(obj, rewardId, col){
    obj[col] = obj[col].filter(rew => rew !== rewardId)
    return true;
}

function moveReward(tmp, rewardId, start, end) {
    if (addReward(tmp, rewardId, end)){
        tmp = removeReward(tmp, rewardId, start);
    }
    return true;
}