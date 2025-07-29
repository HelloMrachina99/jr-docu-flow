
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { FileText } from 'lucide-react'

export function AuthForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Mensagem mais específica para email não confirmado
        if (error.message.includes('Email not confirmed')) {
          toast({
            variant: 'destructive',
            title: 'Email não confirmado',
            description: 'Verifique sua caixa de entrada e confirme seu email antes de fazer login.',
          })
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: 'destructive',
            title: 'Credenciais inválidas',
            description: 'Email ou senha incorretos. Verifique seus dados e tente novamente.',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro ao fazer login',
            description: error.message,
          })
        }
      } else if (data.user) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo ao sistema de documentos.',
        })
        // Redirecionamento para a página principal
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        variant: 'destructive',
        title: 'Erro no login',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
      })
    }

    setLoading(false)
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    
    // Apenas ra125119@uem.br pode ser admin
    const userType = email === 'ra125119@uem.br' ? 'admin' : 'user'

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/?confirmed=true`,
          data: {
            full_name: fullName,
            user_type: userType,
          },
        },
      })

      if (error) {
        // Se o usuário já existe, mostra mensagem específica
        if (error.message.includes('already registered')) {
          toast({
            variant: 'destructive',
            title: 'Email já cadastrado',
            description: 'Este email já possui uma conta. Tente fazer login ou use outro email.',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro ao criar conta',
            description: error.message,
          })
        }
      } else if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: 'Confirme seu email!',
          description: 'Enviamos um link de confirmação para seu email. Clique no link para ativar sua conta.',
        })
      } else if (data.user) {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Você pode fazer login agora.',
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast({
        variant: 'destructive',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <FileText className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">DEJAPP</h1>
          <p className="text-muted-foreground mt-2">Sistema de Gestão de Documentos</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Acesso ao Sistema</CardTitle>
            <CardDescription>
              Faça login ou crie uma nova conta para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Login</TabsTrigger>
                <TabsTrigger value="signup">Cadastro</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Senha</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Usuário</Label>
                    <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="font-medium text-blue-800 mb-1">Detecção Automática</p>
                      <p>• O email <span className="font-mono bg-white px-1 rounded">ra125119@uem.br</span> terá acesso administrativo</p>
                      <p>• Outros e-mails serão considerados usuários automaticamente</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
