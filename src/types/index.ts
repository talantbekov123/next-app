export interface Loan {
    id: string;
    amount: number;
    interest: number;
    duration: number;
    collateral: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ModalHandles {
    openModal: () => void;
    openEditModal: (loan: Loan) => void;
}