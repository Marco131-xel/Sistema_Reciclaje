function InicioCiu () {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
        <div style={{ padding: "20px" }}>
        <h1>VISTA CIUDADANO</h1>
        <p>Estas autenticado</p>
        <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
    )
}

export default InicioCiu;