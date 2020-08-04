import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
        </Switch>
    );
}

export default Routes;