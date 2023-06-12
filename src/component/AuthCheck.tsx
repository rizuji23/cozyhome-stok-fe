import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { withRouter } from "./etc/withRouter";
import LoadingFull from "./etc/LoadingFull";
import Auth from "./module/Auth";

class AuthCheck extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            loading: false,
        }
        console.log(props);
        this.checkAuth = this.checkAuth.bind(this);
    }

    checkAuth() {
        this.setState({
            loading: true,
        });

        const data_auth = localStorage.getItem("user-cozystok");
        Auth.check(data_auth).then((result: any) => {
            console.log(result);
            if (result.response === true) {
                this.setState({
                    isLogged: <Outlet />,
                    loading: false,
                });

            } else {
                this.setState({
                    isLogged: <Navigate to={"/"} replace={true} />,
                    loading: false,
                })
            }
        }).catch((rejects) => {
            this.setState({
                isLogged: <Navigate to={"/"} replace={true} />,
                loading: false,
            })
        })
    }

    componentDidMount(): void {
        this.checkAuth();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.checkAuth();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingFull display={this.state.loading} />
                {this.state.isLogged}
            </>
        )
    }
}

export default withRouter(AuthCheck);