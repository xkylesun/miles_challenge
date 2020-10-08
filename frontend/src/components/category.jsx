import React from 'react';
import Reward from "./reward";

class Category extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="category_body" id="category_body">
                <h1 className="tbl_title">{this.props.name}</h1>
                <ul 
                    className="category_rewards"
                    id={this.props.name}>
                    {   
                        this.props.rewards.map(rew => (
                            <Reward
                                key={rew}
                                name={rew}
                                category={this.props.name}
                                remove={this.props.removeReward}
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