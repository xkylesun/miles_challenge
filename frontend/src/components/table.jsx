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
            arrange: {
                C1: [],
                C2: [],
                C3: [],
                C4: [],
                C5: [],
            },
            undo: null,
            redo: null

        }
        this.addReward = this.addReward.bind(this);
        this.removeReward = this.removeReward.bind(this);
        this.moveReward = this.moveReward.bind(this);

        this.action = this.action.bind(this)

        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.save = this.save.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);

        this.setDragStart = this.setDragStart.bind(this);
    }

    componentDidMount(){
        let data = localStorage.getItem("lastData");
        if (data) this.setState({arrange: JSON.parse(data)});
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

        this.action(rewardName, col)
        this.setState({ 
            dragRewardId: null,
            dragStartCol: null,
        })

    }

    setDragStart(col) {
        this.setState({ dragStartCol: col })
    }

    addReward(tmp, rewardName, col){
        for (let i = 0; i < tmp[col].length; i++){
            if (tmp[col][i] === rewardName) return false;
        }
        tmp[col].push(rewardName);
        return true;
    }

    removeReward(tmp, rewardName, col){
        tmp[col] = tmp[col].filter(rew => rew !== rewardName)
        return true;
    }

    moveReward(tmp, rewardName, start, end){
        if(this.addReward(tmp, rewardName, end)){
            tmp = this.removeReward(tmp, rewardName, start);
        }
    }

    action (rewardName, end, start){
        // let data = JSON.stringify(this.state.arrange);
        let tmp = Object.assign(this.state.arrange);
        let data = JSON.stringify(tmp);
        if (this.state.dragStartCol){
            this.moveReward(tmp, rewardName, this.state.dragStartCol, end);
        } else {
            if (end) this.addReward(tmp, rewardName, end);
            if (start) this.removeReward(tmp, rewardName, start);
        }
        this.setState({
            arrange: tmp,
            undo: data
        });
    }

    save(){
        let data = Object.assign(this.state.arrange);
        localStorage.setItem("lastData", JSON.stringify(data));
    }

    undo(){
        if (this.state.undo){
            let data = JSON.parse(this.state.undo);
            let tmp = JSON.stringify(this.state.arrange);
            this.setState({
                arrange: data,
                undo: null,
                redo: tmp
            });
        }
    }

    redo(){
        if (this.state.redo){
            console.log(this.state.redo)
            let data = JSON.parse(this.state.redo);
            let tmp = JSON.stringify(this.state.arrange);
            this.setState({
                arrange: data,
                undo: tmp,
                redo: null
            });
        }
    }

    render() {
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
                                    rewards={this.state.arrange[el]}
                                    removeReward={this.action}
                                    drag={this.drag}
                                    setDragStart={this.setDragStart}
                                />
                            </li>))}
                        </ul>
                    </span>
                </div>
                <div>
                    <button onClick={this.undo}>Undo</button>
                    <button onClick={this.redo}>Redo</button>
                    <button onClick={this.save}>Save</button>
                </div>
            </div>
        );
    }
}

export default Table;