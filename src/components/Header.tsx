import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const Header = () => {
    return <HeaderText>Czech Currency Converter</HeaderText>;
};

const HeaderText = styled(Text)`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-top: 32px;
    margin-bottom: 20px;
    text-align: center;
`;

export default Header;
