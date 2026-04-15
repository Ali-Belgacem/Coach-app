export const validateClient = (req, res, next) => {
  const { firstName, lastName, email, telephone, date } = req.body;
  
  const errors = [];

  if (!firstName || firstName.trim().length === 0) {
    errors.push('Le prénom est requis');
  }

  if (!lastName || lastName.trim().length === 0) {
    errors.push('Le nom est requis');
  }

  if (!email || email.trim().length === 0) {
    errors.push('L\'email est requis');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('L\'email n\'est pas valide');
  }

  if (!telephone || telephone.trim().length === 0) {
    errors.push('Le numéro de téléphone est requis');
  }

  if (!date) {
    errors.push('La date est requise');
  } else if (isNaN(Date.parse(date))) {
    errors.push('La date doit être au format valide');
  }

  if (!req.file) {
    errors.push('Une image est requise');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors
    });
  }

  next();
};