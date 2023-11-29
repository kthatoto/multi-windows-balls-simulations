import Ball from "@/components/Ball";
import { useObserveWindow } from "@/hooks/useObserveWindow";

const Index = () => {
  const { main } = useObserveWindow();

  return (
    <div className="app">
      {[...Array(5)].map((_, i) => <Ball key={i} />)}
    </div>
  );
};
export default Index;
