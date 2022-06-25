import './styles.scss';

type ScoreProps = {
  children: React.ReactNode;
  className?: string;
};

export const Score = ({ children, className = 'score' }: ScoreProps) => {
  return (
    <div className={className}>
      <p>{children}</p>
    </div>
  );
};
