import React from 'react';
import Category from "./category";

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.rewards = ["R1, R2, R3, R4, R5"];
        this.categories = ["C1", "C2", "C3", "C4", "C5"]
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drag(e) {
        e.dataTransfer.setData("text", e.target.id)
    }

    drop(e) {
        e.preventDefault();
        let rewName = e.dataTransfer.getData("text");
        this.addReward(rewName);
    }

    addReward(rewName){
        this.ref.rewName.add(rewName);
    }

    render() {
        return (
            <div>
                <span>
                    <h1>Rewards</h1>
                    <ul>
                        {this.rewards.map(el => (<li>
                            <span
                                id={el}
                                draggable={true}
                                onDragStart={e => this.drag(e)}
                            >
                                <h1>{el}</h1>
                            </span>
                        </li>))}
                    </ul>
                </span>
                <span>
                    <h1>Categories</h1>
                    <ul>
                        {this.categories.map(el => (<li
                                id={el}
                                ondrop={e => this.drop(e)}
                                ondragover={e => this.allowDrop(e)}
                            >
                            <h1>{el}</h1>
                            <Category
                                name={el}
                                ref={(ref) => this.el = ref}
                                // retrieve from cache later
                                rewards={[]}
                            />)
                        </li>))}
                    </ul>
                </span>
            </div>
        );
    }
}

export default Table;