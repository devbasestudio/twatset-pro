'use client';

import {LogOut} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {FlowDialog} from './FlowDialog';

type ExitFeeModalProps = {
  attempts: number;
  onPay: () => void;
  onStay: () => void;
};

export function ExitFeeModal({attempts, onPay, onStay}: ExitFeeModalProps) {
  return (
    <FlowDialog label="RESULT WINDOW EXIT REQUEST" title="Popup ကို ပိတ်တော့မှာလား?" description="အဖြေမသိဘဲ ဒီ Popup ကို ပိတ်ရန် Exit Fee ထပ်မံပေးရပါမည်။" onClose={onStay} showClose={false} compact>
      <div className="exit-icon" aria-hidden="true"><LogOut /></div>
      <span className="fee-label">PREMIUM EXIT FEE</span>
      <div className="modal-price exit-price"><strong>၉၉,၀၀၀</strong><span>ကျပ်</span></div>
      <Button className="flow-primary" onClick={onPay}>၉၉,၀၀၀ ကျပ်ပေးပြီး ပိတ်မယ် <span>→</span></Button>
      <Button className="flow-secondary" variant="ghost" onClick={onStay}>မပိတ်ဘဲ ဒီမှာပဲ ဆက်နေမယ်</Button>
      {attempts > 0 ? (
        <output className="fine-print" aria-live="polite">
          ပိတ်ခွင့်အတည်ပြုမရသေးပါ။ ထပ်ရွေးပါ။ ({attempts})
        </output>
      ) : null}
    </FlowDialog>
  );
}
