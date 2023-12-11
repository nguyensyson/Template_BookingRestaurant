import PropTypes from "prop-types";
import React, {lazy, Suspense, useEffect} from "react";
import ScrollToTop from "./helpers/scroll-top";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import {loadLanguages, multilanguage} from "redux-multilanguage";
import {connect} from "react-redux";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";
import AdminLayout from "./layouts/AdminLayout";
import {message} from "antd";
import OrderHistory from "./pages/other/OrderHistory";
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        props.dispatch(
            loadLanguages({
                languages: {
                    en: require("./translations/english.json"),
                    fn: require("./translations/french.json"),
                    de: require("./translations/germany.json"),
                    vi: require("./translations/vietnamese.json"),
                },
            })
        );
    });
    return (
        <ToastProvider placement="bottom-left">
            <BreadcrumbsProvider>
                <Router>
                    <ScrollToTop messageApi={messageApi}>
                        <Suspense
                            fallback={
                                <div className="flone-preloader-wrapper">
                                    <div className="flone-preloader">
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            }>
                            {contextHolder}
                            <Switch>
                                <Route path={process.env.PUBLIC_URL + "/login"} exact component={LoginRegister}/>
                                <Route path="/" component={AdminLayout}/>
                                <Route
                                    path={process.env.PUBLIC_URL + "/my-account"}
                                    component={MyAccount}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + "/order-history"}
                                    component={OrderHistory}
                                />
                                <Route exact component={NotFound}/>
                            </Switch>
                        </Suspense>
                    </ScrollToTop>
                </Router>
            </BreadcrumbsProvider>
        </ToastProvider>
    );
};

App.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
