import { ArrowLeft, FileText, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DeliveryCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface DeliveriesSectionProps {
  onBack: () => void
}

export function DeliveriesSection({ onBack }: DeliveriesSectionProps) {
  // Mock delivery categories
  const deliveryCategories: DeliveryCategory[] = [
    {
      id: '1',
      title: 'Mapeamento de Processos',
      description: 'Exemplos de entregas de projetos de mapeamento e otimização de processos',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: '2',
      title: 'Análise Financeira',
      description: 'Modelos e exemplos de análises financeiras e econômicas',
      icon: <Folder className="h-6 w-6" />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: '3',
      title: 'Planejamento Estratégico',
      description: 'Exemplos de planos estratégicos e análises de mercado',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: '4',
      title: 'Gestão de Pessoas',
      description: 'Materiais sobre recursos humanos e gestão de equipes',
      icon: <Folder className="h-6 w-6" />,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: '5',
      title: 'Marketing Digital',
      description: 'Estratégias e campanhas de marketing digital implementadas',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      id: '6',
      title: 'Consultoria Organizacional',
      description: 'Exemplos de projetos de consultoria e reestruturação',
      icon: <Folder className="h-6 w-6" />,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      id: '7',
      title: 'Pesquisa de Mercado',
      description: 'Metodologias e resultados de pesquisas realizadas',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      id: '8',
      title: 'Inovação e Tecnologia',
      description: 'Projetos relacionados à transformação digital e inovação',
      icon: <Folder className="h-6 w-6" />,
      color: 'bg-cyan-500 hover:bg-cyan-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Exemplos de Entregas</h2>
          <p className="text-muted-foreground">Categorias de projetos e exemplos de entregas realizadas</p>
        </div>
      </div>

      {/* Delivery Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryCategories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${category.color} text-white p-4 rounded-lg transition-colors group-hover:scale-105`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Folder className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Sobre os Exemplos de Entregas</h3>
              <p className="text-sm text-gray-700">
                Clique em qualquer categoria para explorar exemplos reais de projetos entregues pela nossa empresa júnior.
                Cada categoria contém modelos, templates e casos de sucesso para inspirar seus projetos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}