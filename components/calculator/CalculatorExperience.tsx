'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {Calculator, Delete, ShieldCheck} from 'lucide-react';
import {ExitFeeModal} from './ExitFeeModal';
import {ProcessingScreen} from './ProcessingScreen';
import {ResultPaywall} from './ResultPaywall';
import type {Operator} from './types';

const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
const PROCESSING_STEPS = 8;

const calculate = (left: number, right: number, operator: Operator) => {
  if (operator === '+') return left + right;
  if (operator === '−') return left - right;
  if (operator === '×') return left * right;
  return left / right;
};

type ExperienceStep = 'processing' | 'paywall' | 'exitFee' | null;

export function CalculatorExperience() {
  const [display, setDisplay] = useState('0');
  const [leftValue, setLeftValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [awaitingValue, setAwaitingValue] = useState(false);
  const [expression, setExpression] = useState('');
  const [step, setStep] = useState<ExperienceStep>(null);
  const [progress, setProgress] = useState(0);
  const [exitPaymentAttempts, setExitPaymentAttempts] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const acCount = useRef(0);
  const hiddenResult = useRef<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const startRidiculousProcessing = useCallback(() => {
    clearTimers();
    setProgress(0);
    setStep('processing');

    const stepDuration = 1600;
    const nextTimers: ReturnType<typeof setTimeout>[] = [];

    for (let index = 1; index < PROCESSING_STEPS; index += 1) {
      nextTimers.push(setTimeout(() => setProgress(index), index * stepDuration));
    }

    nextTimers.push(
      setTimeout(() => setStep('paywall'), PROCESSING_STEPS * stepDuration + 700),
    );

    timers.current = nextTimers;
  }, [clearTimers]);

  const inputDigit = (digit: string) => {
    acCount.current = 0;
    if (display === 'အဖြေ: ██' || awaitingValue) {
      setDisplay(digit);
      setAwaitingValue(false);
      return;
    }
    const plainLength = display.replace(/[.,-]/g, '').length;
    if (plainLength >= 12) {
      showToast('ဒီလောက်ကြီးတဲ့ နံပါတ်တွေတွက်ဖို့ Enterprise Plan ကို ဆက်သွယ်ပါ။');
      return;
    }
    setDisplay(display === '0' || display === 'Undefined' ? digit : `${display}${digit}`);
  };

  const inputDecimal = () => {
    acCount.current = 0;
    if (display === 'အဖြေ: ██' || display === 'Undefined' || awaitingValue) {
      setDisplay('0.');
      setAwaitingValue(false);
    } else if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const chooseOperator = (nextOperator: Operator) => {
    acCount.current = 0;
    const current = Number(display);
    if (!Number.isFinite(current)) return;
    setLeftValue(current);
    setOperator(nextOperator);
    setExpression(`${display} ${nextOperator}`);
    setAwaitingValue(true);
  };

  const calculateWithDrama = () => {
    if (leftValue === null || operator === null || awaitingValue) return;
    const rightValue = Number(display);
    if (!Number.isFinite(rightValue)) return;

    if (operator === '÷' && rightValue === 0) {
      setDisplay('Undefined');
      setLeftValue(null);
      setOperator(null);
      setExpression('');
      showToast('ဒီအဖြေက ကျွန်တော်တို့နဲ့ မဆိုင်တော့ပါဘူး။ အဆင့်မြင့် သင်္ချာပညာရှင်တစ်ဦးနှင့် ဆက်သွယ်ပါ။');
      return;
    }

    hiddenResult.current = calculate(leftValue, rightValue, operator);
    setExpression(`${leftValue} ${operator} ${display}`);
    setDisplay('အဖြေ: ██');
    startRidiculousProcessing();
  };

  const clearCalculator = () => {
    acCount.current += 1;
    clearTimers();
    setStep(null);
    setDisplay('0');
    setLeftValue(null);
    setOperator(null);
    setAwaitingValue(false);
    setExpression('');
    hiddenResult.current = null;
    if (acCount.current >= 3) {
      acCount.current = 0;
      showToast('မကြာခဏ စိတ်ပြောင်းလဲခြင်းကို Pro Plan တွင် အကြံပြုထားပါသည်။');
    }
  };

  const deleteDigit = () => {
    acCount.current = 0;
    if (display === 'အဖြေ: ██' || display === 'Undefined') setDisplay('0');
    else setDisplay(display.length <= 1 ? '0' : display.slice(0, -1));
  };

  const handleFakePayment = () => {
    showToast('Parody Demo ဖြစ်တဲ့အတွက် တကယ် ငွေမဖြတ်ပါဘူး။ အဖြေကတော့ ၄ သိန်းတန်နေတုန်းပါပဲ။');
  };

  const requestPaywallClose = () => {
    setExitPaymentAttempts(0);
    setStep('exitFee');
  };

  const handleExitPayment = () => {
    setExitPaymentAttempts((attempts) => attempts + 1);
  };

  useEffect(() => {
    document.body.style.overflow = step ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [step]);

  useEffect(() => () => {
    clearTimers();
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, [clearTimers]);

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#calculator" aria-label="တွက်စက် Pro မူလစာမျက်နှာ">
          <span className="brand-mark"><Calculator aria-hidden="true" /></span>
          <span>တွက်စက် <strong>Pro</strong></span>
        </a>
        <span className="security-status"><i /> Mathematics server online</span>
      </header>

      <section className="calculator-stage" id="calculator">
        <div className="product-copy">
          <span className="eyebrow">PREMIUM MATHEMATICS</span>
          <h1><span>တွက်တာအခမဲ့ပါ။</span><span>သိချင်တာကတော့ မတူပါဘူး။</span></h1>
        </div>

        <div className="calculator-card" aria-label="တွက်စက်">
          <div className="calculator-topline">
            <span>{operator && leftValue !== null ? `${leftValue} ${operator}` : 'STANDARD PLAN'}</span>
            <span className="secure-label"><ShieldCheck aria-hidden="true" /> SECURE</span>
          </div>
          <output className={`calculator-display ${display.includes('██') ? 'display-locked' : ''}`} aria-live="polite">{display}</output>
          <div className="calculator-keys">
            <button className="calculator-key key-action key-ac" type="button" onClick={clearCalculator}>AC</button>
            <button className="calculator-key key-action" type="button" aria-label="နောက်ဆုံးဂဏန်းဖျက်မယ်" onClick={deleteDigit}><Delete aria-hidden="true" /></button>
            <button className={`calculator-key key-operator ${operator === '÷' ? 'key-active' : ''}`} type="button" onClick={() => chooseOperator('÷')}>÷</button>
            {DIGITS.slice(0, 3).map((digit) => <button className="calculator-key" type="button" key={digit} onClick={() => inputDigit(digit)}>{digit}</button>)}
            <button className={`calculator-key key-operator ${operator === '×' ? 'key-active' : ''}`} type="button" onClick={() => chooseOperator('×')}>×</button>
            {DIGITS.slice(3, 6).map((digit) => <button className="calculator-key" type="button" key={digit} onClick={() => inputDigit(digit)}>{digit}</button>)}
            <button className={`calculator-key key-operator ${operator === '−' ? 'key-active' : ''}`} type="button" onClick={() => chooseOperator('−')}>−</button>
            {DIGITS.slice(6, 9).map((digit) => <button className="calculator-key" type="button" key={digit} onClick={() => inputDigit(digit)}>{digit}</button>)}
            <button className={`calculator-key key-operator ${operator === '+' ? 'key-active' : ''}`} type="button" onClick={() => chooseOperator('+')}>+</button>
            <button className="calculator-key key-zero" type="button" onClick={() => inputDigit('0')}>0</button>
            <button className="calculator-key" type="button" onClick={inputDecimal}>.</button>
            <button className="calculator-key key-equals" type="button" onClick={calculateWithDrama}>=</button>
          </div>
        </div>
      </section>

      <footer>Parody Demo — အမှန်တကယ် ငွေပေးချေမှု မပြုလုပ်ပါ။</footer>

      {toast ? <output className="calculator-toast">{toast}</output> : null}
      {step === 'processing' ? <ProcessingScreen progress={progress} expression={expression} /> : null}
      {step === 'paywall' ? <ResultPaywall onClose={requestPaywallClose} onUnlock={handleFakePayment} /> : null}
      {step === 'exitFee' ? (
        <ExitFeeModal
          attempts={exitPaymentAttempts}
          onPay={handleExitPayment}
          onStay={() => setStep('paywall')}
        />
      ) : null}
    </main>
  );
}
