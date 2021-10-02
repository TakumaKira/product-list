const SearchBox = ({ value, onChange }: { value: string, onChange: Function }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="Search by products name..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;