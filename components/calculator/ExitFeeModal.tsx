'use client';

import {LogOut} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';

type ExitFeeModalProps = {
  onPay: () => void;
  onStay: () => void;
};

export function ExitFeeModal({onPay, onStay}: ExitFeeModalProps) {
  return (
    <FlowDialog label="CALCULATOR EXIT REQUEST" title="Calculator မှ ထွက်တော့မှာလား?" description="အဖြေမသိဘဲ Calculator ကို ပိတ်ရန် Exit Fee လိုအပ်ပါသည်။" onClose={onStay} showClose={false} compact>
      <div className="exit-icon" aria-hidden="true"><LogOut /></div>
      <span className="fee-label">PREMIUM EXIT FEE</span>
      <div className="modal-price exit-price"><strong>၄၉,၉၀၀</strong><span>ကျပ်</span></div>
      <Button className="flow-primary" onClick={onPay}>ပေးပြီး ထွက်မယ် <span>→</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onStay}>အဖြေမသိဘဲ ဒီမှာပဲ ဆက်နေမယ်</Button>
    </FlowDialog>
  );
}
