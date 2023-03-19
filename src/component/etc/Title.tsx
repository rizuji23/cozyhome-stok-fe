import React from 'react';

class Title extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">{this.props.title}</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Title;