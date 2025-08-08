"use client"

import { Info, Calculator, Users, User, Truck, DollarSign, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function InfoSection() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Como usar */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            Como usar a calculadora
          </CardTitle>
          <CardDescription>
            Siga estes passos para calcular a prestação de contas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calculator,
                title: "1. Configure os Kits",
                description: "Preencha a quantidade de kits casal e solteiro. O sistema calculará automaticamente o número de pessoas."
              },
              {
                icon: Users,
                title: "2. Adicione Cobertores",
                description: "Informe a quantidade de cobertores e seus valores. Marque se serão cobrados à parte."
              },
              {
                icon: Truck,
                title: "3. Transporte",
                description: "Adicione o valor do transporte utilizado."
              },
              {
                icon: User,
                title: "4. Verifique Pessoas",
                description: "Confirme o número de pessoas e o valor por pessoa. Pode ser ajustado manualmente."
              },
              {
                icon: DollarSign,
                title: "5. Despesas Extras",
                description: "Adicione quaisquer despesas adicionais que devam ser divididas."
              },
              {
                icon: CheckCircle,
                title: "6. Calcule",
                description: "Clique em 'Calcular' para ver os resultados detalhados e copie o relatório."
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <step.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Itens por Kit */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calculator className="h-5 w-5 text-amber-600" />
            </div>
            Itens por Kit
          </CardTitle>
          <CardDescription>
            Composição de cada kit de lavanderia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg">Kit Casal</h3>
                <Badge variant="secondary">6 peças</Badge>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  1 lençol com elástico
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  1 lençol sem elástico
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  2 fronhas
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  2 toalhas
                </li>
              </ul>
              <div className="mt-4 p-3 bg-indigo-100 rounded">
                <p className="text-sm font-medium text-indigo-700">
                  Custo: R$ 30,00 (6 peças × R$ 5,00)
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-lg">Kit Solteiro</h3>
                <Badge variant="secondary">4 peças</Badge>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  1 lençol com elástico
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  1 lençol sem elástico
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  1 fronha
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  1 toalha
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-sm font-medium text-green-700">
                  Custo: R$ 20,00 (4 peças × R$ 5,00)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sobre os Cálculos */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calculator className="h-5 w-5 text-purple-600" />
            </div>
            Sobre os Cálculos
          </CardTitle>
          <CardDescription>
            Entenda como os cálculos são realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h4 className="font-semibold mb-2 text-blue-700">💰 Custos Fixos</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Cada peça tem custo de R$ 5,00 para lavagem</li>
                  <li>• Transporte é considerado despesa fixa</li>
                  <li>• Custo de cobertores é adicionado separadamente</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h4 className="font-semibold mb-2 text-green-700">📈 Receitas</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Valor por pessoa multiplicado pelo número de pessoas</li>
                  <li>• Receita adicional de cobertores (se cobrado à parte)</li>
                  <li>• Todas as receitas são somadas para o total</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h4 className="font-semibold mb-2 text-amber-700">⚖️ Divisão</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Despesas extras são divididas igualmente</li>
                  <li>• Lucro bruto é dividido igualmente (50% cada)</li>
                  <li>• Parte da lavanderia é considerada como despesa</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                <h4 className="font-semibold mb-2 text-purple-700">📊 Resultado Final</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Lucro bruto = Receitas - Despesas</li>
                  <li>• Sua parte = 50% do lucro bruto</li>
                  <li>• Relatório completo pode ser copiado para compartilhamento</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
            <h4 className="font-semibold mb-2 text-gray-700">💡 Dicas Importantes</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• O número de pessoas é calculado automaticamente baseado nos kits</li>
              <li>• Você pode ajustar manualmente o número de pessoas se necessário</li>
              <li>• Despesas extras são úteis para custos não previstos</li>
              <li>• Use o botão "Copiar Relatório" para compartilhar os resultados</li>
              <li>• O botão "Reiniciar" limpa todos os campos para novo cálculo</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}