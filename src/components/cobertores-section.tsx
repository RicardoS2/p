"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

interface CobertoresSectionProps {
  qtdCobertores: number
  valorCobertor: number
  valorCobradoCobertor: number
  inclusoCobertor: boolean
  onFieldChange: (field: string, value: any) => void
}

export function CobertoresSection({
  qtdCobertores,
  valorCobertor,
  valorCobradoCobertor,
  inclusoCobertor,
  onFieldChange
}: CobertoresSectionProps) {
  return (
    <div className="space-y-4">
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Quantidade de Cobertores</Label>
                <div className="flex justify-center mt-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white shadow-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFieldChange('qtdCobertores', Math.max(0, qtdCobertores - 1))}
                      className="h-10 w-10 rounded-l-lg hover:bg-gray-100"
                      disabled={qtdCobertores <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 w-16 flex items-center justify-center border-x border-gray-200 bg-gray-50">
                      <span className="font-semibold text-lg">{qtdCobertores}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFieldChange('qtdCobertores', qtdCobertores + 1)}
                      className="h-10 w-10 rounded-r-lg hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="inclusoCobertor"
                  checked={inclusoCobertor}
                  onCheckedChange={(checked) => onFieldChange('inclusoCobertor', checked)}
                />
                <Label htmlFor="inclusoCobertor" className="text-sm font-medium">
                  Cobertor cobrado à parte?
                </Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="valorCobertor" className="text-sm font-medium">
                  Custo por cobertor (R$)
                </Label>
                <Input
                  id="valorCobertor"
                  type="number"
                  step="0.01"
                  min="0"
                  value={valorCobertor}
                  onChange={(e) => onFieldChange('valorCobertor', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="valorCobradoCobertor" className="text-sm font-medium">
                  Preço por cobertor (R$)
                </Label>
                <Input
                  id="valorCobradoCobertor"
                  type="number"
                  step="0.01"
                  min="0"
                  value={valorCobradoCobertor}
                  onChange={(e) => onFieldChange('valorCobradoCobertor', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  disabled={!inclusoCobertor}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}