import React, { useState } from 'react';
import { Table, ButtonIcon, ButtonLink, Button } from '../../App.styled';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { User } from '../../models/User';

interface QuizListProps {
    users: Array<User>;
}

export const UserList = ({ users }: QuizListProps) => {
    const deleteModalState = useModalState();
    const [activeDeleteUser, setActiveDeleteUser] = useState<User | null>(null);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>Users list</h1>
            <ButtonLink to="/quiz/add" style={{ marginTop: '50px', float: 'right' }}>
                Add
            </ButtonLink>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {users.map((user: User, i: number) => {
                    return (
                        <tr key={`${user.id}-${i}`}>
                            <td>{user.id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <ButtonLink to={`/user/view/${user.id}`}>View</ButtonLink>
                                <ButtonLink to={`/user/edit/${user.id}`}>Edit</ButtonLink>
                                <ButtonIcon
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
                            <title>Delete User</title>
                            <ReactSVG
                                src={CloseIcon}
                                className={'close-icon'}
                                onClick={() => deleteModalState.setIsOpen(false)}
                            />
                        </ModalTitle>
                        <ModalContent>Are you sure u want to delete user {activeDeleteUser?.id}?</ModalContent>
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
