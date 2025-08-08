"use client"

import { useState } from "react"
import { Calculator, Info, Copy, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { KitSection } from "@/components/kit-section"
import { CobertoresSection } from "@/components/cobertores-section"
import { TransporteSection } from "@/components/transporte-section"
import { PessoasSection } from "@/components/pessoas-section"
import { DespesasExtrasSection } from "@/components/despesas-extras-section"
import { ResultadosSection } from "@/components/resultados-section"
import { InfoSection } from "@/components/info-section"
import { useCalculadora } from "@/hooks/use-calculadora"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dados")
  const {
    formData,
    resultados,
    updateField,
    updateKit,
    adicionarDespesaExtra,
    removerDespesaExtra,
    atualizarDespesaExtra,
    calcular,
    resetForm,
    copiarResultado
  } = useCalculadora()

  const handleCalcular = () => {
    calcular()
    toast.success("Cálculo realizado com sucesso!")
  }

  const handleCopiar = () => {
    if (!resultados) {
      toast.error("Calcule antes de copiar!")
      return
    }
    copiarResultado()
    toast.success("Resultado copiado com sucesso!")
  }

  const handleReset = () => {
    resetForm()
    toast.success("Formulário reiniciado!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-4 mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold">Calculadora de Prestação de Contas</h1>
          </motion.div>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Calcule facilmente os custos, receitas e divisão de lucros para serviços de lavanderia
          </motion.p>
        </motion.header>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="dados" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Entrada de Dados
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Informações
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "dados" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "dados" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "dados" && (
                  <TabsContent value="dados" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Formulário Principal */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Kits de Lavanderia */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                  <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Calculator className="h-5 w-5 text-indigo-600" />
                                  </div>
                                  Kits de Lavanderia
                                </CardTitle>
                                <Badge variant="secondary">Peças calculadas automaticamente</Badge>
                              </div>
                              <CardDescription>
                                Configure os kits de lavanderia disponíveis
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <KitSection
                                qtdCasal={formData.qtdCasal}
                                qtdSolteiro={formData.qtdSolteiro}
                                onKitChange={updateKit}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Cobertores */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        >
                          <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                  <Calculator className="h-5 w-5 text-amber-600" />
                                </div>
                                Cobertores
                              </CardTitle>
                              <CardDescription>
                                Configure a quantidade e valores dos cobertores
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <CobertoresSection
                                qtdCobertores={formData.qtdCobertores}
                                valorCobertor={formData.valorCobertor}
                                valorCobradoCobertor={formData.valorCobradoCobertor}
                                inclusoCobertor={formData.inclusoCobertor}
                                onFieldChange={updateField}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Transporte */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Calculator className="h-5 w-5 text-blue-600" />
                                </div>
                                Transporte
                              </CardTitle>
                              <CardDescription>
                                Valor do transporte
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <TransporteSection
                                transporte={formData.transporte}
                                onFieldChange={updateField}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Pessoas */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0, duration: 0.5 }}
                        >
                          <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <Calculator className="h-5 w-5 text-green-600" />
                                  </div>
                                  Pessoas
                                </CardTitle>
                                <Badge variant="secondary">Atualizado automaticamente</Badge>
                              </div>
                              <CardDescription>
                                Número de pessoas e valor por pessoa
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <PessoasSection
                                qtdPessoas={formData.qtdPessoas}
                                valorPessoa={formData.valorPessoa}
                                autoPeople={formData.autoPeople}
                                onFieldChange={updateField}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Despesas Extras */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                        >
                          <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                  <div className="p-2 bg-red-100 rounded-lg">
                                    <Calculator className="h-5 w-5 text-red-600" />
                                  </div>
                                  Despesas Extras
                                </CardTitle>
                                <Badge variant="destructive">Divididas meio a meio</Badge>
                              </div>
                              <CardDescription>
                                Adicione despesas adicionais
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <DespesasExtrasSection
                                despesasExtras={formData.despesasExtras}
                                onAdicionarDespesa={adicionarDespesaExtra}
                                onRemoverDespesa={removerDespesaExtra}
                                onAtualizarDespesa={atualizarDespesaExtra}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Ações */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button onClick={handleCalcular} className="w-full" size="lg">
                              <Calculator className="mr-2 h-4 w-4" />
                              Calcular
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button onClick={handleCopiar} variant="outline" className="w-full" size="lg">
                              <Copy className="mr-2 h-4 w-4" />
                              Copiar Relatório
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button onClick={handleReset} variant="outline" className="w-full" size="lg">
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Reiniciar
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Resultados */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                        className="lg:col-span-1"
                      >
                        <ResultadosSection resultados={resultados} formData={formData} />
                      </motion.div>
                    </div>
                  </TabsContent>
                )}
                {activeTab === "info" && (
                  <TabsContent value="info">
                    <InfoSection />
                  </TabsContent>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}