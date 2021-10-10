import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { Container } from './App.styled';

function App() {
    return (
        <Router>
            <Navigation />
            <Container>
                <Switch>
                    <Redirect exact from="/" to="/en" />
                    <Route exact path="/:lang" component={Home} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
