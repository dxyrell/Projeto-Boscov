const z = require('zod');

const userSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  tipoUsuario: z.string().min(1, { message: "Tipo de usuário é obrigatório" }),
  status: z.boolean({ required_error: "Status é obrigatório" }),
  apelido: z.string().optional(),
  dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data inválida. Use o formato YYYY-MM-DD" }),
});

module.exports = userSchema;
