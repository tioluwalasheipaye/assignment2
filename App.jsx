function App() {
  const { useState } = React;

  // Page 1 = Student Registration, Page 2 = Student Directory.
  const [page, setPage] = useState("register");

  // Bumped after a successful registration so StudentList re-fetches.
  const [refresh, setRefresh] = useState(0);

  // Dev-only admin flag (see dev-temp.jsx); stays false in the delivered app.
  const [admin, setAdmin] = useState(false);

  function handleNavigate(nextPage) {
    setPage(nextPage);
  }

  function handleRegistered() {
    setRefresh(function (previous) { return previous + 1; });
  }

  const showForm = page === "register" || page === "both";
  const showList = page === "directory" || page === "both";

  return (
    <div className="app">
      {typeof AdminTools !== "undefined" && (
        <AdminTools
          page={page}
          onNavigate={handleNavigate}
          onReload={handleRegistered}
          onAdminChange={setAdmin}
        />
      )}

      <Header page={page} onNavigate={handleNavigate} admin={admin} />

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
