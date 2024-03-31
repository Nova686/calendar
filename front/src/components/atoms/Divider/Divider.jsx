import React from "react";

class Divider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        }
        this.handleVisibility = this.handleVisibility.bind(this)
    }

    handleVisibility(e) {
        this.setState((prevState) => {
            return {
                isVisible: !prevState.isVisible
            }
        });
    }

    render() {
        return <div onClick={this.handleVisibility}
            style={{
                height: "10px",
                background: this.props.bgColor,
                width: "90vw",
                opacity: this.state.isVisible ? 1 : 0
            }}>

        </div>
    }
}

export default Divider;