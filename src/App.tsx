import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QuizList, QuizView } from './components/Quiz';
import { Navigation } from './components/Navigation';
import { Container } from './App.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QuizForm, QuizFormTypes } from './components/Quiz/QuizForm';
import { quizzes, userQuizzes, users } from './dummyData';
import { UserForm, UserList, UserView } from './components/User';
import { UserQuizForm, UserQuizList, UserQuizView } from './components/UserQuiz';
import { UserFormTypes } from './components/User/UserForm';
import { UserQuizFormTypes } from './components/UserQuiz/UserQuizForm';

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
                        <Route path="/quiz/view/:id" component={QuizView} />
                        <Route path="/quiz/edit/:id" component={() => <QuizForm type={QuizFormTypes.edit} />} />
                        <Route path="/quiz/add" component={() => <QuizForm type={QuizFormTypes.add} />} />

                        {/*user routes*/}
                        <Route exact path="/user/" component={() => <UserList />} />
                        <Route path="/user/view/:id" component={UserView} />
                        <Route path="/user/edit/:id" component={() => <UserForm type={UserFormTypes.edit} />} />
                        <Route path="/user/add" component={() => <UserForm type={UserFormTypes.add} />} />

                        {/*userQuiz routes*/}
                        <Route exact path="/userQuiz/" component={() => <UserQuizList userQuizzes={userQuizzes} />} />
                        <Route path="/userQuiz/view/:id" component={UserQuizView} />
                        <Route
                            path="/userQuiz/edit/:id"
                            component={() => <UserQuizForm type={UserQuizFormTypes.edit} />}
                        />
                        <Route path="/userQuiz/add" component={() => <UserQuizForm type={UserQuizFormTypes.add} />} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
