import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Keyboard,
    Text,
    SafeAreaView,
    TextInput,
    View,
    PressableProps,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Header from './Header';
import CurrencyList from './CurrencyList';
import fetchCurrencies from './utils/fetchCurrencies';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    const {
        data: currencies,
        isLoading,
        error,
    } = useQuery('currencies', fetchCurrencies, {
        retry: 3,
        retryDelay: 1000,
    });

    const convertCurrency = () => {
        if (!currencies) return;
        const currency = currencies.find((c) => c.code === selectedCode);
        if (currency) {
            const czkAmount = parseFloat(amount);
            setConvertedAmount(czkAmount / currency.rate);
            setSelectedCurrency(currency.currency);
        } else {
            setConvertedAmount(null);
            setSelectedCurrency('');
        }
        Keyboard.dismiss();
    };

    const handleAmountChange = (text: string) => {
        const number = parseFloat(text);
        if (isNaN(number)) {
            setAmount('');
        } else {
            setAmount(number.toString());
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error || !currencies) {
        return <Text>Error fetching data</Text>;
    }

    return (
        <Container>
            <ScrollView>
                <Header />
                <Input
                    keyboardType='numeric'
                    placeholder='Enter amount in CZK'
                    placeholderTextColor={'gray'}
                    value={amount}
                    onChangeText={handleAmountChange}
                />
                <PickerContainer>
                    <Picker
                        selectedValue={selectedCode}
                        onValueChange={(itemValue) => {
                            setSelectedCode(itemValue);
                        }}
                    >
                        {currencies.map((currency) => (
                            <Picker.Item
                                key={currency.country}
                                label={currency.country}
                                value={currency.code}
                            />
                        ))}
                    </Picker>
                </PickerContainer>
                <ConvertButton
                    disabled={amount === '' || isNaN(parseFloat(amount))}
                    onPress={convertCurrency}
                >
                    <ButtonText>Convert</ButtonText>
                </ConvertButton>
                {convertedAmount !== null && amount !== '' && (
                    <ResultText>
                        {amount} Czech Koruna = {convertedAmount.toFixed(2)}{' '}
                        {selectedCurrency}
                    </ResultText>
                )}
                {currencies && <CurrencyList currencies={currencies} />}
            </ScrollView>
        </Container>
    );
};

const Container = styled(SafeAreaView)`
    width: 90%;
    justify-content: flex-start;
    flex: 1;
`;

const Input = styled(TextInput)`
    border: 1px solid gray;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 8px;
`;

const PickerContainer = styled(View)`
    border: 1px solid gray;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const ConvertButton = styled(TouchableOpacity)`
    background-color: #6643f0;
    opacity: ${({ disabled }: PressableProps) => (disabled ? 0.6 : 1.0)};
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const ButtonText = styled(Text)`
    color: white;
    text-align: center;
    font-weight: bold;
`;

const ResultText = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;

export default CurrencyConverter;
