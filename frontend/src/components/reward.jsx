import React from 'react'

class Reward extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.category
        };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.remove(this.props.name)}>x</button>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

export default Reward;