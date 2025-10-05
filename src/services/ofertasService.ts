import api from './apiConfig';

export interface OfertaAPI {
    "offerId": string;
    "offerStatus": string;
    "loyaltyProgram": string;
    "offerType": string;
    "accountLogin": string;
    "createdAt": string;
    "availableQuantity": number;
}


interface RespostaAPI {
    totalQuantityOffers: number;
    offers: OfertaAPI[];
}


export interface RankingItem {
    mile_value: number;
    description: string;
    position: number;
}

export const buscarOfertas = async (): Promise<OfertaAPI[]> => {
    try {
        const response = await api.get('/simulate-offers-list');
        const data: RespostaAPI = response.data;
        const ofertas = data.offers || [];
        return ofertas;
    } catch (error: unknown) {
        console.error('Erro ao buscar ofertas:', error);
        throw error;
    }
};

export const buscarRanking = async (mileValue: number): Promise<RankingItem[]> => {
    try {
        const response = await api.get(`/simulate-ranking?mile_value=${mileValue}`);
        return response.data;
    } catch (error: unknown) {
        console.error('Erro ao buscar ranking:', error);
        throw error;
    }
};

