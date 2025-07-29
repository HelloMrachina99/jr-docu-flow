
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Download, Play, ExternalLink, Plus, Video, FileText } from 'lucide-react'

interface TrainingsSectionProps {
  onBack: () => void
}

export function TrainingsSection({ onBack }: TrainingsSectionProps) {
  const { profile } = useAuth()
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  
  // Dados de treinamento atualizados
  const trainingVideos = [
    {
      id: 1,
      title: 'Oratória',
      videoLink: 'https://www.youtube.com/watch?v=-w9tPITrRvM',
      textLink: 'https://www.escolavirtual.gov.br/curso/1347',
    },
    {
      id: 2,
      title: 'Marketing',
      videoLink: 'https://www.youtube.com/watch?v=_kx8wThTGIw',
      textLink: 'https://www.programaavancar.com.br/cursos/gestao-de-negocios/curso-marketing-digital/marketing-digital-trailer',
    },
  ]

  const handleWatchVideo = (videoLink: string) => {
    window.open(videoLink, '_blank')
  }

  const handleAccessText = (textLink: string) => {
    window.open(textLink, '_blank')
  }

  const handleAddTraining = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui seria implementada a lógica para adicionar o treinamento
    setIsUploadDialogOpen(false)
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
          <h2 className="text-2xl font-bold">Treinamentos</h2>
        </div>
        
        {profile?.user_type === 'admin' && (
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Treinamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Treinamento</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTraining} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" placeholder="Nome do treinamento" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoLink">Link do Vídeo</Label>
                  <Input id="videoLink" name="videoLink" placeholder="https://..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textLink">Link do Texto</Label>
                  <Input id="textLink" name="textLink" placeholder="https://..." required />
                </div>
                <Button type="submit" className="w-full">Adicionar</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Lista de Treinamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingVideos.map((training) => (
          <Card key={training.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{training.title}</CardTitle>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Play className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleWatchVideo(training.videoLink)}
                  className="flex-1"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Assistir Vídeo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccessText(training.textLink)}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Acessar Texto
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📚 Sobre os Treinamentos</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Assista aos vídeos para um aprendizado visual e interativo</li>
            <li>• Acesse os textos para estudos mais aprofundados</li>
            <li>• Combine vídeo e texto para um aprendizado completo</li>
            <li>• Pratique os conceitos aprendidos em projetos reais</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
