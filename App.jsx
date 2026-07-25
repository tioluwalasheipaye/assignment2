function App() {
  const { useState } = React;

  // Bumped after a successful registration so StudentList re-fetches.
  const [refresh, setRefresh] = useState(0);

  function handleRegistered() {
    setRefresh(function (previous) { return previous + 1; });
  }

  return (
    <div className="app">
      <Header />
      <main className="content">
        <StudentForm onRegistered={handleRegistered} />
        <StudentList refresh={refresh} />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
