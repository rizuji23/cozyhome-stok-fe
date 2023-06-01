import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../module/Auth";

class Logout extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data_auth: localStorage.getItem("user-cozystok"),
            navigation: false,
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.setItem("user-cozystok", JSON.stringify({ "refresh": "", "access": "", "name": "", "role": 123123, "username": "", "id_user": 123123 }))
        Auth.logout(this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                navigation: <Navigate to={`/`} />
            });

        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                navigation: <Navigate to={`/`} />
            });
        })
    }

    componentDidMount(): void {
        this.logout();
    }

    render(): React.ReactNode {
        return (
            <>
                {this.state.navigation}
            </>
        )
    }
}

export default Logout;