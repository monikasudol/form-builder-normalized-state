import { get } from 'idb-keyval';

export const fetchHistory = () => get('current-form')
  .then(state => state)
  .catch(() => console.log('Sth wrong happened'))
