import React from 'react';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import CurrencyConverter from './src/components/CurrencyConverter';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <CurrencyConverter />
            </Container>
        </QueryClientProvider>
    );
}

const Container = styled(View)`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;
