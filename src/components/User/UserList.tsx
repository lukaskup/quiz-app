import React, { ReactElement, useState, useEffect } from 'react';
import { Table, ButtonIcon, ButtonLink, Button } from '../../App.styled';
import { ReactSVG } from 'react-svg';
import TrashIcon from '../../assets/icons/TrashIcon.svg';
import { Modal } from '../Modal';
import { ModalButtons, ModalContent, ModalTitle } from '../Modal/Modal.styled';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import { useModalState } from '../Modal/Modal';
import { User } from '../../models/User';
import { api } from '../../api';
interface QuizListProps {
    title?: ReactElement;
}

export const UserList = ({ title }: QuizListProps) => {
    const deleteModalState = useModalState();
    const [activeDeleteUser, setActiveDeleteUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

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
            });
        }
    };

    return (
        <>
            {title ? title : <h1 style={{ display: 'inline-block' }}>Users list</h1>}
            {!title && (
                <ButtonLink to="/user/add" style={{ marginTop: '50px', float: 'right' }}>
                    Add
                </ButtonLink>
            )}
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
                {users.map((user: User) => {
                    return (
                        <tr key={`${user._id}`}>
                            <td>{user._id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <ButtonLink to={`/user/view/${user._id}`}>View</ButtonLink>
                                <ButtonLink to={`/user/edit/${user._id}`}>Edit</ButtonLink>
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
                            <span>Delete User</span>
                            <ReactSVG
                                src={CloseIcon}
                                className={'close-icon'}
                                onClick={() => deleteModalState.setIsOpen(false)}
                            />
                        </ModalTitle>
                        <ModalContent>Are you sure u want to delete user {activeDeleteUser?._id}?</ModalContent>
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
