import React, { useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button, InfoBadge } from '../../App.styled';
import { Quiz } from '../../models/Quiz';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { api } from '../../api';
import { useInfoBadge } from '../../hooks/useInfoBadge';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const QuizList = () => {
    const deleteModalState = useModalState();
    const [activeDeleteQuiz, setActiveDeleteQuiz] = useState<Quiz | null>(null);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const { showInfoBadge } = useInfoBadge();
    const history = useHistory();
    const location = useLocation();
    const { getUser } = useAuth();
    const authUser = getUser();
    useEffect(() => {
        api.getQuizes().then((data) => {
            setQuizes(data);
        });
    }, []);

    const { t } = useTranslation();

    const handleDelete = () => {
        if (activeDeleteQuiz) {
            api.deleteQuiz(activeDeleteQuiz._id).then(() => {
                setQuizes(quizes.filter((quiz) => quiz._id !== activeDeleteQuiz._id));
                setActiveDeleteQuiz(null);
                deleteModalState.setIsOpen(false);
                history.replace({ pathname: location.pathname, search: '?success=delete' });
            });
        }
    };

    return (
        <>
            {showInfoBadge === 'add' && <InfoBadge className={'success'}>{t('infoBadge.add')}</InfoBadge>}
            {showInfoBadge === 'edit' && <InfoBadge className={'success'}>{t('infoBadge.edit')}</InfoBadge>}
            {showInfoBadge === 'delete' && <InfoBadge className={'success'}>{t('infoBadge.delete')}</InfoBadge>}
            <h1 style={{ display: 'inline-block' }}>{t('quizList')}</h1>
            {authUser && (
                <ButtonLink to="/quiz/add" style={{ marginTop: '50px', float: 'right' }}>
                    {t('buttons.add')}
                </ButtonLink>
            )}
            <Table>
                <thead>
                    <tr>
                        <th>{t('form.id')}</th>
                        <th>{t('quizTable.name')}</th>
                        <th>{t('quizTable.description')}</th>
                        <th>{t('quizTable.imageUrl')}</th>
                        <th>{t('form.actions')}</th>
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
                                <ButtonLink to={`/quiz/view/${quiz._id}`}>{t('buttons.view')}</ButtonLink>
                                {authUser && <ButtonLink to={`/quiz/edit/${quiz._id}`}>{t('buttons.edit')}</ButtonLink>}
                                {authUser && (
                                    <ButtonIcon
                                        className="delete-button"
                                        onClick={() => {
                                            setActiveDeleteQuiz(quiz);
                                            deleteModalState.setIsOpen(true);
                                        }}
                                    >
                                        <ReactSVG src={TrashIcon} />
                                    </ButtonIcon>
                                )}
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
                            <span>{t('deleteModal.deleteQuiz')}</span>
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
