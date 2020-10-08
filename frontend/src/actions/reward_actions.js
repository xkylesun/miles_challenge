import { getCards } from '../util/card_util';

export const RECEIVE_STARTER_CARDS = "RECEIVE_STARTER_CARDS";
export const RECEIVE_COMMON_CARDS = "RECEIVE_COMMON_CARDS";
export const RECEIVE_RARE_CARDS = "RECEIVE_RARE_CARDS";

const addReward = reward => ({
    type: ADD_REWARD,
    reward
});

const removeReward = reward => ({
    type: REMOVE_REWARD,
    reward
})


export const fetchStarterCards = () => dispatch => (
    getCards("starter")
        .then(cards => dispatch(receiveStarterCards(cards)))
        .catch(err => console.log(err))
);

export const fetchCommonCards = () => dispatch => (
    getCards("common")
        .then(cards => dispatch(receiveCommonCards(cards)))
        .catch(err => console.log(err))
);

export const fetchRareCards = () => dispatch => (
    getCards("rare")
        .then(cards => dispatch(receiveRareCards(cards)))
        .catch(err => console.log(err))
);
