
export const RECEIVE_STARTER_CARDS = "RECEIVE_STARTER_CARDS";
export const RECEIVE_COMMON_CARDS = "RECEIVE_COMMON_CARDS";
export const RECEIVE_RARE_CARDS = "RECEIVE_RARE_CARDS";

const addReward = reward => ({
    type: ADD_REWARD,
    reward
});

const moveReward = reward => ({
    type: MOVE_REWARD,
    reward
})

const removeReward = reward => ({
    type: REMOVE_REWARD,
    reward
})




export const createReward = () => dispatch => (
    getCards("starter")
        .then(cards => dispatch(add(cards)))
        .catch(err => console.log(err))
);

export const fetchCommonCards = () => dispatch => (
    getCards("common")
        .then(cards => dispatch(receiveCommonCards(cards)))
        .catch(err => console.log(err))
);

export const deleteReward = () => dispatch => (
    getCards("rare")
        .then(cards => dispatch(receiveRareCards(cards)))
        .catch(err => console.log(err))
);


addReward(tmp, rewardName, col){
    for (let i = 0; i < tmp[col].length; i++) {
        if (tmp[col][i] === rewardName) return false;
    }
    tmp[col].push(rewardName);
    return true;
}

// removeReward(tmp, rewardName, col){
//     tmp[col] = tmp[col].filter(rew => rew !== rewardName)
//     return true;
// }

// moveReward(tmp, rewardName, start, end){
//     if (this.addReward(tmp, rewardName, end)) {
//         tmp = this.removeReward(tmp, rewardName, start);
//     }
// }