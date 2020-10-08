
import { connect } from 'react-redux';
import Table from "./table";

import { createReward, deleteReward, moveReward } from "../actions/reward_actions"


const mapStateToProps = (state, ownProps) => {
    let arrange = Object.assign(state);
    return {arrange};
};

const mapDispatchToProps = dispatch => {
    return {
        createReward: (rewardId, category) => dispatch(createReward(rewardId, category)),
        deleteReward: (rewardId, category) => dispatch(deleteReward(rewardId, category)),
        moveReward: (rewardId, start, end) => dispatch(moveReward(rewardId, start, end))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
