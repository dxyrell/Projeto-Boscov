const z = require('zod');

const reviewSchema = z.object({
  nota: z.number().min(0).max(10),
  comentario: z.string().min(1),
  idUsuario: z.number().int(),
  idFilme: z.number().int(),
});

module.exports = reviewSchema;
