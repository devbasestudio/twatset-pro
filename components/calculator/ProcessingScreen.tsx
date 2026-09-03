'use client';

import {FlowDialog} from './FlowDialog';

type ProcessingScreenProps = {
  progress: number;
  expression: string;
};

const messages = [
  'Quantum Theory ဖြင့် equation ကို ခွဲခြမ်းစိတ်ဖြာနေပါသည်...',
  'ChatGPT ကို မေးနေပါသည်...',
  'Gemini ကို ထပ်မေးနေပါသည်...',
  'AI နှစ်ခုရဲ့ အဖြေမတူလို့ ပြန်ညှိနေပါသည်...',
  '1,000,000,000 Tokens အသုံးပြုနေပါသည်...',
  'Cloud Supercomputer ၃၂ လုံးကို နိုးနေပါသည်...',
  'Calculator တစ်လုံးနဲ့ နောက်ဆုံးတစ်ခေါက် ထပ်စစ်နေပါသည်...',
  'အဖြေထွက်တော့မယ်...',
];

export function ProcessingScreen({progress, expression}: ProcessingScreenProps) {
  const safeProgress = Math.min(progress, messages.length - 1);
  const percentage = ((safeProgress + 1) / messages.length) * 100;

  return (
    <FlowDialog
      label="ADVANCED MATHEMATICS RESEARCH"
      title={messages[safeProgress]}
      description={safeProgress === messages.length - 1 ? `${expression || 'သင့်တွက်ချက်မှု'} အတွက် နောက်ဆုံးရလဒ်ကို ပြင်ဆင်နေပါသည်။` : undefined}
      onClose={() => undefined}
      showClose={false}
      compact
    >
      <div className="processing-orbit" aria-hidden="true"><span /><i /></div>
      <div className="progress-meta">
        <span>{safeProgress < 4 ? 'AI + QUANTUM PIPELINE' : 'RESULT GENERATION'}</span>
        <strong>{safeProgress + 1}/{messages.length}</strong>
      </div>
      <div className="progress-track"><i style={{width: `${percentage}%`}} /></div>
      <p className="processing-copy">
        {safeProgress < messages.length - 1
          ? 'သာမန် calculator ဖြင့်လည်း ရနိုင်သော်လည်း ကျွန်ုပ်တို့က ခက်ခက်ခဲခဲတွက်ရန် ရွေးချယ်ထားပါသည်။'
          : 'ရလဒ်ကို ယခု ဖော်ပြတော့မည်... ခဏလေးပါ။'}
      </p>
    </FlowDialog>
  );
}
