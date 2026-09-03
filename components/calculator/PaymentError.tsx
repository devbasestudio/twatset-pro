'use client';

import {RotateCcw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type PaymentErrorProps = ModalActions & {
  onRetry: () => void;
  onDiscount: () => void;
};

export function PaymentError({onClose, onRetry, onDiscount}: PaymentErrorProps) {
  return (
    <FlowDialog label="TRANSACTION INTERRUPTED" title="ငွေပေးချေမှု မအောင်မြင်ပါ" description="အဖြေသိချင်သူ များပြားနေသောကြောင့် Mathematics Server အလုပ်များနေပါသည်။" onClose={onClose} compact>
      <div className="error-symbol" aria-hidden="true">!</div>
      <div className="error-code"><span>Error code</span><strong>TOO_MANY_ANSWER_SEEKERS</strong></div>
      <Button className="flow-primary" onClick={onRetry}><RotateCcw aria-hidden="true" /> ထပ်ကြိုးစားမယ် <span>↻</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onDiscount}>၁ ကျပ်လျှော့ဈေးကို ပြန်ယူမယ်</Button>
    </FlowDialog>
  );
}
