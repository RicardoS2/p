"use client"

import { Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

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
  despesasExtras: Array<{
    id: string
    descricao: string
    valor: number
  }>
}

interface ResultadosSectionProps {
  resultados: Resultados | null
  formData: FormData
}

export function ResultadosSection({ resultados, formData }: ResultadosSectionProps) {
  if (!resultados) {
    return (
      <Card className="h-full shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600" />
              Resultados
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-400">
            <Calculator className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">Preencha os dados e clique em "Calcular"</p>
            <p className="text-sm">para ver os resultados</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Resumo Rápido */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Resumo Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {resultados.totalReceita.toFixed(2)}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Entrada
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Despesas Totais</p>
                  <p className="text-xl font-bold text-red-600">
                    R$ {resultados.totalDespesas.toFixed(2)}
                  </p>
                </div>
              </div>
              <Badge variant="destructive" className="bg-red-100 text-red-700">
                Saída
              </Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sua Parte</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    R$ {resultados.minhaParte.toFixed(2)}
                  </p>
                </div>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700">
                Lucro
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Detalhamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Receitas */}
          <div>
            <h4 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Receitas
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Receita de pessoas ({formData.qtdPessoas} × R$ {formData.valorPessoa.toFixed(2)})
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    R$ {resultados.receitaPessoas.toFixed(2)}
                  </TableCell>
                </TableRow>
                {formData.inclusoCobertor && (
                  <TableRow>
                    <TableCell>
                      Receita de cobertores ({formData.qtdCobertores} × R$ {formData.valorCobradoCobertor.toFixed(2)})
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      R$ {resultados.totalCobertorRecebido.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="bg-green-50">
                  <TableCell className="font-bold">Total Receitas</TableCell>
                  <TableCell className="text-right font-bold text-green-600">
                    R$ {resultados.totalReceita.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Despesas */}
          <div>
            <h4 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Despesas Operacionais
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Custo das peças ({resultados.totalPecas} peças × R$ 5.00)
                  </TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    R$ {resultados.custoPecas.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Custo dos cobertores ({formData.qtdCobertores} × R$ {formData.valorCobertor.toFixed(2)})
                  </TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    R$ {resultados.totalCobertorPago.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Custo de transporte</TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    R$ {formData.transporte.toFixed(2)}
                  </TableCell>
                </TableRow>
                {formData.despesasExtras.map((despesa, index) => (
                  <TableRow key={despesa.id}>
                    <TableCell>{despesa.descricao || `Despesa extra ${index + 1}`}</TableCell>
                    <TableCell className="text-right font-medium text-red-600">
                      R$ {despesa.valor.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Parte da lavanderia (50% do lucro)</TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    R$ {resultados.parteLavanderia.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-red-50">
                  <TableCell className="font-bold">Total Despesas</TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    R$ {resultados.totalDespesas.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Resultado Final */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-indigo-700 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Resultado Final
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Lucro bruto</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {resultados.lucroBruto.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-indigo-100">
                  <TableCell className="font-bold">Sua parte (50%)</TableCell>
                  <TableCell className="text-right font-bold text-indigo-600">
                    R$ {resultados.minhaParte.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}