
export const ADD_REWARD = "ADD_REWARD";
export const DELETE_REWARD = "DELETE_REWARD";
export const MOVE_REWARD = "MOVE_REWARD";

export const createReward = (rewardId, category) => ({
    type: ADD_REWARD,
    rewardId,
    category
});

export const deleteReward = (rewardId, category) => ({
    type: DELETE_REWARD,
    rewardId,
    category
});

export const moveReward = (rewardId, start, end) => ({
    type: MOVE_REWARD,
    rewardId,
    start,
    end
});
