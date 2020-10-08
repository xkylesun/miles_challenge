
import { connect } from 'react-redux';
import Table from "./table";


const mapStateToProps = (state, ownProps) => {
    let arrange = Object.assign(state);
    return {arrange};
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
