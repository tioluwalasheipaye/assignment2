function App() {
  const { useState } = React;

  // Bumped after a successful registration so StudentList re-fetches.
  const [refresh, setRefresh] = useState(0);

  // Admin mode: lets you view each part of the app on its own for testing.
  // The student list is intentionally NOT part of the public page.
  const [adminMode, setAdminMode] = useState(false);
  const [view, setView] = useState("form");

  function handleRegistered() {
    setRefresh(function (previous) { return previous + 1; });
  }

  const views = [
    { key: "form", label: "Registration Form" },
    { key: "list", label: "Student List" },
    { key: "both", label: "Both" }
  ];

  const showForm = !adminMode || view === "form" || view === "both";
  const showList = adminMode && (view === "list" || view === "both");

  return (
    <div className="app">
      <button
        className="admin-toggle"
        onClick={function () { setAdminMode(!adminMode); }}
      >
        {adminMode ? "Exit Admin" : "Admin"}
      </button>

      {adminMode && (
        <div className="admin-panel">
          <span className="admin-title">Admin / Test Mode</span>

          <div className="admin-buttons">
            {views.map(function (item) {
              return (
                <button
                  key={item.key}
                  className={view === item.key ? "admin-btn active" : "admin-btn"}
                  onClick={function () { setView(item.key); }}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              className="admin-btn"
              onClick={function () { setRefresh(refresh + 1); }}
            >
              Reload List
            </button>
          </div>

          <div className="admin-links">
            <a href="students.php" target="_blank" rel="noreferrer">students.php</a>
            <a href="register.php" target="_blank" rel="noreferrer">register.php</a>
          </div>
        </div>
      )}

      <Header />

      <main className="content">
        {showForm && <StudentForm onRegistered={handleRegistered} />}
        {showList && <StudentList refresh={refresh} />}
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
