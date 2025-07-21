import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { DocumentForm } from './DocumentForm'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  LogOut, 
  User,
  BookOpen,
  Users,
  FolderOpen
} from 'lucide-react'
import { Database } from '@/lib/supabase'

type Document = Database['public']['Tables']['documents']['Row'] & {
  profiles: {
    full_name: string
  }
}

export function Dashboard() {
  const { profile, signOut } = useAuth()
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchTerm, categoryFilter])

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Error loading documents:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar os documentos.',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.profiles.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(doc => doc.category === categoryFilter)
    }

    setFilteredDocuments(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!profile || profile.user_type !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Acesso negado',
        description: 'Apenas administradores podem excluir documentos.',
      })
      return
    }

    if (!confirm('Tem certeza que deseja excluir este documento?')) return

    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Sucesso',
        description: 'Documento excluído com sucesso.',
      })
      loadDocuments()
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível excluir o documento.',
      })
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Treinamento':
        return <BookOpen className="h-4 w-4" />
      case 'Projetos':
        return <FolderOpen className="h-4 w-4" />
      case 'Administrativo':
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Treinamento':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Projetos':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Administrativo':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DocManager EJ</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gestão de Documentos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="text-foreground">{profile?.full_name}</span>
              <Badge variant={profile?.user_type === 'admin' ? 'default' : 'secondary'}>
                {profile?.user_type === 'admin' ? 'Admin' : 'Membro'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treinamentos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.category === 'Treinamento').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.category === 'Projetos').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>
                  Gerencie todos os documentos da empresa júnior
                </CardDescription>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por título, descrição ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="Treinamento">Treinamento</SelectItem>
                    <SelectItem value="Projetos">Projetos</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(doc.category)}
                    <CardTitle className="text-lg line-clamp-1">{doc.title}</CardTitle>
                  </div>
                  <Badge className={getCategoryColor(doc.category)}>
                    {doc.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Autor: {doc.profiles.full_name}</p>
                    <p>Criado em: {new Date(doc.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(doc.drive_link, '_blank')}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Abrir
                    </Button>
                    
                    {profile?.user_type === 'admin' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingDoc(doc)
                            setShowForm(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhum documento encontrado
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || categoryFilter !== 'all'
                  ? 'Tente ajustar os filtros de pesquisa.'
                  : 'Comece adicionando seu primeiro documento.'}
              </p>
              {!searchTerm && categoryFilter === 'all' && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Documento
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Document Form Modal */}
      {showForm && (
        <DocumentForm
          document={editingDoc}
          onClose={() => {
            setShowForm(false)
            setEditingDoc(null)
          }}
          onSuccess={() => {
            loadDocuments()
            setShowForm(false)
            setEditingDoc(null)
          }}
        />
      )}
    </div>
  )
}