export interface ResiduoPayload {
  user_id: number
  nome: string
  tipo_residuo_id: number
  condicao_id: number
  disponibilidade_id: number
  descricao?: string
  quantidade: number
  localizacao?: string
  valor_unitario: number
  fotos?: string
}
