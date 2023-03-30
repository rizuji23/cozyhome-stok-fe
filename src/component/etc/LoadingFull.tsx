import React from 'react';

class LoadingFull extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className='loading' style={{ display: this.props.display ? "block" : "none" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div >
            </>
        )
    }
}

export default LoadingFull;