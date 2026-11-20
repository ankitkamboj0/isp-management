function Header({ name }: { name?: string }) {
  return (
    <header className="header">
      <div className="header-left">
        <h2>{name}</h2>
      </div>
    </header>
  );
}

export default Header;
