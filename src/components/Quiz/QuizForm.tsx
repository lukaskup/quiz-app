import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { useParams, Redirect } from 'react-router';
import { api } from '../../api';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useTranslation } from 'react-i18next';

export enum QuizFormTypes {
    edit = 'edit',
    add = 'add',
}

interface QuizEditUrlParams {
    id: string;
}

interface QuizFormProps {
    type: QuizFormTypes;
}

export const QuizForm = ({ type }: QuizFormProps) => {
    const [quiz, setQuiz] = useState<Quiz | null>({
        _id: '',
        name: '',
        description: '',
        image_url: '',
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const isClientValidation = Boolean(process.env.REACT_APP_CLIENT_VALIDATION);
    const { id }: QuizEditUrlParams = useParams();
    const [redirect, setRedirect] = useState<boolean>(false);
    const { t } = useTranslation();
    useEffect(() => {
        if (id) {
            api.getQuiz(id).then((data) => {
                if (data['quiz']) {
                    setQuiz(data['quiz']);
                }
            });
        }
    }, []);

    const handleSubmit = () => {
        if (quiz) {
            if (type === QuizFormTypes.edit && quiz._id) {
                api.updateQuiz(quiz)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        setErrors(e.response.data.map((error: string) => t(error)));
                    });
            } else if (quiz.name || (!isClientValidation && isSubmitted)) {
                api.addQuiz(quiz)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        setErrors(e.response.data.map((error: string) => t(error)));
                    });
            }
        }
    };

    const { isRequired, minMax, errors, setErrors } = useFormValidation(handleSubmit);

    const messages = {
        nameRequired: t('validationMessages.nameRequired'),
        nameMinMax: t('validationMessages.nameMinMax'),
        descriptionRequired: t('validationMessages.descriptionRequired'),
    };

    const validate = (quiz: Quiz) => {
        const errors: string[] = [];
        if (isClientValidation) {
            //name
            if (!isRequired(quiz.name)) {
                errors.push(messages.nameRequired);
            }
            if (!minMax(quiz.name, 3, 20)) {
                errors.push(messages.nameMinMax);
            }

            //description
            if (!isRequired(quiz.description)) {
                errors.push(messages.descriptionRequired);
            }
        }

        setErrors(errors);
    };

    if (redirect) {
        return <Redirect to={`/quiz${type === QuizFormTypes.edit ? '?success=edit' : '?success=add'}`} />;
    }

    return (
        <>
            <h1>
                {type === QuizFormTypes.add ? t('buttons.add') : t('buttons.edit')} {t('form.quiz')}{' '}
                {type === QuizFormTypes.edit ? quiz?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>{t('quizTable.name')}</label>
                    <input
                        type="text"
                        placeholder={'name'}
                        value={quiz ? quiz.name : ''}
                        onChange={(e) => {
                            if (quiz) {
                                setQuiz({ ...quiz, name: e.target.value });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>{t('quizTable.description')}</label>
                    <input
                        type="text"
                        placeholder={'description'}
                        value={quiz ? quiz.description : ''}
                        onChange={(e) => {
                            if (quiz) {
                                setQuiz({ ...quiz, description: e.target.value });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>{t('quizTable.imageUrl')}</label>
                    <input
                        type="text"
                        placeholder={'image url'}
                        value={quiz ? quiz.image_url : ''}
                        onChange={(e) => {
                            if (quiz) {
                                setQuiz({ ...quiz, image_url: e.target.value });
                            }
                        }}
                    />
                </div>
                {errors.length > 0 && <InfoBadge className="error">{errors[errors.length - 1]}</InfoBadge>}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSubmitted(true);
                        setErrors([...errors]);
                        if (quiz) {
                            validate(quiz);
                        }
                    }}
                >
                    {t('buttons.save')}
                </Button>
            </Form>
        </>
    );
};
