import Person from "./components/Person"



function App() {


  return (
 <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          background: "#DEE2E6",
          padding: "100px 24px 24px 24px", 
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "32px 24px 24px 24px", 
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#343a40",
            }}
          >
            Univerus Persons of Interest
          </div>
          {/* <PersonList /> */}
          {/* <PersonsPage /> */}
          <Person />
        </div>
      </div>
    </>
  )
}

export default App
