'use client';

import {Check, LockKeyhole} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type ResultPaywallProps = ModalActions & {
  onUnlock: () => void;
  onDecline: () => void;
};

const features = ['ပေါင်းခြင်း', 'နုတ်ခြင်း', 'မြှောက်ခြင်း', 'စားခြင်း', 'Decimal Support', 'အဖြေကြည့်ရှုခွင့်'];

export function ResultPaywall({onClose, onUnlock, onDecline}: ResultPaywallProps) {
  return (
    <FlowDialog label="RESULT READY · MEMBERS ONLY" title="အဖြေရရှိပြီးပါပြီ" description="သင့်တွက်ချက်မှု အောင်မြင်ပါသည်။ အဖြေကြည့်ရန် တွက်စက် Pro အဖွဲ့ဝင်ဖြစ်ဖို့ လိုပါတယ်။" onClose={onClose}>
      <div className="lock-seal" aria-hidden="true"><LockKeyhole /></div>
      <div className="modal-price"><strong>၂၉၉,၉၀၀</strong><span>ကျပ် / လ</span></div>
      <p className="price-caption">တွက်ချက်မှုများ Unlimited*</p>
      <ul className="feature-grid">
        {features.map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}
      </ul>
      <div className="locked-plan"><LockKeyhole aria-hidden="true" /> အနုတ်ကိန်းအဖြေများ — Ultra Plan တွင်သာ</div>
      <Button className="flow-primary" onClick={onUnlock}>အဖြေကို Unlock လုပ်မယ် <span>→</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onDecline}>မကြည့်တော့ပါ</Button>
      <p className="fine-print">* အဖြေကြည့်ရှုမှုအတွက် သီးခြားအခကြေးငွေများ ပါဝင်နိုင်ပါသည်။</p>
    </FlowDialog>
  );
}
