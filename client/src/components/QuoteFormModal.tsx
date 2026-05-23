import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import QuoteFormContent from "@/components/QuoteFormContent";

interface QuoteFormModalProps {
  onClose: () => void;
}

export default function QuoteFormModal({ onClose }: QuoteFormModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Get Your Free Life Insurance Quote</DialogTitle>
          <DialogDescription>
            Compare coverage from multiple carriers. No pressure. No obligation.
          </DialogDescription>
        </DialogHeader>
        <QuoteFormContent autoCloseDelayMs={3000} onCompleted={onClose} showHeading={false} compact />
      </DialogContent>
    </Dialog>
  );
}
