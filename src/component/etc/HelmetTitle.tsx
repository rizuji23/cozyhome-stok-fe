import React from 'react';
import Helmet from 'react-helmet'

class HelmetTitle extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <Helmet>
                    <title>{this.props.title} | CozyHome Stok Management</title>
                </Helmet>
            </>
        )
    }
}

export default HelmetTitle;