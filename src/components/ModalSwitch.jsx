import Add from "../pages/Add";
import Home from "../pages/Home";
import Modal from './Modal';
import renderRoutes from "./renderRouter";
import React from 'react';
import { Route } from "react-router-dom";

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/add",
        exact: true,
        component: Add
    }
]
class ModalSwitch extends React.Component {
    previousLocation = this.props.location;

    componentWillReceiveProps(nextProps) {
        const { location } = this.props;
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
            // console.log("1");
        } else {
            // console.log("2");
        }
    }

    render() {
        const { location } = this.props;
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );

        const modal = {
            isModal: isModal,
            previousLocation: this.previousLocation
        };

        // console.log(isModal);

        return (
        <div>
            {renderRoutes({ routes: routes, location: location, modal: modal })}

            {isModal ? <Route path="/add" component={ Modal } /> : null}
        </div>
        );
    }
}

export default ModalSwitch;