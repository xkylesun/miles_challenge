import React from 'react';
import Category from "./category";

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.rewards = ["R1", "R2", "R3", "R4", "R5"];
        this.categories = ["C1", "C2", "C3", "C4", "C5"];
        this.state = {
            dragRewardId: null,
            dragStartCol: null,
            undo: null,
            redo: null
        }

        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.save = this.save.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);

        this.setDragStart = this.setDragStart.bind(this);
    }

    componentDidMount(){
        let start = Object.assign(this.props)
        this.setState(start)
        setTimeout(() => console.dir(this.state), 1000)
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drag(e) {
        this.setState({ dragRewardId: e.target.id })
    }

    drop(e) {
        e.preventDefault();
        let tmp = e.target;
        while (tmp.parentNode.id !== "category_body") {
            tmp = tmp.parentElement;
        }
        let rewardName = this.state.dragRewardId;
        let col = tmp.id;

        if (this.state.dragStartCol){
            this.props.moveReward(rewardName, this.state.dragStartCol, col)
        } else {
            this.props.createReward(rewardName, col)
        }
        this.setState({ 
            dragRewardId: null,
            dragStartCol: null,
        })

    }

    setDragStart(col) {
        this.setState({ dragStartCol: col })
    }

    save(){
        localStorage.setItem("lastData", JSON.stringify(this.props.arrange));
    }

    undo(){
        // if (this.state.undo){
        //     let data = JSON.parse(this.state.undo);
        //     let tmp = JSON.stringify(this.state.arrange);
        //     this.setState({
        //         arrange: data,
        //         undo: null,
        //         redo: tmp
        //     });
        // }
    }

    redo(){
        // if (this.state.redo){
        //     let data = JSON.parse(this.state.redo);
        //     let tmp = JSON.stringify(this.state.arrange);
        //     this.setState({
        //         arrange: data,
        //         undo: tmp,
        //         redo: null
        //     });
        // }
    }

    render() {
        console.dir(this.props)
        return (
            <div>
                <div className="table">
                    <span className="reward_col">
                        <h1 className="tbl_title">Rewards</h1>
                        <ul className="reward_list">
                            {this.rewards.map(el => (
                            <li 
                                key={el}
                                id={el}
                                    className={`reward_item select_${el}`}
                                draggable={true}
                                onDragStart={e => this.drag(e)}
                                >
                                <h1>{el}</h1>
                            </li>))}
                        </ul>
                    </span>
                    <span className="category_col">
                        <h1 className="tbl_title">Categories</h1>
                        <ul className="category_list" id="category_list">
                            {this.categories.map(el => (<li
                                    key={el}
                                    className="category_item"
                                    onDrop={e => this.drop(e)}
                                    onDragOver={e => this.allowDrop(e)}
                                >
                                <Category
                                    name={el}
                                    // retrieve from cache later
                                    rewards={this.props.arrange[el]}
                                    deleteReward={this.props.deleteReward}
                                    drag={this.drag}
                                    setDragStart={this.setDragStart}
                                />
                            </li>))}
                        </ul>
                    </span>
                </div>
                <div>
                    <button className="control" onClick={this.undo}>Undo</button>
                    <button className="control"  onClick={this.redo}>Redo</button>
                    <button className="control"  onClick={this.save}>Save</button>
                </div>
            </div>
        );
    }
}

export default Table;