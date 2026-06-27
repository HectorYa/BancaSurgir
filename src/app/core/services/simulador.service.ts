import { Injectable } from '@angular/core';
import {
  SimulacionForm,
  SimulacionResultado,
  PrepagSimulacion,
  TMIC
} from '../models/credito-prospera.model';

@Injectable({ providedIn: 'root' })
export class SimuladorService {

  calcularCuota(form: SimulacionForm): SimulacionResultado | null {
    if (!form.monto || !form.cuotas || form.monto <= 0 || form.cuotas <= 0) return null;

    const tmicAnual = TMIC[form.moneda] / 100;
    const tea = tmicAnual;
    const tem = Math.pow(1 + tea, 1 / 12) - 1;
    const n = form.cuotas;
    const pv = form.monto;

    // Fórmula cuota francesa
    const cuota = (pv * tem * Math.pow(1 + tem, n)) / (Math.pow(1 + tem, n) - 1);
    const totalPagar = cuota * n;
    const tcea = tea; // simplificado

    return {
      cuotaMensual: Math.round(cuota * 100) / 100,
      tea: Math.round(tea * 10000) / 100,
      tcea: Math.round(tcea * 10000) / 100,
      totalPagar: Math.round(totalPagar * 100) / 100
    };
  }

  simularPrepago(
    resultado: SimulacionResultado,
    form: SimulacionForm,
    prepago: PrepagSimulacion,
    cuotasPagadas: number = 0
  ): PrepagSimulacion {
    if (!prepago.montoAdicional || !form.monto || !form.cuotas) return prepago;

    const tmicAnual = TMIC[form.moneda] / 100;
    const tem = Math.pow(1 + tmicAnual, 1 / 12) - 1;
    const cuotasRestantes = form.cuotas - cuotasPagadas;
    const saldoActual = form.monto; // simplificado
    const nuevoSaldo = saldoActual - prepago.montoAdicional;

    if (nuevoSaldo <= 0) return prepago;

    if (prepago.opcion === 'reducir_cuota') {
      const nuevaCuota = (nuevoSaldo * tem * Math.pow(1 + tem, cuotasRestantes)) /
        (Math.pow(1 + tem, cuotasRestantes) - 1);
      const ahorro = (resultado.cuotaMensual - nuevaCuota) * cuotasRestantes;
      return {
        ...prepago,
        resultado: {
          nuevaCuota: Math.round(nuevaCuota * 100) / 100,
          ahorro: Math.round(ahorro * 100) / 100
        }
      };
    } else {
      // Reducir plazo
      const n = Math.log(resultado.cuotaMensual / (resultado.cuotaMensual - nuevoSaldo * tem)) /
        Math.log(1 + tem);
      const nuevasCuotas = Math.ceil(n);
      const ahorro = (cuotasRestantes - nuevasCuotas) * resultado.cuotaMensual;
      return {
        ...prepago,
        resultado: {
          nuevasCuotas,
          ahorro: Math.round(ahorro * 100) / 100
        }
      };
    }
  }

  clasificarEmpresa(deuda: number): 'micro' | 'pequena' | 'mediana' {
    if (deuda <= 20000) return 'micro';
    if (deuda <= 300000) return 'pequena';
    return 'mediana';
  }
}
