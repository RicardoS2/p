"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface TransporteSectionProps {
  transporte: number
  onFieldChange: (field: string, value: any) => void
}

export function TransporteSection({ transporte, onFieldChange }: TransporteSectionProps) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="space-y-2">
          <Label htmlFor="transporte" className="text-base font-semibold">
            Valor do Transporte (R$)
          </Label>
          <Input
            id="transporte"
            type="number"
            step="0.01"
            min="0"
            value={transporte}
            onChange={(e) => onFieldChange('transporte', parseFloat(e.target.value) || 0)}
            className="text-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}