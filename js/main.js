import { photos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';

renderThumbnails(photos);
initForm();
initScale();
initEffects();
