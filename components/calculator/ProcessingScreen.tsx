'use client';

import {FlowDialog} from './FlowDialog';

type ProcessingScreenProps = {
  progress: number;
  expression: string;
};

const messages = [
  'တွက်ချက်မှုကို သိမ်းဆည်းနေပါသည်...',
  'အဖြေဖော်ပြခွင့်ကို စစ်ဆေးနေပါသည်...',
  'Premium Mathematics Server နှင့် ချိတ်ဆက်နေပါသည်...',
];

export function ProcessingScreen({progress, expression}: ProcessingScreenProps) {
  const message = progress === 3 ? `${expression || 'သင့်တွက်ချက်မှု'} ကို ထပ်မံအတည်ပြုနေပါသည်...` : messages[progress];
  return (
    <FlowDialog label="SECURE PROCESSING" title={message} onClose={() => undefined} showClose={false} compact>
      <div className="processing-orbit" aria-hidden="true"><span /><i /></div>
      <div className="progress-meta"><span>MATHEMATICS SERVER</span><strong>{progress + 1}/4</strong></div>
      <div className="progress-track"><i style={{width: `${(progress + 1) * 25}%`}} /></div>
      <p className="processing-copy">အဖြေနှင့် ငွေကြေးနှစ်ခုစလုံး လုံခြုံစေရန် ကျေးဇူးပြု၍ စောင့်ပါ။</p>
    </FlowDialog>
  );
}
