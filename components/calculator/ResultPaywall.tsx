'use client';

import {LockKeyhole} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type ResultPaywallProps = ModalActions & {
  onUnlock: () => void;
};

export function ResultPaywall({onClose, onUnlock}: ResultPaywallProps) {
  return (
    <FlowDialog
      label="RESULT READY · ONE FINAL STEP"
      title="အဖြေထွက်ပြီ"
      description="အဖြေကို ဖော်ပြဖို့ တစ်ဆင့်ပဲ ကျန်ပါတော့တယ်။"
      onClose={onClose}
    >
      <div className="lock-seal" aria-hidden="true"><LockKeyhole /></div>
      <div className="modal-price"><strong>၄၀၀,၀၀၀</strong><span>ကျပ်</span></div>
      <p className="price-caption">Result Reveal Fee</p>
      <div className="locked-plan"><LockKeyhole aria-hidden="true" /> အဖြေကို ဖော်ပြရန် ငွေပေးချေမှု လိုအပ်ပါသည်။</div>
      <Button className="flow-primary" onClick={onUnlock}>၄၀၀,၀၀၀ ကျပ်ပေးပြီး အဖြေကြည့်မယ် <span>→</span></Button>
      <p className="fine-print">Parody Demo — အမှန်တကယ် ငွေပေးချေမှု မပြုလုပ်ပါ။</p>
    </FlowDialog>
  );
}
