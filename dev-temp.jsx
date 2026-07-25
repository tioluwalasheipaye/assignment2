function AdminTools(props) {
  const [open, setOpen] = React.useState(false);

  function toggle() {
    if (open && props.page !== "register") {
      props.onNavigate("register");
    }
    setOpen(!open);
    props.onAdminChange(!open);
  }

  function pageButton(key, label) {
    return (
      <button
        className={props.page === key ? "admin-btn active" : "admin-btn"}
        onClick={function () { props.onNavigate(key); }}
      >
        {label}
      </button>
    );
  }

  return (
    <div>
      <button className="admin-toggle" onClick={toggle}>
        {open ? "Exit Admin" : "Admin"}
      </button>

      {open && (
        <div className="admin-panel">
          <span className="admin-title">Admin / Test Mode</span>

          <div className="admin-buttons">
            {pageButton("register", "Page 1: Registration")}
            {pageButton("directory", "Page 2: Directory")}
            {pageButton("both", "Both (side by side)")}
            <button className="admin-btn" onClick={props.onReload}>
              Reload Directory
            </button>
          </div>

          <div className="admin-links">
            <a href="students.php" target="_blank" rel="noreferrer">students.php</a>
            <a href="register.php" target="_blank" rel="noreferrer">register.php</a>
          </div>
        </div>
      )}
    </div>
  );
}

(function () {
  const css = [
    ".admin-toggle { position: fixed; top: 8px; right: 8px; padding: 3px 9px;",
    "  font-size: 10px; color: #ffd100; background-color: rgba(255,255,255,0.12);",
    "  border: 1px solid #ffd100; cursor: pointer; z-index: 20; }",
    ".admin-toggle:hover { background-color: #ffd100; color: #000000; }",
    ".admin-panel { position: fixed; top: 34px; right: 8px; width: 180px;",
    "  background-color: #ffffff; border: 1px solid #9aa4ad; padding: 8px;",
    "  box-shadow: 1px 2px 6px rgba(0,0,0,0.3); z-index: 20; }",
    ".admin-title { display: block; font-size: 10px; font-weight: bold;",
    "  color: #16548a; margin-bottom: 7px; }",
    ".admin-buttons { display: flex; flex-direction: column; gap: 4px; }",
    ".admin-btn { width: 100%; padding: 4px; font-size: 10px; color: #ffffff;",
    "  background-color: #5c7891; border: 1px solid #46596b; cursor: pointer; }",
    ".admin-btn:hover { background-color: #16548a; }",
    ".admin-btn.active { background-color: #16548a; font-weight: bold; }",
    ".admin-links { display: flex; flex-direction: column; margin-top: 7px;",
    "  font-size: 10px; }",
    ".admin-links a { padding: 2px 0; }",
    "@media (max-width: 700px) { .admin-panel { width: 150px; } }"
  ].join("\n");

  const tag = document.createElement("style");
  tag.textContent = css;
  document.head.appendChild(tag);
})();
