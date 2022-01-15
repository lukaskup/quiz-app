import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { useParams } from 'react-router';
import { quizzes } from '../../dummyData';

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
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { id }: QuizEditUrlParams = useParams();
    useEffect(() => {
        const activeQuiz = quizzes.find((quiz) => quiz._id === id);
        setQuiz(activeQuiz ? activeQuiz : null);
    }, []);

    return (
        <>
            <h1>
                {type === QuizFormTypes.add ? 'Add' : 'Edit'} quiz {type === QuizFormTypes.edit ? quiz?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder={'name'} value={quiz ? quiz.name : ''} className={'error'} />
                    <span className={'error'}>Name field is required</span>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" placeholder={'description'} value={quiz ? quiz.description : ''} />
                </div>
                <div>
                    <label>Image url</label>
                    <input type="text" placeholder={'image url'} value={quiz ? quiz.image_url : ''} />
                </div>
                <InfoBadge className={'error'}>Please enter name</InfoBadge>
                <Button type={'submit'} onClick={(e) => e.preventDefault}>
                    Save
                </Button>
            </Form>
        </>
    );
};
