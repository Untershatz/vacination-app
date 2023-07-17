import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import SummaryPage from './components/SummaryPage';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Registration Form</Link>
                        </li>
                        <li>
                            <Link to="/summary">Summary Page</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/">
                        <RegistrationForm />
                    </Route>
                    <Route exact path="/summary">
                        <SummaryPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
