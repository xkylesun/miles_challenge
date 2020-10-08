import React from 'react'

class Reward extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                id={this.props.name}
                draggable={true}
                onDragStart={e => {
                    this.props.setDragStart(this.props.category)
                    this.props.drag(e)}}
                className="reward_item reward_in_cat">
                <button
                    className="reward_button" 
                    onClick={() => this.props.remove(this.props.name, this.props.category)}>x</button>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

export default Reward;