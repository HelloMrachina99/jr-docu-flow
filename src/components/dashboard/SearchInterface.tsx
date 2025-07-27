
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, FileText, Video, Download } from 'lucide-react'

interface SearchInterfaceProps {
  onSectionClick: (section: 'treinamentos' | 'entregas') => void
}

export function SearchInterface({ onSectionClick }: SearchInterfaceProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Dados de exemplo para demonstração
  const mockData = [
    { id: 1, title: 'Treinamento React Básico', type: 'Treinamento', category: 'Desenvolvimento' },
    { id: 2, title: 'Entrega Projeto Alpha', type: 'Entrega', category: 'Projetos' },
    { id: 3, title: 'Treinamento TypeScript', type: 'Treinamento', category: 'Desenvolvimento' },
    { id: 4, title: 'Entrega Relatório Q1', type: 'Entrega', category: 'Administrativo' },
  ]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim()) {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Pesquisar materiais, treinamentos e entregas..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 py-3 text-lg"
        />
      </div>

      {/* Resultados da Pesquisa */}
      {searchResults.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Resultados da Pesquisa</h3>
            <div className="space-y-3">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.type === 'Treinamento' ? (
                      <Video className="h-5 w-5 text-blue-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Acessar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seções Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Treinamentos */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Treinamentos</h3>
            <p className="text-gray-600 mb-4">
              Acesse vídeos de treinamento e materiais educativos
            </p>
            <Button onClick={() => onSectionClick('treinamentos')} className="w-full">
              Acessar Treinamentos
            </Button>
          </CardContent>
        </Card>

        {/* Entregas */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Exemplos de Entregas</h3>
            <p className="text-gray-600 mb-4">
              Veja exemplos e modelos de diferentes tipos de entregas
            </p>
            <Button onClick={() => onSectionClick('entregas')} className="w-full">
              Ver Exemplos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
