/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect } from 'react';
import { registerApplication, start, getAppNames } from 'single-spa';


const isApplicationRegistered = (appName: string) => {
  const registeredApps = getAppNames();
  return registeredApps.includes(appName);
};


export const Pokemons = () => {
  useEffect(() => {
    if (!isApplicationRegistered('@isomorphic-mf/pokemons')) {
      registerApplication({
        name: '@isomorphic-mf/pokemons', // Microfrontend name
        app: () => System.import('https://storage.googleapis.com/isomorphic.microfrontends.app/pokemons/8bd859cb4ca90b34f577c701aeaa1dcdada3a164/isomorphic-mf-pokemons.js'), // URL for the microfrontend
        activeWhen: ['/pokemons'], // Activate on the root or specific route
      });
  
      // Start single-spa
      start();
    }
  }, []);
  
  return (
    <div id="@isomorphic-mf/pokemons"></div>
  );
};
