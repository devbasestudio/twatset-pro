export type Operator = '+' | '−' | '×' | '÷';

export type FlowStep =
  | 'paywall'
  | 'discount'
  | 'disposal'
  | 'exitFee'
  | 'checkout'
  | 'processing'
  | 'error'
  | null;

export type ClosableStep = Exclude<FlowStep, 'exitFee' | 'processing' | null>;

export type ModalActions = {
  onClose: () => void;
};
