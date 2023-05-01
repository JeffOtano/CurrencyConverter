import { Currency } from '../../types';

const CZECH_CONVERSION_ENDPOINT =
    'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const fetchCurrencies = async () => {
    try {
        const response = await fetch(CZECH_CONVERSION_ENDPOINT);

        if (!response.ok) {
            throw new Error('Error fetching data');
        }

        const text = await response.text();

        // Remove the first two lines of the response that are metadata
        const lines = text.split('\n').slice(2);
        const currencies: Currency[] = lines
            .filter((line) => line.trim() !== '')
            .map((line) => {
                const [country, currency, amount, code, rate] = line.split('|');
                return {
                    country,
                    currency,
                    amount: parseFloat(amount),
                    code,
                    rate: parseFloat(rate),
                };
            });

        return currencies;
    } catch (error) {
        console.error('Error fetching currency data:', error);
        throw error;
    }
};

export default fetchCurrencies;
