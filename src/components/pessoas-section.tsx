"use client"

import { Users, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface PessoasSectionProps {
  qtdPessoas: number
  valorPessoa: number
  autoPeople: number
  onFieldChange: (field: string, value: any) => void
}

export function PessoasSection({ qtdPessoas, valorPessoa, autoPeople, onFieldChange }: PessoasSectionProps) {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Nº de Pessoas</Label>
              <div className="flex justify-center mt-3">
                <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white shadow-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFieldChange('qtdPessoas', Math.max(0, qtdPessoas - 1))}
                    className="h-10 w-10 rounded-l-lg hover:bg-gray-100"
                    disabled={qtdPessoas <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-16 flex items-center justify-center border-x border-gray-200 bg-gray-50">
                    <span className="font-semibold text-lg">{qtdPessoas}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFieldChange('qtdPessoas', qtdPessoas + 1)}
                    className="h-10 w-10 rounded-r-lg hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 text-center">
                {autoPeople >= 0 ? (
                  <span className="text-green-600 font-medium">
                    {autoPeople} pessoas calculadas automaticamente
                  </span>
                ) : (
                  <span className="text-orange-600 font-medium">
                    atualização manual
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="valorPessoa" className="text-base font-semibold">
                Valor por Pessoa (R$)
              </Label>
              <Input
                id="valorPessoa"
                type="number"
                step="0.01"
                min="0"
                value={valorPessoa}
                onChange={(e) => onFieldChange('valorPessoa', parseFloat(e.target.value) || 0)}
                className="mt-1 text-lg"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}