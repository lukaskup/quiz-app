import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { GreyBackground, ModalBody } from './Modal.styled';

interface ModalState {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useModalState = (): ModalState => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return {
        isOpen,
        setIsOpen,
    };
};

interface ModalProps {
    body: ReactElement;
    state: ModalState;
}

export const Modal = ({ body, state }: ModalProps) => {
    return ReactDOM.createPortal(
        <>
            <GreyBackground isOpen={state.isOpen} onClick={() => state.setIsOpen(false)} />
            <ModalBody isOpen={state.isOpen}>{body}</ModalBody>
        </>,
        document.body,
    );
};
