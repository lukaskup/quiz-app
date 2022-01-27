import React, { ReactElement, useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button } from '../../App.styled';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { UserQuiz } from '../../models/UserQuiz';
import { Link } from 'react-router-dom';
import { api } from '../../api';

interface UserQuizListProps {
    userQuizzes?: Array<UserQuiz> | null;
    title?: ReactElement;
    dontShow?: Array<string>;
}

export const UserQuizList = ({ userQuizzes, title, dontShow }: UserQuizListProps) => {
    const deleteModalState = useModalState();
    const [activeDeleteUserQuiz, setActiveDeleteUserQuiz] = useState<UserQuiz | null>(null);
    const [userQuizes, setUserQuizes] = useState<UserQuiz[]>(
        userQuizzes !== null && typeof userQuizzes !== 'undefined' ? userQuizzes : [],
    );

    useEffect(() => {
        if (userQuizzes !== null) {
            api.getUserQuizes().then((data) => {
                setUserQuizes(data['userQuizes']);
            });
        }
    }, []);

    const handleDelete = () => {
        if (activeDeleteUserQuiz) {
            api.deleteUserQuiz(activeDeleteUserQuiz._id).then(() => {
                setUserQuizes(userQuizes.filter((userQuiz) => userQuiz._id !== activeDeleteUserQuiz._id));
                setActiveDeleteUserQuiz(null);
                deleteModalState.setIsOpen(false);
            });
        }
    };

    return (
        <>
            {title ? title : <h1 style={{ display: 'inline-block' }}>UserQuizzes list</h1>}
            {!title && (
                <ButtonLink to="/userQuiz/add" style={{ marginTop: '50px', float: 'right' }}>
                    Add
                </ButtonLink>
            )}
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Submitted at</th>
                        <th>rating</th>
                        <th>score</th>
                        {!dontShow?.includes('user') ? <th>user</th> : ''}
                        {!dontShow?.includes('quiz') ? <th>quiz</th> : ''}
                        <th>Actions</th>
                    </tr>
                </thead>
                {userQuizes.map((userQuiz: UserQuiz, i: number) => {
                    return (
                        <tr key={`${userQuiz}-${i}`}>
                            <td>{userQuiz._id}</td>
                            <td>{userQuiz.submitted_at}</td>
                            <td>{userQuiz.rating ? userQuiz.rating : '-'}</td>
                            <td>{userQuiz.score}</td>
                            {!dontShow?.includes('user') && userQuiz.user ? (
                                <td>
                                    <Link to={`/user/view/${userQuiz.user._id}`}>
                                        {`${userQuiz.user.firstname} ${userQuiz.user.lastname}`}
                                    </Link>
                                </td>
                            ) : (
                                ''
                            )}
                            {!dontShow?.includes('quiz') && userQuiz.quiz ? (
                                <td>
                                    <Link to={`/quiz/view/${userQuiz.quiz._id}`}>{userQuiz.quiz.name}</Link>
                                </td>
                            ) : (
                                ''
                            )}
                            <td>
                                <ButtonLink to={`/userQuiz/view/${userQuiz._id}`}>View</ButtonLink>
                                <ButtonLink to={`/userQuiz/edit/${userQuiz._id}`}>Edit</ButtonLink>
                                <ButtonIcon
                                    className="delete-button"
                                    onClick={() => {
                                        setActiveDeleteUserQuiz(userQuiz);
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
                            <span>Delete User-quiz</span>
                            <ReactSVG
                                src={CloseIcon}
                                className={'close-icon'}
                                onClick={() => deleteModalState.setIsOpen(false)}
                            />
                        </ModalTitle>
                        <ModalContent>
                            Are you sure u want to delete user-quiz {activeDeleteUserQuiz?._id}?
                        </ModalContent>
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
