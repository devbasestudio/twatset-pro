'use client';

import {ShieldCheck} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';
import type {ModalActions} from './types';

type FakeCheckoutProps = ModalActions & {
  discounted: boolean;
  onPay: () => void;
};

export function FakeCheckout({onClose, discounted, onPay}: FakeCheckoutProps) {
  const planPrice = discounted ? '၂၉၉,၈၉၉' : '၂၉၉,၉၀၀';
  const total = discounted ? '၃၉၉,၅၉၉' : '၃၉၉,၆၀၀';
  const fees = [
    ['Pro Subscription', `${planPrice} ကျပ်`],
    ['Calculation Processing Fee', '၄၉,၉၀၀ ကျပ်'],
    ['Result Reveal Fee', '၂၉,၉၀၀ ကျပ်'],
    ['Mathematics Infrastructure Fee', '၁၉,၉၀၀ ကျပ်'],
  ];

  return (
    <FlowDialog label="SECURE CHECKOUT" title="အဖြေကို Unlock လုပ်ရန်" description={`ရွေးချယ်ထားသော Plan — တွက်စက် Pro · ${planPrice} ကျပ်`} onClose={onClose}>
      <div className="checkout-fees fee-breakdown">
        {fees.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="checkout-total"><span>စုစုပေါင်း</span><strong>{total}</strong><small>ကျပ်</small></div>
      <p className="checkout-warning">အခွန်မပါဝင်သေးပါ။ အဖြေလည်း မပါဝင်သေးပါ။</p>
      <div className="payment-methods" aria-label="Payment methods">
        <span>KBZPay</span><span>WavePay</span><span>MMQR</span><span>အမေ့ဆီက ပိုက်ဆံတောင်းမယ်</span>
      </div>
      <Button className="flow-primary" onClick={onPay}><ShieldCheck aria-hidden="true" /> {total} ကျပ်ပေးမယ် <span>→</span></Button>
      <p className="parody-note">Parody Demo — ငွေပေးချေမှုအချက်အလက် မတောင်းပါ။</p>
    </FlowDialog>
  );
}
