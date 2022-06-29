// tipos permitidos para os cargos

const usersLevelsTypes = ['leitor', 'basico', 'avancado', 'moderador'] as const

type UsersLevelsTypes = typeof usersLevelsTypes[number]

export { usersLevelsTypes, UsersLevelsTypes }
