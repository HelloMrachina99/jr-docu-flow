import { useState } from 'react'
import { ArrowLeft, Download, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Training {
  id: string
  title: string
  description: string
  duration: string
  driveLink: string
}

interface TrainingsSectionProps {
  onBack: () => void
}

export function TrainingsSection({ onBack }: TrainingsSectionProps) {
  // Mock training data
  const trainings: Training[] = [
    {
      id: '1',
      title: 'Introdução ao Mapeamento de Processos',
      description: 'Aprenda os conceitos básicos do mapeamento de processos e como aplicá-los em sua empresa júnior.',
      duration: '45 min',
      driveLink: 'https://drive.google.com/file/d/example1/view'
    },
    {
      id: '2',
      title: 'Técnicas Avançadas de Análise',
      description: 'Domine técnicas avançadas para análise e otimização de processos empresariais.',
      duration: '60 min',
      driveLink: 'https://drive.google.com/file/d/example2/view'
    },
    {
      id: '3',
      title: 'Ferramentas de Documentação',
      description: 'Conheça as principais ferramentas para documentar e visualizar processos.',
      duration: '30 min',
      driveLink: 'https://drive.google.com/file/d/example3/view'
    },
    {
      id: '4',
      title: 'Gestão de Projetos em EJ',
      description: 'Metodologias e boas práticas para gestão de projetos em empresas juniores.',
      duration: '90 min',
      driveLink: 'https://drive.google.com/file/d/example4/view'
    }
  ]

  const handleDownload = (driveLink: string) => {
    // Convert Google Drive view link to download link
    const fileId = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    if (fileId) {
      const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`
      window.open(downloadLink, '_blank')
    } else {
      // Fallback to original link
      window.open(driveLink, '_blank')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Treinamentos</h2>
          <p className="text-muted-foreground">Vídeos de treinamento para desenvolvimento profissional</p>
        </div>
      </div>

      {/* Training Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training) => (
          <Card key={training.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      {training.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 mb-4">
                {training.description}
              </CardDescription>
              
              <Button
                onClick={() => handleDownload(training.driveLink)}
                className="w-full"
                variant="default"
              >
                <Download className="h-4 w-4 mr-2" />
                Download do Google Drive
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Como acessar os vídeos</h3>
              <p className="text-sm text-blue-700">
                Clique em "Download do Google Drive" para baixar o vídeo diretamente do nosso repositório.
                Os vídeos estarão disponíveis em alta qualidade para download.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}