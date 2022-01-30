import React, { ReactElement, useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button, InfoBadge } from '../../App.styled';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { User } from '../../models/User';
import { api } from '../../api';
import { useInfoBadge } from '../../hooks/useInfoBadge';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

interface QuizListProps {
    title?: ReactElement;
}

export const UserList = ({ title }: QuizListProps) => {
    const deleteModalState = useModalState();
    const [activeDeleteUser, setActiveDeleteUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        api.getUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = () => {
        if (activeDeleteUser) {
            api.deleteUser(activeDeleteUser._id).then(() => {
                setUsers(users.filter((user) => user._id !== activeDeleteUser._id));
                setActiveDeleteUser(null);
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
            {title ? title : <h1 style={{ display: 'inline-block' }}>Users list</h1>}
            {!title && (
                <ButtonLink to="/user/add" style={{ marginTop: '50px', float: 'right' }}>
                    {t('buttons.add')}
                </ButtonLink>
            )}
            <Table>
                <thead>
                    <tr>
                        <th>{t('form.id')}</th>
                        <th>{t('userTable.firstName')}</th>
                        <th>{t('userTable.lastName')}</th>
                        <th>{t('userTable.email')}</th>
                        <th>{t('form.actions')}</th>
                    </tr>
                </thead>
                {users.map((user: User) => {
                    return (
                        <tr key={`${user._id}`}>
                            <td>{user._id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <ButtonLink to={`/user/view/${user._id}`}>{t('buttons.view')}</ButtonLink>
                                <ButtonLink to={`/user/edit/${user._id}`}>{t('buttons.edit')}</ButtonLink>
                                <ButtonIcon
                                    className="delete-button"
                                    onClick={() => {
                                        setActiveDeleteUser(user);
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
                            <span>{t('deleteModal.deleteUser')}</span>
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
