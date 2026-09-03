'use client';

import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type AnswerDisposalModalProps = ModalActions & {
  onPay: () => void;
  onReturn: () => void;
};

const fees = [
  ['Calculation Disposal Fee', '၅၉,၉၀၀ ကျပ်'],
  ['Unused Answer Storage Fee', '၂၀,၀၀၀ ကျပ်'],
  ['Mathematical Administration Fee', '၂၀,၀၀၀ ကျပ်'],
];

export function AnswerDisposalModal({onClose, onPay, onReturn}: AnswerDisposalModalProps) {
  return (
    <FlowDialog label="ANSWER DISPOSAL REQUEST" title="သေချာပါသလား?" description="တွက်ချက်ပြီးသားအဖြေကို မကြည့်ဘဲ ဖျက်သိမ်းရန် Processing Fee လိုအပ်ပါသည်။" onClose={onClose}>
      <div className="fee-total-card"><span>ANSWER DISPOSAL FEE</span><strong>၉၉,၉၀၀</strong><small>ကျပ်</small></div>
      <div className="fee-breakdown">
        {fees.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        <div className="fee-sum"><span>စုစုပေါင်း</span><strong>၉၉,၉၀၀ ကျပ်</strong></div>
      </div>
      <p className="fee-explainer">တွက်ပြီးသားအဖြေကို စွန့်ပစ်ရာတွင် Server Resources အသုံးပြုရပါသည်။</p>
      <Button className="flow-primary" onClick={onPay}>မကြည့်တော့ရန် ၉၉,၉၀၀ ကျပ်ပေးမယ် <span>→</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onReturn}>သိန်း ၃၀ Plan ကို ပြန်ကြည့်မယ်</Button>
    </FlowDialog>
  );
}
