import React from "react";

const AppContext = React.createContext({
    token: '',
    login: () => {},
    logout: () => {}
});

export default AppContext;