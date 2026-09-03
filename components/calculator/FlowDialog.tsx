'use client';

import type {ReactNode} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type FlowDialogProps = {
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
  showClose?: boolean;
};

export function FlowDialog({
  label,
  title,
  description,
  children,
  onClose,
  compact = false,
  showClose = true,
}: FlowDialogProps) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open && showClose) onClose(); }}>
      <DialogContent className={`flow-dialog ${compact ? 'flow-dialog-compact' : ''}`} showCloseButton={showClose}>
        <div className="modal-kicker">{label}</div>
        <DialogHeader className="flow-dialog-header">
          <DialogTitle className="flow-dialog-title">{title}</DialogTitle>
          {description ? <DialogDescription className="flow-dialog-description">{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
