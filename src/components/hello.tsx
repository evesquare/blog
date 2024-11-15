type Props = {
  children: React.ReactNode;
};

export const Hello: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div>
        hello
        {children}
      </div>
    </>
  );
};
