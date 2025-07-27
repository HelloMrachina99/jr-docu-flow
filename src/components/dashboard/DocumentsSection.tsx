import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DocumentForm } from './DocumentForm'
import { useToast } from '@/hooks/use-toast'
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  FileText, 
  Edit, 
  Trash2,
  ExternalLink 
} from 'lucide-react'
import type { Database } from '@/integrations/supabase/types'

type Document = Database['public']['Tables']['documents']['Row']

interface DocumentsSectionProps {
  onBack: () => void
}

export function DocumentsSection({ onBack }: DocumentsSectionProps) {
  const { profile } = useAuth()
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'Treinamento', label: 'Treinamento' },
    { value: 'Projetos', label: 'Projetos' },
    { value: 'Administrativo', label: 'Administrativo' },
  ]

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading documents:', error)
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar documentos',
          description: error.message,
        })
      } else {
        setDocuments(data || [])
        setFilteredDocuments(data || [])
      }
    } catch (error) {
      console.error('Error loading documents:', error)
      toast({
        variant: 'destructive',
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao carregar os documentos.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    let filtered = documents

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredDocuments(filtered)
  }, [documents, searchTerm, selectedCategory])

  const handleEdit = (document: Document) => {
    setEditingDocument(document)
    setShowForm(true)
  }

  const handleDelete = async (document: Document) => {
    if (!confirm('Tem certeza que deseja excluir este documento?')) return

    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id)

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao excluir documento',
          description: error.message,
        })
      } else {
        toast({
          title: 'Documento excluído',
          description: 'O documento foi excluído com sucesso.',
        })
        loadDocuments()
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        variant: 'destructive',
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao excluir o documento.',
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingDocument(null)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    loadDocuments()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Treinamento': return 'bg-blue-100 text-blue-800'
      case 'Projetos': return 'bg-green-100 text-green-800'
      case 'Administrativo': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Documentos</h2>
        </div>
        
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Documentos */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedCategory !== 'all' ? 'Nenhum documento encontrado' : 'Nenhum documento ainda'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando seu primeiro documento.'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Documento
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(document.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <FileText className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </CardHeader>
              
              <CardContent>
                {document.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {document.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(document.drive_link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir
                  </Button>
                  
                  {profile?.user_type === 'admin' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(document)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Formulário Modal */}
      {showForm && (
        <DocumentForm
          document={editingDocument}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}