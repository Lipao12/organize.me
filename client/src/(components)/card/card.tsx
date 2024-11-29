type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-center text-3xl">{children}</h2>
);

export const CardDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="text-zinc-500 font-semibold text-base">{children}</div>;

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  className = "text-center ",
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({
  className = "",
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
