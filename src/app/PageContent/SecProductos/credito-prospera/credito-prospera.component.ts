import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SimuladorService } from '../../../core/services/simulador.service';
import {
  SimulacionForm, SimulacionResultado, PrepagSimulacion,
  ConyugeForm, FiadorForm, BeneficiarioForm, SeguroConfig,
  SolicitudCredito, EvaluacionAsesor, PersonaForm,
  CANAL_PAGO_COSTOS, EstadoSolicitud
} from '../../../core/models/credito-prospera.model';

@Component({
  selector: 'app-credito-prospera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credito-prospera.component.html',
  styleUrl: './credito-prospera.component.css'
})
export class CreditoProsperaComponent implements OnInit {
  private auth = inject(AuthService);
  private simuladorSvc = inject(SimuladorService);

  // ── Auth ──────────────────────────────────────────────
  user = this.auth.user;
  isAsesor = computed(() => this.auth.isAsesor);

  // ── Stepper ───────────────────────────────────────────
  pasoActual = signal(1);
  readonly PASOS_CLIENTE = 6;

  pasos = [
    { num: 1, label: 'Simulación' },
    { num: 2, label: 'Datos y Cónyuge' },
    { num: 3, label: 'Fiadores' },
    { num: 4, label: 'Seguros y Beneficiarios' },
    { num: 5, label: 'Anexos y Firma' },
    { num: 6, label: 'Confirmación' }
  ];

  // ── Paso 1: Simulación ────────────────────────────────
  simForm: SimulacionForm = {
    moneda: 'PEN',
    monto: null,
    cuotas: null,
    destino: 'capital_trabajo',
    canalPago: 'kasnet',
    envioEstado: 'email'
  };

  simResultado = signal<SimulacionResultado | null>(null);

  prepago: PrepagSimulacion = {
    montoAdicional: null,
    opcion: 'reducir_cuota'
  };
  prepagResultado = signal<PrepagSimulacion | null>(null);
  mostrarPrepago = false;

  readonly canalCostos = CANAL_PAGO_COSTOS;

  // ── Paso 2: Titular y Cónyuge ─────────────────────────
  titular: PersonaForm = { nombres: '', apellidos: '', dni: '', telefono: '', email: '' };
  tieneConyuge = false;
  conyuge: ConyugeForm = {
    nombres: '', apellidos: '', dni: '', telefono: '', email: '',
    regimen: 'gananciales', aceptaResponsabilidad: false
  };

  // ── Paso 3: Fiadores ──────────────────────────────────
  fiadores: FiadorForm[] = [
    { nombres: '', apellidos: '', dni: '', telefono: '', email: '', relacion: '' }
  ];
  mostrarFiador2 = false;

  // ── Paso 4: Seguros ───────────────────────────────────
  seguros: SeguroConfig = {
    desgravamenPorcentual: true,
    desgravamenDevolucion: false,
    endosoExterno: false,
    multirriesgo: false,
    superSegurPlus: false
  };
  beneficiarios: BeneficiarioForm[] = [
    { nombres: '', apellidos: '', parentesco: '', porcentaje: 100 }
  ];

  // ── Paso 5: Firma ─────────────────────────────────────
  aceptaTerminos = false;
  aceptaPagare = false;
  codigoSms = '';
  firmaValidada = false;

  // ── Paso 6: Confirmación ──────────────────────────────
  solicitudEnviada = false;

  // ── Vista Asesor ──────────────────────────────────────
  solicitudesPendientes: SolicitudCredito[] = [];
  evaluacion: EvaluacionAsesor = {
    deudaActual: null,
    teaNegociada: null,
    clasificacion: undefined,
    refinanciamiento: false,
    refinanciamientoAprobado: false,
    desembolsoAutorizado: false
  };
  clasificacionResultado = signal<string>('');

  ngOnInit(): void {
    // Si no hay usuario, asignar rol cliente por defecto (demo)
    if (!this.auth.user()) {
      this.auth.setRole('cliente');
    }
  }

  // ── Rol ───────────────────────────────────────────────
  cambiarRol(rol: 'cliente' | 'asesor'): void {
    this.auth.setRole(rol);
  }

