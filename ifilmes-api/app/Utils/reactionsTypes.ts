// tipoes permitidos para as reações

const reactionsTypes = ['like', 'unlike'] as const

type ReactionsTypes = typeof reactionsTypes[number]

export { reactionsTypes, ReactionsTypes }
