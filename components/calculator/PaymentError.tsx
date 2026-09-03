'use client';

import {RotateCcw, TrendingUp} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type PaymentErrorProps = ModalActions & {
  onRetry: () => void;
  onExit: () => void;
};

export function PaymentError({onClose, onRetry, onExit}: PaymentErrorProps) {
  return (
    <FlowDialog
      label="PAYMENT ACCEPTED* · PRICE UPDATED"
      title="ပေးလိုက်တာနဲ့ ဈေးတက်သွားပါပြီ!"
      description="၄ သိန်းပေးရဲတာကို AI က မြင်သွားလို့ ဒီအဖြေက ဒီထက်ပိုတန်တယ်လို့ ဆုံးဖြတ်လိုက်ပါတယ်။"
      onClose={onClose}
      compact
    >
      <div className="error-symbol" aria-hidden="true"><TrendingUp /></div>
      <div className="error-code"><span>ဈေးနှုန်းအသစ်</span><strong>၄၉၉,၀၀၀ ကျပ်</strong></div>
      <Button className="flow-primary" onClick={onRetry}><RotateCcw aria-hidden="true" /> ၄ သိန်းနဲ့ ပြန်ညှိကြည့်မယ် <span>↻</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onExit}>မကြည့်တော့ပါ</Button>
      <p className="fine-print">* Parody Demo ဖြစ်သဖြင့် တကယ်ငွေမဖြတ်ပါ။ ဈေးကတော့ တက်ပါတယ်။</p>
    </FlowDialog>
  );
}
