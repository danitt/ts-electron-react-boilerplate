import React from 'react';

// Layout Effect hook does not support SSR, stubbing with Effect
React.useLayoutEffect = React.useEffect;
