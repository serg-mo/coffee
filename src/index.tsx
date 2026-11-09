import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RoastLabel from './components/RoastLabel';
import RoastShape from './types/RoastShape';

import './index.css';

const RouteComponent = () => {
  const [, route, roastId] = window.location.pathname.split('/');
  const [roast, setRoast] = useState<RoastShape | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (route !== 'label' || !roastId || requested.current) return;

    requested.current = true;

    fetch(`/roasts/${roastId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setRoast)
      .catch(console.error);
  }, [route, roastId]);

  if (route === 'label') {
    if (!roast) return null;
    return <RoastLabel roast={roast} />;
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteComponent />
  </React.StrictMode>,
);
