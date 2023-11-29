import Ball from "@/components/Ball";
import { useObserveWindow } from "@/hooks/useObserveWindow";

const Index = () => {
  useObserveWindow();

  return (
    <div className="app"></div>
  );
};
export default Index;
