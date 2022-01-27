import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { useParams, Redirect } from 'react-router';
import { api } from '../../api';
import { useFormValidation } from '../../hooks/useFormValidation';

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
    const { id }: QuizEditUrlParams = useParams();
    const [redirect, setRedirect] = useState<boolean>(false);
    useEffect(() => {
        if (id) {
            api.getQuiz(id).then((data) => {
                console.log(data);
                if (data['quiz']) {
                    setQuiz(data['quiz']);
                }
            });
        }
    }, []);

    const handleSubmit = () => {
        if (quiz) {
            if (type === QuizFormTypes.edit && quiz._id) {
                api.updateQuiz(quiz).then(() => {
                    setRedirect(true);
                });
            } else if (quiz.name) {
                api.addQuiz(quiz).then(() => {
                    setRedirect(true);
                });
            }
        }
    };

    const { isRequired, minMax, validateField, errors, setErrors } = useFormValidation(handleSubmit);

    const messages = {
        nameRequired: 'please provide correct name',
        nameMinMax: 'name should have length between 3 and 20',
        descriptionRequired: 'please provide correct description',
    };

    const validate = (quiz: Quiz) => {
        const errors: string[] = [];
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

        setErrors(errors);
    };

    if (redirect) {
        return <Redirect to="/quiz" />;
    }

    return (
        <>
            <h1>
                {type === QuizFormTypes.add ? 'Add' : 'Edit'} quiz {type === QuizFormTypes.edit ? quiz?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>Name</label>
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
                    <label>Description</label>
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
                    <label>Image url</label>
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
                        setErrors([...errors]);
                        if (quiz) {
                            validate(quiz);
                        }
                    }}
                >
                    Save
                </Button>
            </Form>
        </>
    );
};
