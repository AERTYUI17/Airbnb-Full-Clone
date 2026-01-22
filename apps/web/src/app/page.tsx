import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Airbnb Full Clone</h1>
          <p className="text-muted-foreground">
            Frontend con Next.js 15 + Backend con NestJS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Backend Ready</h2>
            <ul className="space-y-2 text-sm">
              <li>✅ 33 endpoints funcionando</li>
              <li>✅ Autenticación JWT</li>
              <li>✅ Stripe integrado</li>
              <li>✅ Sistema de reviews</li>
              <li>✅ Sistema de favoritos</li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Frontend Setup</h2>
            <ul className="space-y-2 text-sm">
              <li>✅ Next.js 15 instalado</li>
              <li>✅ TailwindCSS configurado</li>
              <li>✅ shadcn/ui instalado</li>
              <li>✅ API client configurado</li>
              <li>✅ Zustand store creado</li>
            </ul>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button size="lg">Ver Propiedades</Button>
          <Button size="lg" variant="outline">Login</Button>
        </div>

      </div>
    </main>
  )
}