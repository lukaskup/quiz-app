import React, { useState } from 'react';
import { Table, ButtonIcon, ButtonLink, Button, InfoBadge } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';

interface QuizListProps {
    quizzes: Array<Quiz>;
}

export const QuizList = ({ quizzes }: QuizListProps) => {
    const deleteModalState = useModalState();
    const [activeDeleteQuiz, setActiveDeleteQuiz] = useState<Quiz | null>(null);

    return (
        <>
            <InfoBadge className={'success'}>Successfully added quiz to database! :)</InfoBadge>
            <InfoBadge className={'success'}>Successfully updated quiz in database! :)</InfoBadge>
            <InfoBadge className={'success'}>Successfully deleted quiz in database! :)</InfoBadge>
            <h1 style={{ display: 'inline-block' }}>Quizzes list</h1>
            <ButtonLink to="/quiz/add" style={{ marginTop: '50px', float: 'right' }}>
                Add
            </ButtonLink>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image url</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {quizzes.map((quiz: Quiz, i: number) => {
                    return (
                        <tr key={`${quiz}-${i}`}>
                            <td>{quiz._id}</td>
                            <td>{quiz.name}</td>
                            <td>{quiz.description}</td>
                            <td>{quiz.image_url ? quiz.image_url : '-'}</td>
                            <td>
                                <ButtonLink to={`/quiz/view/${quiz._id}`}>View</ButtonLink>
                                <ButtonLink to={`/quiz/edit/${quiz._id}`}>Edit</ButtonLink>
                                <ButtonIcon
                                    className="delete-button"
                                    onClick={() => {
                                        setActiveDeleteQuiz(quiz);
                                        deleteModalState.setIsOpen(true);
                                    }}
                                >
                                    <ReactSVG src={TrashIcon} />
                                </ButtonIcon>
                            </td>
                        </tr>
                    );
                })}
            </Table>
            <Modal
                state={deleteModalState}
                body={
                    <>
                        <ModalTitle>
                            <span>Delete Quiz</span>
                            <ReactSVG
                                src={CloseIcon}
                                className={'close-icon'}
                                onClick={() => deleteModalState.setIsOpen(false)}
                            />
                        </ModalTitle>
                        <ModalContent>Are you sure u want to delete quiz {activeDeleteQuiz?._id}?</ModalContent>
                        <ModalButtons>
                            <Button style={{ float: 'right', background: 'red' }}>Yes, delete!</Button>
                            <Button style={{ float: 'right' }}>Nope!</Button>
                        </ModalButtons>
                    </>
                }
            />
        </>
    );
};
