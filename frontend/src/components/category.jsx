import React from 'react';
import Reward from "./reward";

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rewards: this.props.rewards || []
        }
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
    }

    add(rewardName) {
        let rew = {
            name: rewardName,
            category: this.props.name
        }
        let tmp = this.state.rewards.slice();
        tmp.push(rew);
        this.setState({state: tmp});
    }

    remove(rewardName){
        let tmp = this.state.rewards.slice();
        tmp = tmp.filter(rew => rew.name !== rewardName)
        this.setState({rewards: tmp});
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <ul>
                    {
                        this.state.rewards.map(rew => (
                            <Reward
                                name={rew.name}
                                remove={this.remove}
                            />
                            )
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Category;