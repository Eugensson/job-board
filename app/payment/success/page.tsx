import Link from "next/link";
import { Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const PaymentSuccess = () => {
  return (
    <Card className="w-full max-w-90">
      <div className="p-6">
        <div className="w-full flex justify-center">
          <Check
            size={48}
            className="p-2 bg-green-500/30 text-green-500 rounded-full"
          />
        </div>
        <div className="mt-3 sm:mt-5 w-full text-center">
          <h2 className="text-xl font-semibold">Payment Successful</h2>
          <p className="mt-2 text-sm text-muted-foreground tracking-tight text-balance">
            Congratulations! Your payment was successful. Your job posting is
            now active!
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

export default PaymentSuccess;
