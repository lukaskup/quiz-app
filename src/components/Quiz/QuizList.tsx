import React, { useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { api } from '../../api';

export const QuizList = () => {
    const deleteModalState = useModalState();
    const [activeDeleteQuiz, setActiveDeleteQuiz] = useState<Quiz | null>(null);
    const [quizes, setQuizes] = useState<Quiz[]>([]);

    useEffect(() => {
        api.getQuizes().then((data) => {
            setQuizes(data);
        });
    }, []);

    const handleDelete = () => {
        if (activeDeleteQuiz) {
            api.deleteQuiz(activeDeleteQuiz._id).then(() => {
                setQuizes(quizes.filter((quiz) => quiz._id !== activeDeleteQuiz._id));
                setActiveDeleteQuiz(null);
                deleteModalState.setIsOpen(false);
            });
        }
    };

    return (
        <>
            {/* <InfoBadge className={'success'}>Successfully added quiz to database! :)</InfoBadge> */}
            {/* <InfoBadge className={'success'}>Successfully updated quiz in database! :)</InfoBadge> */}
            {/* <InfoBadge className={'success'}>Successfully deleted quiz in database! :)</InfoBadge> */}
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
                {quizes.map((quiz: Quiz, i: number) => {
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
                            <Button style={{ float: 'right', background: 'red' }} onClick={handleDelete}>
                                Yes, delete!
                            </Button>
                            <Button style={{ float: 'right' }}>Nope!</Button>
                        </ModalButtons>
                    </>
                }
            />
        </>
    );
};
