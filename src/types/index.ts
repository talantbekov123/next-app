export interface Loan {
    id: string;
    amount: number;
    interest: number;
    duration: number;
    collateral: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface ModalHandles {
    openModal: () => void;
    openEditModal: (loan: Loan) => void;
}