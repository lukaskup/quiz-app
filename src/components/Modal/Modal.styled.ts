import styled from 'styled-components';

export const ModalTitle = styled.div`
    padding: 2px 10px 8px 10px;
    border-bottom: 1px solid #d1d1d1;

    title {
        font-size: 24px;
        display: inline-block;
    }

    .close-icon {
        display: inline-block;
        float: right;
        margin-top: 5px;
        margin-right: -12px;
        cursor: pointer;

        svg {
            height: 28px;
        }
    }
`;
export const ModalContent = styled.div`
    padding: 15px 10px 15px 10px;
    border-bottom: 1px solid #d1d1d1;
`;
export const ModalButtons = styled.div`
    padding: 11px 4px;
`;
export const GreyBackground = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'inherit' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000036;
    z-index: 100;
`;
export const ModalBody = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'inherit' : 'none')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 110;
    background: white;
    width: 400px;
    border-radius: 10px;
    padding-bottom: 12px;
`;
