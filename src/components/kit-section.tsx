"use client"

import { Users, User, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface KitSectionProps {
  qtdCasal: number
  qtdSolteiro: number
  onKitChange: (tipo: 'casal' | 'solteiro', change: number) => void
}

export function KitSection({ qtdCasal, qtdSolteiro, onKitChange }: KitSectionProps) {
  const KitCard = ({ 
    title, 
    icon: Icon, 
    quantidade, 
    tipo, 
    descricao, 
    bgColor 
  }: {
    title: string
    icon: any
    quantidade: number
    tipo: 'casal' | 'solteiro'
    descricao: string
    bgColor: string
  }) => (
    <Card className={`${bgColor} border-2 hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onKitChange(tipo, -1)}
              className="h-10 w-10 rounded-l-lg hover:bg-gray-100"
              disabled={quantidade <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="h-10 w-16 flex items-center justify-center border-x border-gray-200 bg-gray-50">
              <span className="font-semibold text-lg">{quantidade}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onKitChange(tipo, 1)}
              className="h-10 w-10 rounded-r-lg hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 text-center">{descricao}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <KitCard
        title="Kit Casal"
        icon={Users}
        quantidade={qtdCasal}
        tipo="casal"
        descricao="6 peças (2 lençóis, 2 fronhas, 2 toalhas)"
        bgColor="bg-indigo-50"
      />
      <KitCard
        title="Kit Solteiro"
        icon={User}
        quantidade={qtdSolteiro}
        tipo="solteiro"
        descricao="4 peças (2 lençóis, 1 fronha, 1 toalha)"
        bgColor="bg-indigo-50"
      />
    </div>
  )
}