  // ── Simulación ────────────────────────────────────────
  simular(): void {
    const res = this.simuladorSvc.calcularCuota(this.simForm);
    this.simResultado.set(res);
  }

  simularPrepago(): void {
    const res = this.simResultado();
    if (!res) return;
    const resultado = this.simuladorSvc.simularPrepago(res, this.simForm, this.prepago);
    this.prepagResultado.set(resultado);
  }

  get costoCanal(): number {
    return this.canalCostos[this.simForm.canalPago];
  }

  get costoEstado(): number {
    return this.simForm.envioEstado === 'fisico' ? 10 : 0;
  }

  // ── Fiadores ──────────────────────────────────────────
  agregarFiador2(): void {
    this.mostrarFiador2 = true;
    if (this.fiadores.length < 2) {
      this.fiadores.push({ nombres: '', apellidos: '', dni: '', telefono: '', email: '', relacion: '' });
    }
  }

  // ── Beneficiarios ─────────────────────────────────────
  agregarBeneficiario(): void {
    this.beneficiarios.push({ nombres: '', apellidos: '', parentesco: '', porcentaje: 0 });
  }

  removeBeneficiario(i: number): void {
    this.beneficiarios.splice(i, 1);
  }

  // ── Firma ─────────────────────────────────────────────
  validarFirma(): void {
    if (this.codigoSms.length >= 4) {
      this.firmaValidada = true;
    }
  }

  // ── Navegación ────────────────────────────────────────
  siguiente(): void {
    if (this.pasoActual() < this.PASOS_CLIENTE) {
      this.pasoActual.update(p => p + 1);
    }
  }

  anterior(): void {
    if (this.pasoActual() > 1) {
      this.pasoActual.update(p => p - 1);
    }
  }

  irAPaso(n: number): void {
    if (n <= this.pasoActual()) this.pasoActual.set(n);
  }

  confirmar(): void {
    this.solicitudEnviada = true;
    this.pasoActual.set(6);
  }

  nuevaSimulacion(): void {
    this.pasoActual.set(1);
    this.solicitudEnviada = false;
    this.simResultado.set(null);
    this.firmaValidada = false;
  }

  // ── Asesor: Evaluación ────────────────────────────────
  clasificar(): void {
    if (!this.evaluacion.deudaActual) return;
    const c = this.simuladorSvc.clasificarEmpresa(this.evaluacion.deudaActual);
    this.evaluacion.clasificacion = c;
    const labels = { micro: 'Microempresa', pequena: 'Pequeña Empresa', mediana: 'Mediana Empresa' };
    this.clasificacionResultado.set(labels[c]);
  }

  agregarSolicitudDemo(): void {
    const demo: SolicitudCredito = {
      id: `SOL-${Date.now()}`,
      cliente: { nombres: 'María', apellidos: 'García López', dni: '12345678', telefono: '999888777', email: 'maria@email.com' },
      simulacion: { ...this.simForm, monto: 5000, cuotas: 12 },
      fiadores: [],
      seguros: { ...this.seguros },
      beneficiarios: [],
      aceptaTerminos: true,
      aceptaPagare: true,
      estado: 'pendiente',
      fechaCreacion: new Date()
    };
    this.solicitudesPendientes.push(demo);
  }

  getEstadoBadge(estado: EstadoSolicitud): string {
    const map: Record<EstadoSolicitud, string> = {
      pendiente: 'warning',
      en_evaluacion: 'info',
      aprobado: 'success',
      rechazado: 'danger',
      desembolsado: 'primary'
    };
    return map[estado];
  }

  getEstadoLabel(estado: EstadoSolicitud): string {
    const map: Record<EstadoSolicitud, string> = {
      pendiente: 'Pendiente',
      en_evaluacion: 'En Evaluación',
      aprobado: 'Aprobado',
      rechazado: 'Rechazado',
      desembolsado: 'Desembolsado'
    };
    return map[estado];
  }

  aprobarRefinanciamiento(): void {
    this.evaluacion.refinanciamientoAprobado = true;
  }

  autorizarDesembolso(): void {
    this.evaluacion.desembolsoAutorizado = true;
  }
}
