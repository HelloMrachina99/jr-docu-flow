import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchInterface } from './SearchInterface'
import { TrainingsSection } from './TrainingsSection'
import { DeliveriesSection } from './DeliveriesSection'
import { DocumentsSection } from './DocumentsSection'
import { 
  FileText, 
  LogOut, 
  User,
  Settings
} from 'lucide-react'

type CurrentView = 'main' | 'treinamentos' | 'entregas' | 'documentos'

export function Dashboard() {
  const { profile, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<CurrentView>('main')

  const handleSectionClick = (section: 'treinamentos' | 'entregas' | 'documentos') => {
    setCurrentView(section)
  }

  const handleBackToMain = () => {
    setCurrentView('main')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DocManager EJ</h1>
              <p className="text-sm text-gray-600">Sistema de Gestão de Documentos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="text-gray-900">{profile?.full_name}</span>
              <Badge variant={profile?.user_type === 'admin' ? 'default' : 'secondary'}>
                {profile?.user_type === 'admin' ? 'Admin' : 'Membro'}
              </Badge>
            </div>
            {profile?.user_type === 'admin' && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {currentView === 'main' && (
          <SearchInterface onSectionClick={handleSectionClick} />
        )}
        
        {currentView === 'treinamentos' && (
          <TrainingsSection onBack={handleBackToMain} />
        )}
        
        {currentView === 'entregas' && (
          <DeliveriesSection onBack={handleBackToMain} />
        )}
        
        {currentView === 'documentos' && (
          <DocumentsSection onBack={handleBackToMain} />
        )}
      </div>
    </div>
  )
}