export type UserRole = 'cliente' | 'asesor';
export type Moneda = 'PEN' | 'USD';
export type Destino = 'capital_trabajo' | 'activo_fijo';
export type CanalPago = 'yape' | 'bcp' | 'interbank' | 'banbif' | 'kasnet' | 'oficina';
export type EnvioEstado = 'email' | 'fisico';
export type OpcionPrepago = 'reducir_cuota' | 'reducir_plazo';
export type EstadoSolicitud = 'pendiente' | 'en_evaluacion' | 'aprobado' | 'rechazado' | 'desembolsado';

export interface SimulacionForm {
  moneda: Moneda;
  monto: number | null;
  cuotas: number | null;
  destino: Destino;
  canalPago: CanalPago;
  envioEstado: EnvioEstado;
}

export interface SimulacionResultado {
  cuotaMensual: number;
  tea: number;
  tcea: number;
  totalPagar: number;
  gastosVehiculares?: number;
}

export interface PrepagSimulacion {
  montoAdicional: number | null;
  opcion: OpcionPrepago;
  resultado?: {
    nuevaCuota?: number;
    nuevasCuotas?: number;
    ahorro: number;
  };
}

export interface PersonaForm {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
}

export interface ConyugeForm extends PersonaForm {
  regimen: 'gananciales' | 'separacion';
  aceptaResponsabilidad: boolean;
}

export interface FiadorForm extends PersonaForm {
  relacion: string;
}

export interface BeneficiarioForm {
  nombres: string;
  apellidos: string;
  parentesco: string;
  porcentaje: number;
}

export interface SeguroConfig {
  desgravamenPorcentual: boolean;
  desgravamenDevolucion: boolean;
  endosoExterno: boolean;
  multirriesgo: boolean;
  superSegurPlus: boolean;
}

export interface SolicitudCredito {
  id?: string;
  cliente: PersonaForm;
  conyuge?: ConyugeForm;
  fiadores: FiadorForm[];
  simulacion: SimulacionForm;
  resultado?: SimulacionResultado;
  seguros: SeguroConfig;
  beneficiarios: BeneficiarioForm[];
  aceptaTerminos: boolean;
  aceptaPagare: boolean;
  firmaSms?: string;
  estado: EstadoSolicitud;
  fechaCreacion?: Date;
}

// Vista Asesor
export interface EvaluacionAsesor {
  deudaActual: number | null;
  teaNegociada: number | null;
  clasificacion?: 'micro' | 'pequena' | 'mediana';
  refinanciamiento: boolean;
  refinanciamientoAprobado: boolean;
  desembolsoAutorizado: boolean;
}

export const CANAL_PAGO_COSTOS: Record<CanalPago, number> = {
  yape: 2.90,
  bcp: 3.00,
  interbank: 4.00,
  banbif: 5.00,
  kasnet: 0,
  oficina: 0
};

export const TMIC: Record<Moneda, number> = {
  PEN: 114.13,
  USD: 99.84
};
