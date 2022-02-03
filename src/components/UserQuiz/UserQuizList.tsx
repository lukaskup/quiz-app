import React, { ReactElement, useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button, InfoBadge } from '../../App.styled';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { UserQuiz } from '../../models/UserQuiz';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { useInfoBadge } from '../../hooks/useInfoBadge';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

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

    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (userQuizzes == null) {
            api.getUserQuizes().then((data) => {
                setUserQuizes(data['userQuizes']);
            });
        } else {
            setUserQuizes(userQuizzes);
        }
    }, [userQuizzes]);

    const handleDelete = () => {
        if (activeDeleteUserQuiz) {
            api.deleteUserQuiz(activeDeleteUserQuiz._id).then(() => {
                setUserQuizes(userQuizes.filter((userQuiz) => userQuiz._id !== activeDeleteUserQuiz._id));
                setActiveDeleteUserQuiz(null);
                deleteModalState.setIsOpen(false);
                history.replace({ pathname: location.pathname, search: '?success=delete' });
            });
        }
    };

    const { showInfoBadge } = useInfoBadge();

    return (
        <>
            {showInfoBadge === 'add' && <InfoBadge className={'success'}>{t('infoBadge.add')}</InfoBadge>}
            {showInfoBadge === 'edit' && <InfoBadge className={'success'}>{t('infoBadge.edit')}</InfoBadge>}
            {showInfoBadge === 'delete' && <InfoBadge className={'success'}>{t('infoBadge.delete')}</InfoBadge>}
            {title ? title : <h1 style={{ display: 'inline-block' }}>{t('quizView.quizAttempts')}</h1>}
            {!title && (
                <ButtonLink to="/userQuiz/add" style={{ marginTop: '50px', float: 'right' }}>
                    {t('buttons.add')}
                </ButtonLink>
            )}
            <Table>
                <thead>
                    <tr>
                        <th>{t('form.id')}</th>
                        <th>{t('userQuizesTable.submittedAt')}</th>
                        <th>{t('userQuizesTable.rating')}</th>
                        <th>{t('userQuizesTable.score')}</th>
                        {!dontShow?.includes('user') ? <th>{t('userQuizesTable.user')}</th> : ''}
                        {!dontShow?.includes('quiz') ? <th>{t('userQuizesTable.quiz')}</th> : ''}
                        <th>{t('form.actions')}</th>
                    </tr>
                </thead>
                {userQuizes.map((userQuiz: UserQuiz, i: number) => {
                    return (
                        <tr key={`${userQuiz}-${i}`}>
                            <td>{userQuiz._id}</td>
                            <td>{new Date(userQuiz.submitted_at).toLocaleDateString()}</td>
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
                                <ButtonLink to={`/userQuiz/view/${userQuiz._id}`}>{t('buttons.view')}</ButtonLink>
                                <ButtonLink to={`/userQuiz/edit/${userQuiz._id}`}>{t('buttons.edit')}</ButtonLink>
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
                            <span>{t('deleteModal.deleteUserQuiz')}</span>
                            <ReactSVG
                                src={CloseIcon}
                                className={'close-icon'}
                                onClick={() => deleteModalState.setIsOpen(false)}
                            />
                        </ModalTitle>
                        <ModalContent>{t('deleteModal.title')}</ModalContent>
                        <ModalButtons>
                            <Button style={{ float: 'right', background: 'red' }} onClick={handleDelete}>
                                {t('deleteModal.yes')}
                            </Button>
                            <Button style={{ float: 'right' }}>{t('deleteModal.no')}</Button>
                        </ModalButtons>
                    </>
                }
            />
        </>
    );
};
