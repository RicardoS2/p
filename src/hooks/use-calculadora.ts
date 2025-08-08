"use client"

import { useState, useCallback } from "react"

interface DespesaExtra {
  id: string
  descricao: string
  valor: number
}

interface FormData {
  qtdCasal: number
  qtdSolteiro: number
  qtdCobertores: number
  valorCobertor: number
  valorCobradoCobertor: number
  inclusoCobertor: boolean
  transporte: number
  qtdPessoas: number
  valorPessoa: number
  autoPeople: number
  despesasExtras: DespesaExtra[]
}

interface Resultados {
  totalReceita: number
  totalDespesas: number
  lucroBruto: number
  minhaParte: number
  parteLavanderia: number
  totalPecas: number
  custoPecas: number
  totalCobertorPago: number
  totalCobertorRecebido: number
  despesasExtrasTotal: number
  receitaPessoas: number
}

export const useCalculadora = () => {
  const [formData, setFormData] = useState<FormData>({
    qtdCasal: 0,
    qtdSolteiro: 0,
    qtdCobertores: 0,
    valorCobertor: 7,
    valorCobradoCobertor: 15,
    inclusoCobertor: false,
    transporte: 30,
    qtdPessoas: 0,
    valorPessoa: 50,
    autoPeople: 0,
    despesasExtras: []
  })

  const [resultados, setResultados] = useState<Resultados | null>(null)

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Atualizar automaticamente o número de pessoas quando mudar os kits
      if (field === 'qtdCasal' || field === 'qtdSolteiro') {
        const autoPeople = (newData.qtdCasal * 2) + newData.qtdSolteiro
        return { ...newData, qtdPessoas: autoPeople, autoPeople }
      }
      
      // Se o usuário alterar manualmente o número de pessoas, não atualizar mais automaticamente
      if (field === 'qtdPessoas') {
        return { ...newData, autoPeople: -1 } // -1 indica atualização manual
      }
      
      return newData
    })
  }, [])

  const updateKit = useCallback((tipo: 'casal' | 'solteiro', change: number) => {
    const field = tipo === 'casal' ? 'qtdCasal' : 'qtdSolteiro'
    const currentValue = formData[field]
    const newValue = Math.max(0, currentValue + change)
    updateField(field, newValue)
  }, [formData, updateField])

  const adicionarDespesaExtra = useCallback(() => {
    const novaDespesa: DespesaExtra = {
      id: Date.now().toString(),
      descricao: "",
      valor: 0
    }
    setFormData(prev => ({
      ...prev,
      despesasExtras: [...prev.despesasExtras, novaDespesa]
    }))
  }, [])

  const removerDespesaExtra = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      despesasExtras: prev.despesasExtras.filter(despesa => despesa.id !== id)
    }))
  }, [])

  const atualizarDespesaExtra = useCallback((id: string, field: keyof DespesaExtra, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      despesasExtras: prev.despesasExtras.map(despesa =>
        despesa.id === id ? { ...despesa, [field]: value } : despesa
      )
    }))
  }, [])

  const calcular = useCallback(() => {
    const {
      qtdCasal,
      qtdSolteiro,
      qtdCobertores,
      valorCobertor,
      valorCobradoCobertor,
      inclusoCobertor,
      transporte,
      qtdPessoas,
      valorPessoa,
      despesasExtras
    } = formData

    // Cálculos básicos
    const totalCasal = qtdCasal * 6
    const totalSolteiro = qtdSolteiro * 4
    const totalPecas = totalCasal + totalSolteiro
    const custoPecas = totalPecas * 5

    const totalCobertorPago = qtdCobertores * valorCobertor
    const totalCobertorRecebido = inclusoCobertor ? qtdCobertores * valorCobradoCobertor : 0

    const receitaPessoas = qtdPessoas * valorPessoa
    const totalReceita = receitaPessoas + totalCobertorRecebido

    const despesasFixas = custoPecas + totalCobertorPago + transporte
    const despesasExtrasTotal = despesasExtras.reduce((sum, despesa) => sum + despesa.valor, 0)

    const despesasTotais = despesasFixas + despesasExtrasTotal
    const lucroBruto = totalReceita - despesasTotais
    const parteLavanderia = lucroBruto / 2
    const minhaParte = lucroBruto / 2

    const totalDespesas = despesasTotais + parteLavanderia

    setResultados({
      totalReceita,
      totalDespesas,
      lucroBruto,
      minhaParte,
      parteLavanderia,
      totalPecas,
      custoPecas,
      totalCobertorPago,
      totalCobertorRecebido,
      despesasExtrasTotal,
      receitaPessoas
    })
  }, [formData])

  const copiarResultado = useCallback(() => {
    if (!resultados) return

    const texto = `📋 Relatório de Prestação de Contas

================================
💰 RESUMO FINANCEIRO
Receita Total: R$${resultados.totalReceita.toFixed(2)}
Despesas Totais: R$${resultados.totalDespesas.toFixed(2)}
Sua Parte: R$${resultados.minhaParte.toFixed(2)}
================================

📊 DETALHAMENTO
Receitas:
Receita de pessoas (${formData.qtdPessoas} × R$${formData.valorPessoa.toFixed(2)}): R$${resultados.receitaPessoas.toFixed(2)}
${formData.inclusoCobertor ? `Receita de cobertores (${formData.qtdCobertores} × R$${formData.valorCobradoCobertor.toFixed(2)}): R$${resultados.totalCobertorRecebido.toFixed(2)}` : ''}
Total Receitas: R$${resultados.totalReceita.toFixed(2)}

Despesas Operacionais:
Custo das peças (${resultados.totalPecas} peças × R$5.00): R$${resultados.custoPecas.toFixed(2)}
Custo dos cobertores (${formData.qtdCobertores} × R$${formData.valorCobertor.toFixed(2)}): R$${resultados.totalCobertorPago.toFixed(2)}
Custo de transporte: R$${formData.transporte.toFixed(2)}
${formData.despesasExtras.map(d => `${d.descricao}: R$${d.valor.toFixed(2)}`).join('\n')}
Parte da lavanderia (50% do lucro): R$${resultados.parteLavanderia.toFixed(2)}
Total Despesas: R$${resultados.totalDespesas.toFixed(2)}

Resultado Final:
Lucro bruto: R$${resultados.lucroBruto.toFixed(2)}
Sua parte (50%): R$${resultados.minhaParte.toFixed(2)}`

    navigator.clipboard.writeText(texto).catch(() => {
      // Fallback para navegadores mais antigos
      const textarea = document.createElement('textarea')
      textarea.value = texto
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    })
  }, [resultados, formData])

  const resetForm = useCallback(() => {
    setFormData({
      qtdCasal: 0,
      qtdSolteiro: 0,
      qtdCobertores: 0,
      valorCobertor: 7,
      valorCobertoCobertor: 15,
      inclusoCobertor: false,
      transporte: 30,
      qtdPessoas: 0,
      valorPessoa: 50,
      autoPeople: 0,
      despesasExtras: []
    })
    setResultados(null)
  }, [])

  return {
    formData,
    resultados,
    updateField,
    updateKit,
    adicionarDespesaExtra,
    removerDespesaExtra,
    atualizarDespesaExtra,
    calcular,
    copiarResultado,
    resetForm
  }
}