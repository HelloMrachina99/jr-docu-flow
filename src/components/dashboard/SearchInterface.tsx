import { useState, useEffect } from 'react'
import { Search, BookOpen, FileText, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchResult {
  id: string
  title: string
  type: 'treinamento' | 'entrega'
  description?: string
  link?: string
}

interface SearchInterfaceProps {
  onSectionClick: (section: 'treinamentos' | 'entregas') => void
}

export function SearchInterface({ onSectionClick }: SearchInterfaceProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  // Mock data for demonstration
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Mapeamento de Processos - Treinamento',
      type: 'treinamento',
      description: 'Como realizar um mapeamento de processos.',
      link: 'https://drive.google.com/file/d/example1'
    },
    {
      id: '2',
      title: 'Mapeamento de Processos - Exemplos de Entregas',
      type: 'entrega',
      description: 'Exemplo de mapeamento de uma empresa de frutos bentos.',
      link: 'https://drive.google.com/file/d/example2'
    },
    {
      id: '3',
      title: 'Mapeamento de Processos - Exemplos de Entregas',
      type: 'entrega',
      description: 'Exemplo de mapeamento de uma empresa do ramo alimentício.',
      link: 'https://drive.google.com/file/d/example3'
    },
    {
      id: '4',
      title: 'Treinamento',
      type: 'treinamento',
      description: 'Como realizar um mapeamento de processos.',
      link: 'https://drive.google.com/file/d/example4'
    },
    {
      id: '5',
      title: 'Mapeamento de Processos - Treinamento',
      type: 'treinamento',
      description: 'Quais as entradas e saídas de um processo...',
      link: 'https://drive.google.com/file/d/example5'
    }
  ]

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const handleDownload = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="PESQUISAR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg bg-white border-2 border-gray-200 rounded-lg shadow-sm"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Resultados da Pesquisa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {result.type === 'treinamento' ? (
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      ) : (
                        <FileText className="h-4 w-4 text-green-600" />
                      )}
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <Badge 
                        variant={result.type === 'treinamento' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {result.type === 'treinamento' ? 'Treinamento' : 'Entrega'}
                      </Badge>
                    </div>
                    {result.description && (
                      <p className="text-sm text-gray-600">{result.description}</p>
                    )}
                  </div>
                  {result.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(result.link!)}
                      className="ml-4"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Cards */}
      {searchResults.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-colors shadow-lg"
            onClick={() => onSectionClick('treinamentos')}
          >
            <CardContent className="flex flex-col items-center justify-center h-40">
              <BookOpen className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold">TREINAMENTOS</h3>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-colors shadow-lg"
            onClick={() => onSectionClick('entregas')}
          >
            <CardContent className="flex flex-col items-center justify-center h-40">
              <FileText className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold">EXEMPLOS DE ENTREGAS</h3>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}