function Header(props) {
  return (
    <header className="header">
      <div className="masthead">
        <div className="brand">
          <span className="brand-sub">Student Information System</span>
        </div>
      </div>

      <nav className="tabs">
        <span
          className={props.page === "register" ? "tab active" : "tab"}
          onClick={function () { props.onNavigate("register"); }}
        >
          Student Registration
        </span>

        {/* The directory is staff-only, so the tab shows in admin mode only. */}
        {props.admin && (
          <span
            className={props.page === "directory" ? "tab active" : "tab"}
            onClick={function () { props.onNavigate("directory"); }}
          >
            Student Directory
          </span>
        )}
      </nav>
    </header>
  );
}
