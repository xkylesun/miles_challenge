
import { connect } from 'react-redux';
import Table from "./table";

import { createReward, deleteReward, moveReward } from "../actions/reward_actions"


const mapStateToProps = (state, ownProps) => {
    let tmp = Object.assign(state);
    return tmp;
};

const mapDispatchToProps = dispatch => {
    return {
        createReward: (rewardId, category) => dispatch(createReward(rewardId, category)),
        deleteReward: (rewardId, category) => dispatch(deleteReward(rewardId, category)),
        moveReward: (rewardId, start, end) => dispatch(moveReward(rewardId, start, end)),
        undoMove: () => dispatch({type: "UNDO_MOVE"}),
        redoMove: () => dispatch({type: "REDO_MOVE"})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
