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
                className={`reward_item reward_in_cat reward_${this.props.name}`}>
                <div className="button_container">
                    <button
                        className="reward_button"
                        onClick={() => this.props.remove(this.props.name, null, this.props.category)}>x</button>
                </div>    
                <h1 className="reward_title">{this.props.name}</h1>
            </div>
        );
    }
}

export default Reward;