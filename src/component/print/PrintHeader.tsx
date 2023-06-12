import React from "react";

class PrintHeader extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="header-print">
                    <div className="d-flex">
                        <div>
                            <img src="assets/images/logo_print.png" width={100} alt="" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-dark">{this.props.title}</h1>
                            <p>Tanggal: <b>{this.props.date}</b></p>
                        </div>
                    </div>
                    <hr />
                </div>
            </>
        )
    }
}

export default PrintHeader;