import { cacheConfig } from '@melchyore/adonis-cache/build/config'

export default cacheConfig({
  prefix: 'cache_',

  store: 'in_memory',

  stores: {
    in_memory: {
      driver: 'in_memory',
    },
  },
  ttl: 60,
  events: {
    'cache:hit': true,
    'cache:missed': true,
    'cache:key_written': true,
    'cache:key_forgotten': true,
  },
})
