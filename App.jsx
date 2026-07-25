function App() {
  const { useState } = React;

  const [page, setPage] = useState("register");
  const [refresh, setRefresh] = useState(0);
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
