
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, Folder, Download } from 'lucide-react'

interface DeliveriesSectionProps {
  onBack: () => void
}

export function DeliveriesSection({ onBack }: DeliveriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Categorias de entregas
  const deliveryCategories = [
    {
      id: 'projetos',
      name: 'Projetos',
      icon: <Folder className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800',
      count: 12,
    },
    {
      id: 'relatorios',
      name: 'Relatórios',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800',
      count: 8,
    },
    {
      id: 'apresentacoes',
      name: 'Apresentações',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800',
      count: 15,
    },
    {
      id: 'documentos',
      name: 'Documentos Técnicos',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-800',
      count: 6,
    },
    {
      id: 'templates',
      name: 'Templates',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-pink-100 text-pink-800',
      count: 10,
    },
    {
      id: 'outros',
      name: 'Outros',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-gray-100 text-gray-800',
      count: 5,
    },
  ]

  // Exemplos de arquivos por categoria (placeholder)
  const deliveryFiles = {
    projetos: [
      { id: 1, name: 'Projeto Sistema Web', type: 'PDF', size: '2.5 MB' },
      { id: 2, name: 'Aplicativo Mobile', type: 'DOCX', size: '1.8 MB' },
      { id: 3, name: 'Dashboard Analytics', type: 'PDF', size: '3.2 MB' },
    ],
    relatorios: [
      { id: 1, name: 'Relatório Mensal Q1', type: 'PDF', size: '1.2 MB' },
      { id: 2, name: 'Análise de Performance', type: 'XLSX', size: '890 KB' },
    ],
    apresentacoes: [
      { id: 1, name: 'Apresentação Cliente A', type: 'PPTX', size: '5.1 MB' },
      { id: 2, name: 'Pitch Investidores', type: 'PDF', size: '2.8 MB' },
    ],
    documentos: [
      { id: 1, name: 'Documentação API', type: 'PDF', size: '1.5 MB' },
      { id: 2, name: 'Manual Usuário', type: 'DOCX', size: '2.1 MB' },
    ],
    templates: [
      { id: 1, name: 'Template Proposta', type: 'DOCX', size: '450 KB' },
      { id: 2, name: 'Template Relatório', type: 'XLSX', size: '320 KB' },
    ],
    outros: [
      { id: 1, name: 'Checklist Qualidade', type: 'PDF', size: '180 KB' },
      { id: 2, name: 'Guia Processo', type: 'DOCX', size: '750 KB' },
    ],
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
  }

  const handleDownload = (fileName: string) => {
    // Placeholder para download
    console.log(`Downloading: ${fileName}`)
    // Aqui você implementaria o download real do arquivo
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={selectedCategory ? handleBackToCategories : onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">
          {selectedCategory ? 
            deliveryCategories.find(cat => cat.id === selectedCategory)?.name :
            'Exemplos de Entregas'
          }
        </h2>
      </div>

      {/* Categorias ou Arquivos */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveryCategories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <Badge variant="secondary">{category.count} arquivos</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {deliveryFiles[selectedCategory as keyof typeof deliveryFiles]?.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <p className="text-sm text-gray-600">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Informações */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">📋 Sobre os Exemplos</h3>
          <p className="text-sm text-green-700">
            Estes são exemplos de entregas organizados por categoria. Use-os como referência 
            para seus próprios projetos e entregas. Todos os arquivos são modelos que podem 
            ser adaptados conforme suas necessidades.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
