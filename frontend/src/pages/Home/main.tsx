import { Button } from '@/core/components/button';

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Bem-vindo ao Catálogo de Carros
      </h1>
      <p className="max-w-[700px] text-muted-foreground md:text-xl">
        Encontre o carro dos seus sonhos com facilidade e rapidez.
      </p>
      <div className="flex gap-4">
        <Button size="lg">Ver Catálogo</Button>
        <Button variant="outline" size="lg">
          Saiba Mais
        </Button>
      </div>
    </div>
  );
};
