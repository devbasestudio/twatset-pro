'use client';

import type {CSSProperties} from 'react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type DiscountModalProps = ModalActions & {
  countdown: number;
  onAccept: () => void;
  onDecline: () => void;
};

export function DiscountModal({onClose, countdown, onAccept, onDecline}: DiscountModalProps) {
  return (
    <FlowDialog label="EXCLUSIVE RETENTION OFFER" title="ခဏလေး!" description="သင့်ရဲ့ တွက်ချက်မှုကို ဒီအတိုင်း လက်လွှတ်မလို့လား?" onClose={onClose} compact>
      <div className="confetti" aria-hidden="true">
        {Array.from({length: 12}, (_, index) => <i key={index} style={{'--i': index, '--left': `${(index * 37) % 94}%`} as CSSProperties} />)}
      </div>
      <span className="offer-label">သင့်အတွက်သာ အထူးလျှော့ဈေး</span>
      <div className="old-price">၂၉၉,၉၀၀ ကျပ် / လ</div>
      <div className="modal-price discount-price"><strong>၂၉၉,၈၉၉</strong><span>ကျပ် / လ</span></div>
      <div className="discount-badge"><span>↓</span> ၁ ကျပ်တောင် သက်သာပါတယ်</div>
      <p className="countdown-copy">ဒီအခွင့်အရေး <strong>00:{String(countdown).padStart(2, '0')}</strong> စက္ကန့်သာ ကျန်ပါသည်။</p>
      <Button className="flow-primary" onClick={onAccept}>၁ ကျပ်လျှော့ဈေး ယူမယ် <span>→</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onDecline}>အဖြေကို တကယ်မသိချင်ပါ</Button>
    </FlowDialog>
  );
}
