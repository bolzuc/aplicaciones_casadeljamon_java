import { cargarConceptos, agregarMovimiento, pagarPedido, recargarSaldo, pagarImpuesto, actualizarSaldoUI, mostrarHistorialUI } from './banking.js';
import { addFunds, removeFunds, simulatePurchase } from './transacciones.js';
document.addEventListener('DOMContentLoaded', () => {
    cargarConceptos();
    actualizarSaldoUI();
    mostrarHistorialUI();
    document.getElementById('addFundsBtn').addEventListener('click', addFunds);
    document.getElementById('removeFundsBtn').addEventListener('click', removeFunds);
    document.getElementById('buyTortillaBtn').addEventListener('click', () => simulatePurchase('Tortilla Española', 5000));
    document.getElementById('buyPaellaBtn').addEventListener('click', () => simulatePurchase('Paella', 10000));
    document.getElementById('buyGambasBtn').addEventListener('click', () => simulatePurchase('Gambas al Ajillo', 8000));
    document.getElementById('buyCroquetasBtn').addEventListener('click', () => simulatePurchase('Croquetas', 6000));
    document.getElementById('buyFabadaBtn').addEventListener('click', () => simulatePurchase('Fabada', 7000));
    document.getElementById('buyGazpachoBtn').addEventListener('click', () => simulatePurchase('Gazpacho', 4000));
    document.getElementById('buyPulpoBtn').addEventListener('click', () => simulatePurchase('Pulpo al Olivo', 9000));
});