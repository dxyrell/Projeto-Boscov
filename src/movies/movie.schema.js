const z = require('zod');

const movieSchema = z.object({
  nome: z.string().min(1),
  diretor: z.string().min(1),
  anoLancamento: z.number().int().min(1900).max(2100),
  duracao: z.number().int().positive(),
  produtora: z.string().min(1),
  classificacao: z.string().min(1),
  poster: z.string().url(),
  generos: z.array(z.number().int().positive()).optional(),
});

module.exports = movieSchema;
