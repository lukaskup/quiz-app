import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.div`
    display: inline-block;
    padding: 6px 10px;
    border-radius: 5px;
    background: ${({ theme }) => theme.accent};
    text-decoration: none;
    color: white;
    margin-right: 5px;
    cursor: pointer;
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
            padding: 12px;
            border-bottom: 1px solid #d1d1d1;
            border-collapse: inherit;
        }

        :nth-last-child(1) {
            td {
                border: none;
            }
        }
    }
`;
