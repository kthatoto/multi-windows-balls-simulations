import Ball from "@/components/Ball";
import { useSetup } from "@/hooks/useSetup";

const Index = () => {
  useSetup();

  return (
    <div className="app">
      {[...Array(5)].map((_, i) => <Ball key={i} />)}
    </div>
  );
};
export default Index;
