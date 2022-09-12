import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container min-h-screen min-w-full bg-purple-700 flex items-center justify-center">
      <h1 className="text-lg text-white">Hello, World</h1>
    </div>
  );
}

export default App;
