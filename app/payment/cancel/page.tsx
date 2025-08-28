import Link from "next/link";
import { XIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const PaymentCanceled = () => {
  return (
    <Card className="w-full max-w-90">
      <div className="p-6">
        <div className="w-full flex justify-center">
          <XIcon
            size={48}
            className="p-2 bg-red-500/30 text-red-500 rounded-full"
          />
        </div>
        <div className="mt-3 sm:mt-5 w-full text-center">
          <h2 className="text-xl font-semibold">Payment Canceled</h2>
          <p className="mt-2 text-sm text-muted-foreground tracking-tight text-balance">
            No worries! You haven’t been charged. Feel free to try again
            anytime.
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
              "mt-5 w-full"
            )}
          >
            Go back to Homepage
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCanceled;
