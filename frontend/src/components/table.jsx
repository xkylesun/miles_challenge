import React from 'react';
import Category from "./category";

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.rewards = ["R1", "R2", "R3", "R4", "R5"];
        this.categories = ["C1", "C2", "C3", "C4", "C5"];
        this.state = {
            C1: [],
            C2: [],
            C3: [],
            C4: [],
            C5: []
        }
        this.addReward = this.addReward.bind(this);
        this.removeReward = this.removeReward.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drag(e) {
        e.dataTransfer.setData("text", e.target.id)
    }

    drop(e) {
        e.preventDefault();
        let tmp = e.target;
        while (tmp.parentNode.id !== "category_body") {
            tmp = tmp.parentElement;
        }
        let rewName = e.dataTransfer.getData("text");


        let col = tmp.id;

        this.addReward(rewName, col);
        // setTimeout(() => console.log(this.state), 1000)

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
        console.log(tmp)
        this.setState({[col]: tmp});
        setTimeout(() => console.dir(this.state, 1000))
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
                                drop={this.drop}
                                removeReward={this.removeReward}
                            />
                        </li>))}
                    </ul>
                </span>
            </div>
        );
    }
}

export default Table;