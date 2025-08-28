const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      {children}
    </div>
  );
};

export default PaymentLayout;
