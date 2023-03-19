import React from "react";

class Validation extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                {
                    this.props.show && <span className="text-danger">{this.props.msg}</span>
                }
            </>
        )
    }
}

export default Validation;