import styled from 'styled-components';
import { Text, View, ScrollView } from 'react-native';
import { Currency } from '../types';

const CurrencyList = ({ currencies }: { currencies: Currency[] }) => {
    return (
        <CurrencyListContainer>
            <CurrencyListHeader />
            {currencies.map((currency) => (
                <CurrencyListItem key={currency.code + '-listItem'}>
                    <CurrencyField>{currency.country}</CurrencyField>
                    <CurrencyField>{currency.currency}</CurrencyField>
                    <CurrencyField>{currency.code}</CurrencyField>
                    <CurrencyField>{currency.rate.toFixed(2)}</CurrencyField>
                </CurrencyListItem>
            ))}
        </CurrencyListContainer>
    );
};

const CurrencyListHeader: React.FC = () => {
    return (
        <HeaderRow>
            <HeaderItem>Country</HeaderItem>
            <HeaderItem>Currency</HeaderItem>
            <HeaderItem>Code</HeaderItem>
            <HeaderItem>Rate</HeaderItem>
        </HeaderRow>
    );
};

const HeaderRow = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 2px;
    border-bottom-color: #333;
`;

const HeaderItem = styled(Text)`
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    padding: 4px;
    width: 92px;
`;

const CurrencyListContainer = styled(ScrollView)`
    width: 100%;
    max-height: 200px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const CurrencyListItem = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
`;

const CurrencyField = styled(Text)`
    font-size: 14px;
    width: 92px;
    text-align: left;
    padding: 8px;
`;

export default CurrencyList;
