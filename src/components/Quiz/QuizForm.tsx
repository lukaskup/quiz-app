import React from 'react';
import { QuizContainer } from './Quiz.styled';

export enum QuizFormTypes {
    edit = 'edit',
    add = 'add',
}

interface QuizFormProps {
    type: QuizFormTypes;
}

export const QuizForm = ({ type }: QuizFormProps) => {
    return <QuizContainer>{type} form</QuizContainer>;
};
