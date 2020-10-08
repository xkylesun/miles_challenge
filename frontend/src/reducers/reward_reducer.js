
import { ADD_REWARD, DELETE_REWARD, MOVE_REWARD } from "../actions/reward_actions"

const rewardsReducer = (state = {}, action) => {
    Object.freeze(state);
    let tmp = JSON.parse(JSON.stringify(state));
    let currentArrange = JSON.stringify(state.arrange)
    switch (action.type) {
        case ADD_REWARD:
            if (addReward(tmp.arrange, action.rewardId, action.category)){
                tmp.undo = currentArrange;
            };
            return tmp;
        case DELETE_REWARD:
            if (removeReward(tmp.arrange, action.rewardId, action.category)){
                tmp.undo = currentArrange;
            }
            return tmp;
        case MOVE_REWARD:
            if (moveReward(tmp.arrange, action.rewardId, action.start, action.end)){
                tmp.undo = currentArrange;
            };
            return tmp;
        case "UNDO_MOVE":
            if (tmp.undo){
                tmp.arrange = JSON.parse(tmp.undo);
                tmp.redo = currentArrange;
                tmp.undo = null;
            }
            return tmp;
        case "REDO_MOVE":
            if (tmp.redo){
                tmp.arrange = JSON.parse(tmp.redo);
                tmp.redo = null;
                tmp.undo = currentArrange;
            }
            return tmp;
        default:
            return state;
    };
};

export default rewardsReducer;

function addReward(obj, rewardId, col){
    console.dir(obj)
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

