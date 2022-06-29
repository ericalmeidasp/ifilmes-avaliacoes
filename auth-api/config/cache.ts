import { cacheConfig } from '@melchyore/adonis-cache/build/config'

export default cacheConfig({
  prefix: 'cache_',

  store: 'in_memory',

  stores: {
    /*
    |--------------------------------------------------------------------------
    | InMemory store
    |--------------------------------------------------------------------------
    |
    | Use this store to store cache in memory.
    |
    */
    in_memory: {
      driver: 'in_memory'
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
    'cache:key_forgotten': true
  }
})
