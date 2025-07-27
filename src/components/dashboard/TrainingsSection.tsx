
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download, Play, ExternalLink } from 'lucide-react'

interface TrainingsSectionProps {
  onBack: () => void
}

export function TrainingsSection({ onBack }: TrainingsSectionProps) {
  // Dados de exemplo para vídeos de treinamento
  const trainingVideos = [
    {
      id: 1,
      title: 'Introdução ao React',
      duration: '45 min',
      description: 'Conceitos básicos e fundamentos do React',
      driveLink: 'https://drive.google.com/file/d/1234567890abcdef/view',
      downloadLink: 'https://drive.google.com/uc?export=download&id=1234567890abcdef',
    },
    {
      id: 2,
      title: 'TypeScript Avançado',
      duration: '60 min',
      description: 'Técnicas avançadas de TypeScript para desenvolvimento',
      driveLink: 'https://drive.google.com/file/d/abcdef1234567890/view',
      downloadLink: 'https://drive.google.com/uc?export=download&id=abcdef1234567890',
    },
    {
      id: 3,
      title: 'Gerenciamento de Estado',
      duration: '35 min',
      description: 'Context API, Redux e outras ferramentas de estado',
      driveLink: 'https://drive.google.com/file/d/9876543210fedcba/view',
      downloadLink: 'https://drive.google.com/uc?export=download&id=9876543210fedcba',
    },
    {
      id: 4,
      title: 'Testes Automatizados',
      duration: '55 min',
      description: 'Jest, Testing Library e boas práticas de teste',
      driveLink: 'https://drive.google.com/file/d/fedcba0987654321/view',
      downloadLink: 'https://drive.google.com/uc?export=download&id=fedcba0987654321',
    },
  ]

  const handleDownload = (downloadLink: string, title: string) => {
    // Criar link temporário para download
    const link = document.createElement('a')
    link.href = downloadLink
    link.download = `${title}.mp4`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewOnDrive = (driveLink: string) => {
    window.open(driveLink, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Treinamentos</h2>
      </div>

      {/* Lista de Vídeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingVideos.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{video.duration}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Play className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{video.description}</p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleDownload(video.downloadLink, video.title)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewOnDrive(video.driveLink)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver no Drive
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Dicas para Download</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Os vídeos são armazenados no Google Drive para facilitar o acesso</li>
            <li>• Use "Download" para baixar diretamente no seu dispositivo</li>
            <li>• Use "Ver no Drive" para assistir online ou compartilhar</li>
            <li>• Verifique sua conexão de internet para downloads grandes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
