import { cacheConfig } from '@melchyore/adonis-cache/build/config'

export default cacheConfig({
  prefix: 'cache_',

  store: 'redis',

  stores: {
    redis: {
      driver: 'redis',
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Time to live (TTL)
  |--------------------------------------------------------------------------
  |
  | TTL is expressed in seconds.
  | 
  */
  ttl: 60,

  /*
  |--------------------------------------------------------------------------
  | Cache events
  |--------------------------------------------------------------------------
  |
  | Enable/disable cache events.
  | 
  */
  events: {
    'cache:hit': true,
    'cache:missed': true,
    'cache:key_written': true,
    'cache:key_forgotten': true,
  },
})
