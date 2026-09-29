import '@ionic/core/css/ionic.bundle.css';
import { defineCustomElements } from '@ionic/core/loader';
import './css/style.css';
import { renderApp } from './js/app.js';

defineCustomElements(window);

renderApp();