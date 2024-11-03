export let saldoCuenta = 50000;
export let historialMovimientos = [];
export async function cargarConceptos() {
    try {
        const response = await fetch("js/conceptos.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo de conceptos.");
        const conceptos = await response.json();
        localStorage.setItem("conceptos", JSON.stringify(conceptos));
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}
export function agregarMovimiento(conceptoId, monto) {
    const conceptos = JSON.parse(localStorage.getItem("conceptos"));
    const concepto = conceptos.find(c => c.id === conceptoId);

    if (!concepto) {
        Swal.fire("Error", "Concepto no encontrado.", "error");
        return;
    }

    if (saldoCuenta + monto < 0) {
        Swal.fire("Saldo insuficiente", "No puedes realizar esta operación", "warning");
        return;
    }

    saldoCuenta += monto;
    const movimiento = {
        id: historialMovimientos.length + 1,
        concepto: concepto.concepto,
        monto: monto,
        fecha: new Date().toLocaleString()
    };
    historialMovimientos.push(movimiento);
    actualizarSaldoUI();
    mostrarHistorialUI();
}
export function pagarPedido(totalPedido) {
    agregarMovimiento(1, -totalPedido);
    Swal.fire("Pedido Pagado", `Se ha pagado el pedido de $${totalPedido}`, "success");
}
export function recargarSaldo(monto) {
    agregarMovimiento(5, monto);
    Swal.fire("Saldo Recargado", `Se ha recargado $${monto}`, "success");
}
export function pagarImpuesto(monto) {
    agregarMovimiento(6, -monto);
    Swal.fire("Impuesto Pagado", `Se ha pagado el impuesto de $${monto}`, "success");
}
export function actualizarSaldoUI() {
    document.getElementById("saldo").textContent = `Saldo: $${saldoCuenta.toLocaleString("es-CL")}`;
}
export function mostrarHistorialUI() {
    const historialDiv = document.getElementById("transactionHistory");
    historialDiv.innerHTML = historialMovimientos.map(mov => 
        `<li>${mov.fecha} - ${mov.concepto} - $${mov.monto.toLocaleString("es-CL")}</li>`
    ).join("");
}