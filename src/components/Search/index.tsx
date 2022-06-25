import './styles.scss';

type SearchProps = {
  onChange(e: React.FormEvent<HTMLInputElement>): void;
};

export const Search = ({ onChange }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Busque um filme por nome, ano e gênero..."
      onChange={onChange}
    />
  );
};
