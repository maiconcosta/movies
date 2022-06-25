import { FC } from 'react';
import './styles.scss';

type LabelProps = {
  children: React.ReactNode;
};

export const Label: FC<LabelProps> = ({ children }) => {
  return <div className="label">{children}</div>;
};
