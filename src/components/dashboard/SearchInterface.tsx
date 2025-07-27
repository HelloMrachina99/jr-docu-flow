import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, FileText, Video, Download, GraduationCap, Package } from 'lucide-react'

interface SearchInterfaceProps {
  onSectionClick: (section: 'treinamentos' | 'entregas' | 'documentos') => void
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
    { id: 5, title: 'Documento API Reference', type: 'Documento', category: 'Técnico' },
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
                    ) : item.type === 'Documento' ? (
                      <FileText className="h-5 w-5 text-purple-600" />
                    ) : (
                      <Package className="h-5 w-5 text-green-600" />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick('treinamentos')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Treinamentos</h3>
            <p className="text-gray-600 text-sm mb-4">
              Acesse vídeos de treinamento e materiais educativos
            </p>
            <Button className="w-full">
              Acessar Treinamentos
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick('entregas')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Entregas</h3>
            <p className="text-gray-600 text-sm mb-4">
              Exemplos de entregas e templates organizados por categoria
            </p>
            <Button className="w-full">
              Ver Exemplos
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick('documentos')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Documentos</h3>
            <p className="text-gray-600 text-sm mb-4">
              Gerencie documentos, projetos e arquivos importantes
            </p>
            <Button className="w-full">
              Gerenciar Documentos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informações */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Bem-vindo ao DocManager EJ</h3>
          <p className="text-sm text-blue-700">
            Use a barra de pesquisa para encontrar rapidamente o que precisa, ou navegue pelas seções 
            para explorar treinamentos, exemplos de entregas e gerenciar documentos importantes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}