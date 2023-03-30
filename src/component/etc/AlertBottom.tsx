import React from "react";

class AlertBottom extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                {this.props.show === true ? <small className="text-danger">{this.props.msg}</small> : <></>}
            </>
        )
    }
}

export default AlertBottom;