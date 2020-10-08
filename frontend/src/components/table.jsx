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
            C1: [],
            C2: [],
            C3: [],
            C4: [],
            C5: []
        }
        this.addReward = this.addReward.bind(this);
        this.removeReward = this.removeReward.bind(this);
        this.moveReward = this.moveReward.bind(this);

        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);

        this.setDragStart = this.setDragStart.bind(this);
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
        let rewName = this.state.dragRewardId;
        let col = tmp.id;
        this.addReward(rewName, col);
        if (this.state.dragStartCol){
            this.removeReward(rewName, this.state.dragStartCol);
        }
        this.setState({ dragRewardId: null,
                        dragStartCol: null })

    }

    setDragStart(col) {
        this.setState({ dragStartCol: col })
    }

    addReward(rewName, col){
        let tmp = this.state[col].slice();
        for (let i = 0; i < tmp.length; i++){
            if (tmp[i] === rewName) return;
        }
        tmp.push(rewName);
        this.setState({[col]: tmp})
    }

    removeReward(rewardName, col){
        let tmp = this.state[col].slice();
        tmp = tmp.filter(rew => rew !== rewardName)
        this.setState({[col]: tmp});
    }

    moveReward(rewardName, end, start){
        this.addReward(rewardName, end);
        if (start) this.removeReward(rewardName, start);
    }

    render() {
        return (
            <div className="table">
                <span className="reward_col">
                    <h1 className="tbl_title">Rewards</h1>
                    <ul className="reward_list">
                        {this.rewards.map(el => (
                        <li 
                            key={el}
                            id={el}
                            className="reward_item"
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
                                rewards={this.state[el]}
                                removeReward={this.removeReward}
                                drag={this.drag}
                                setDragStart={this.setDragStart}
                            />
                        </li>))}
                    </ul>
                </span>
            </div>
        );
    }
}

export default Table;