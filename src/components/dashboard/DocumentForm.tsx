import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import type { Database } from '@/integrations/supabase/types'

type Document = Database['public']['Tables']['documents']['Row']

interface DocumentFormProps {
  document?: Document | null
  onClose: () => void
  onSuccess: () => void
}

export function DocumentForm({ document, onClose, onSuccess }: DocumentFormProps) {
  const { profile } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as 'Treinamento' | 'Projetos' | 'Administrativo' | '',
    drive_link: '',
  })

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        description: document.description || '',
        category: document.category as 'Treinamento' | 'Projetos' | 'Administrativo',
        drive_link: document.drive_link,
      })
    }
  }, [document])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!profile) return

    setLoading(true)

    try {
      const dataToSubmit = {
        ...formData,
        author_id: profile.id,
      }

      if (document) {
        // Update existing document
        const { error } = await supabase
          .from('documents')
          .update(dataToSubmit)
          .eq('id', document.id)

        if (error) throw error

        toast({
          title: 'Sucesso',
          description: 'Documento atualizado com sucesso.',
        })
      } else {
        // Create new document
        const { error } = await supabase
          .from('documents')
          .insert(dataToSubmit)

        if (error) throw error

        toast({
          title: 'Sucesso',
          description: 'Documento criado com sucesso.',
        })
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving document:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível salvar o documento.',
      })
    } finally {
      setLoading(false)
    }
  }

  const validateDriveLink = (url: string) => {
    const driveRegex = /^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=|drive\/folders\/)/
    return driveRegex.test(url) || url === ''
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {document ? 'Editar Documento' : 'Novo Documento'}
          </DialogTitle>
          <DialogDescription>
            {document 
              ? 'Atualize as informações do documento.' 
              : 'Adicione um novo documento ao sistema.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nome do documento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o conteúdo do documento"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ 
                ...formData, 
                category: value as 'Treinamento' | 'Projetos' | 'Administrativo' 
              })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Treinamento">📚 Treinamento</SelectItem>
                <SelectItem value="Projetos">📁 Projetos</SelectItem>
                <SelectItem value="Administrativo">👥 Administrativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="drive_link">Link do Google Drive *</Label>
            <Input
              id="drive_link"
              type="url"
              value={formData.drive_link}
              onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })}
              placeholder="https://drive.google.com/..."
              required
            />
            {formData.drive_link && !validateDriveLink(formData.drive_link) && (
              <p className="text-sm text-destructive">
                Por favor, insira um link válido do Google Drive
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || (formData.drive_link && !validateDriveLink(formData.drive_link))}
              className="flex-1"
            >
              {loading ? 'Salvando...' : (document ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}