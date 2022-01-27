import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
    display: inline-block;
    padding: 6px 10px;
    border-radius: 5px;
    background: ${({ theme }) => theme.accent};
    text-decoration: none;
    color: white;
    margin-right: 5px;
    cursor: pointer;
    border: none;
`;

export const ButtonIcon = styled.div`
    display: inline-block;
    padding: 0 7px;
    height: 35px;
    border-radius: 5px;
    background: #6db183;
    text-decoration: none;
    color: white;
    margin-right: 5px;
    cursor: pointer;

    svg {
        fill: white;
        transform: translateY(5px);
    }
`;

export const ButtonLink = styled(Link)`
    display: inline-block;
    padding: 6px 10px;
    border-radius: 5px;
    background: ${({ theme }) => theme.accent};
    text-decoration: none;
    color: white;
    margin-right: 5px;
`;

export const Container = styled.div`
    position: relative;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 40px;
`;

export const Table = styled.table`
    border: 1px solid #d1d1d1;
    border-radius: 9px;
    box-shadow: 8px 5px 11px -9px ${({ theme }) => theme.accent}70;
    width: 100%;
    border-spacing: 0;
    tr {
        th {
            text-align: left;
        }

        td,
        th {
            max-width: 300px;
            padding: 12px;
            border-bottom: 1px solid #d1d1d1;
            border-collapse: inherit;

            &:nth-child(1) {
                width: 8em;
                min-width: 8em;
                max-width: 8em;
                text-overflow: ellipsis;
                overflow: hidden;
                height: 1.2em;
                white-space: nowrap;
            }
        }

        :nth-last-child(1) {
            td {
                border: none;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        a {
            text-align: center;
            margin-bottom: 5px;
        }

        .delete-button {
            text-align: center;
        }
    }
`;

export const ViewContainer = styled(Container)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border: 1px solid #d1d1d1;
    border-radius: 9px;
    box-shadow: 8px 5px 11px -9px ${({ theme }) => theme.accent}70;
`;

export const ViewInfo = styled.div`
    padding: 10px 15px;
    span {
        font-weight: 600;
        display: block;
        margin-bottom: 5px;

        &:nth-child(2) {
            font-weight: 400;
        }
    }
`;

export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border: 1px solid #d1d1d1;
    border-radius: 9px;
    box-shadow: 8px 5px 11px -9px ${({ theme }) => theme.accent}70;
    padding: 10px 15px;
    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        position: relative;
    }

    label {
        font-weight: 600;
        margin-bottom: 5px;
        font-size: 18px;
    }

    input,
    select {
        padding: 8px;
        border: 1px solid #d1d1d1;
        border-radius: 9px;
        color: black;
        font-size: 16px;

        &.error {
            border-color: red;
        }
    }

    span.error {
        color: red;
        position: absolute;
        bottom: -20px;
        font-size: 13px;
        margin-left: 2px;
    }
`;

export const InfoBadge = styled.div`
    border: 1px solid;
    border-radius: 9px;
    box-shadow: 8px 5px 11px -9px ${({ theme }) => theme.accent}70;
    padding: 10px 15px;
    margin-top: 15px;

    &.success {
        border-color: ${({ theme }) => theme.accent};
        background: ${({ theme }) => theme.accent}e0;
        color: white;
    }

    &.error {
        border-color: red;
        background: #ff4d4d;
        color: black;
    }
`;
