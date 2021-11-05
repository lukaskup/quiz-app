import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QuizList, QuizView } from './components/Quiz';
import { Navigation } from './components/Navigation';
import { Container } from './App.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QuizForm, QuizFormTypes } from './components/Quiz/QuizForm';
import { quizzes } from './dummyData';

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navigation />
                <Container>
                    <Switch>
                        <Redirect exact from="/" to="/quiz/" />

                        {/*quiz routes*/}
                        <Route exact path="/quiz/" component={() => <QuizList quizzes={quizzes} />} />
                        <Route path="/quiz/view" component={QuizView} />
                        <Route path="/quiz/edit" component={() => <QuizForm type={QuizFormTypes.edit} />} />
                        <Route path="/quiz/add" component={() => <QuizForm type={QuizFormTypes.add} />} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
