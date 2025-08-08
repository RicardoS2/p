"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface DespesaExtra {
  id: string
  descricao: string
  valor: number
}

interface DespesasExtrasSectionProps {
  despesasExtras: DespesaExtra[]
  onAdicionarDespesa: () => void
  onRemoverDespesa: (id: string) => void
  onAtualizarDespesa: (id: string, field: keyof DespesaExtra, value: string | number) => void
}

export function DespesasExtrasSection({
  despesasExtras,
  onAdicionarDespesa,
  onRemoverDespesa,
  onAtualizarDespesa
}: DespesasExtrasSectionProps) {
  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Despesas adicionais:</Label>
          
          <div className="space-y-3">
            {despesasExtras.map((despesa) => (
              <div key={despesa.id} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Descrição da despesa"
                    value={despesa.descricao}
                    onChange={(e) => onAtualizarDespesa(despesa.id, 'descricao', e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    placeholder="R$"
                    step="0.01"
                    min="0"
                    value={despesa.valor}
                    onChange={(e) => onAtualizarDespesa(despesa.id, 'valor', parseFloat(e.target.value) || 0)}
                    className="bg-white"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoverDespesa(despesa.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 h-10 w-10 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button
            onClick={onAdicionarDespesa}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Despesa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}