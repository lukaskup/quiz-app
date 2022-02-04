import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Container } from './App.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QuizForm, QuizFormTypes } from './components/Quiz/QuizForm';
import { UserForm, UserList, UserView } from './components/User';
import { UserQuizForm, UserQuizList, UserQuizView } from './components/UserQuiz';
import { UserFormTypes } from './components/User/UserForm';
import { UserQuizFormTypes } from './components/UserQuiz/UserQuizForm';
import { QuizView, QuizList } from './components/Quiz';
import { LoginForm } from './components/Auth';

import '../src/i18n';
import { useAuth } from './hooks/useAuth';

function App() {
    const { getUser } = useAuth();
    const userAuth = getUser();
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navigation />
                <Container>
                    <Switch>
                        <Redirect exact from="/" to="/quiz/" />

                        {/*quiz routes*/}
                        <Route exact path="/quiz/" component={() => <QuizList />} />
                        <Route path="/quiz/view/:id" component={QuizView} />
                        {userAuth && (
                            <Route path="/quiz/edit/:id" component={() => <QuizForm type={QuizFormTypes.edit} />} />
                        )}
                        {userAuth && <Route path="/quiz/add" component={() => <QuizForm type={QuizFormTypes.add} />} />}

                        {/*user routes*/}
                        {userAuth && userAuth.role === 'admin' && (
                            <Route exact path="/user/" component={() => <UserList />} />
                        )}
                        {userAuth && userAuth.role === 'admin' && <Route path="/user/view/:id" component={UserView} />}
                        {userAuth && userAuth.role === 'admin' && (
                            <Route path="/user/edit/:id" component={() => <UserForm type={UserFormTypes.edit} />} />
                        )}
                        {userAuth && userAuth.role === 'admin' && (
                            <Route path="/user/add" component={() => <UserForm type={UserFormTypes.add} />} />
                        )}

                        {/*userQuiz routes*/}
                        {userAuth && <Route exact path="/userQuiz/" component={() => <UserQuizList />} />}
                        {userAuth && <Route path="/userQuiz/view/:id" component={UserQuizView} />}
                        {userAuth && (
                            <Route
                                path="/userQuiz/edit/:id"
                                component={() => <UserQuizForm type={UserQuizFormTypes.edit} />}
                            />
                        )}
                        {userAuth && (
                            <Route
                                path="/userQuiz/add"
                                component={() => <UserQuizForm type={UserQuizFormTypes.add} />}
                            />
                        )}
                        {/*auth*/}
                        <Route path="/login" component={() => <LoginForm />} />
                        <Redirect to="/quiz" />
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
