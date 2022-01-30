import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { useParams, Redirect } from 'react-router';
import { api } from '../../api';
import { useFormValidation } from '../../hooks/useFormValidation';
import { User } from '../../models/User';
import { Quiz } from '../../models/Quiz';
import { UserQuiz, UserQuizDTO } from '../../models/UserQuiz';
import { useTranslation } from 'react-i18next';

export enum UserQuizFormTypes {
    edit = 'edit',
    add = 'add',
}

interface UserQuizEditUrlParams {
    id: string;
}

interface UserQuizFormProps {
    type: UserQuizFormTypes;
}

export const UserQuizForm = ({ type }: UserQuizFormProps) => {
    const [userQuiz, setUserQuiz] = useState<UserQuiz>({
        _id: '',
        submitted_at: new Date(),
        rating: 0,
        score: 0,
        user: null,
        quiz: null,
    });

    const [users, setUsers] = useState<User[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const { id }: UserQuizEditUrlParams = useParams();
    const [redirect, setRedirect] = useState<boolean>(false);
    const { t } = useTranslation();
    const isClientValidation = Boolean(process.env.REACT_APP_CLIENT_VALIDATION);

    useEffect(() => {
        if (id) {
            api.getUserQuiz(id).then((data) => {
                setUserQuiz(data['userQuiz']);
            });
        }

        api.getUsers().then((data) => {
            setUsers(data);
        });

        api.getQuizes().then((data) => {
            setQuizes(data);
        });
    }, []);

    const handleSubmit = () => {
        if (userQuiz) {
            if (type === UserQuizFormTypes.edit && userQuiz._id) {
                const dto: UserQuizDTO = {
                    _id: userQuiz._id,
                    submitted_at: userQuiz.submitted_at,
                    rating: userQuiz.rating,
                    score: userQuiz.score,
                    user: userQuiz.user?._id,
                    quiz: userQuiz.quiz?._id,
                };

                api.updateUserQuiz(dto)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        setErrors(e.response.data.map((error: string) => t(error)));
                    });
            } else if (userQuiz.quiz) {
                const dto: UserQuizDTO = {
                    submitted_at: userQuiz.submitted_at,
                    rating: userQuiz.rating,
                    score: userQuiz.score,
                    user: userQuiz.user?._id,
                    quiz: userQuiz.quiz?._id,
                };

                api.addUserQuiz(dto)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        setErrors(e.response.data.map((error: string) => t(error)));
                    });
            }
        }
    };

    const { errors, setErrors } = useFormValidation(handleSubmit);

    const messages = {
        submittedAtRequired: t('validationMessages.submittedAtRequired'),
        userRequired: t('validationMessages.userRequired'),
        quizRequired: t('validationMessages.quizRequired'),
        scoreRequired: t('validationMessages.scoreRequired'),
        ratingRequired: t('validationMessages.ratingRequired'),
    };

    const validate = (userQuiz: UserQuiz) => {
        const errors: string[] = [];
        if (isClientValidation) {
            //rating
            if (userQuiz.rating && !(userQuiz.rating >= 1 && userQuiz.rating <= 10)) {
                errors.push(messages.ratingRequired);
            }
            //score
            if (!(userQuiz.score >= 1 && userQuiz.score <= 10)) {
                errors.push(messages.scoreRequired);
            }
            //quiz
            if (!!!userQuiz.quiz?._id) {
                errors.push(messages.quizRequired);
            }
            //user
            if (!!!userQuiz.user?._id) {
                errors.push(messages.userRequired);
            }
        }

        setErrors(errors);
    };

    if (redirect) {
        return <Redirect to={`/userQuiz${type === UserQuizFormTypes.edit ? '?success=edit' : '?success=add'}`} />;
    }

    const toDateInputValue = (date: Date) => {
        const local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    };

    return (
        <>
            <h1>
                {type === UserQuizFormTypes.add ? t('buttons.add') : t('buttons.edit')} {t('form.userQuiz')}
                {type === UserQuizFormTypes.edit ? userQuiz?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>{t('userQuizesTable.submittedAt')}</label>
                    <input
                        type="date"
                        placeholder={t('userQuizesTable.submittedAt')}
                        defaultValue={toDateInputValue(new Date(userQuiz.submitted_at))}
                        value={userQuiz ? toDateInputValue(new Date(userQuiz.submitted_at)) : ''}
                        onChange={(e) => {
                            setUserQuiz({ ...userQuiz, submitted_at: new Date(e.target.value) });
                        }}
                    />
                </div>
                <div>
                    <label>{t('userQuizesTable.rating')}</label>
                    <input
                        type="number"
                        placeholder={t('userQuizesTable.rating')}
                        value={userQuiz ? userQuiz.rating : ''}
                        onChange={(e) => {
                            setUserQuiz({ ...userQuiz, rating: parseInt(e.target.value) });
                        }}
                    />
                </div>
                <div>
                    <label>{t('userQuizesTable.score')}</label>
                    <input
                        type="number"
                        placeholder={t('userQuizesTable.score')}
                        value={userQuiz ? userQuiz.score : ''}
                        onChange={(e) => {
                            setUserQuiz({ ...userQuiz, score: parseInt(e.target.value) });
                        }}
                    />
                </div>
                <div>
                    <label>{t('userQuizesTable.quiz')}</label>
                    <select
                        title="quiz option"
                        onChange={(e) => {
                            const newQuiz = quizes.find((quiz) => quiz._id === e.target.value);
                            setUserQuiz({ ...userQuiz, quiz: newQuiz ? newQuiz : null });
                        }}
                    >
                        <option value="">{t('userQuizesTable.quiz')}</option>
                        {quizes.map((quiz) => (
                            <option
                                key={`quiz-${quiz._id}`}
                                value={quiz._id}
                                selected={type === UserQuizFormTypes.edit && quiz._id === userQuiz?._id}
                            >
                                {`${quiz.name}`}
                            </option>
                        ))}
                        x
                    </select>
                </div>
                <div>
                    <label>{t('userQuizesTable.user')}</label>
                    <select
                        title="user option"
                        onChange={(e) => {
                            const newUser = users.find((user) => user._id === e.target.value);
                            setUserQuiz({ ...userQuiz, user: newUser ? newUser : null });
                        }}
                    >
                        <option value="">{t('userQuizesTable.user')}</option>
                        {users.map((user) => (
                            <option
                                key={`user-${user._id}`}
                                value={user._id}
                                selected={type === UserQuizFormTypes.edit && user._id === userQuiz?.user?._id}
                            >
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.length > 0 && <InfoBadge className="error">{errors[errors.length - 1]}</InfoBadge>}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        setErrors([...errors]);
                        if (userQuiz) {
                            validate(userQuiz);
                        }
                    }}
                >
                    Save
                </Button>
            </Form>
        </>
    );
};
