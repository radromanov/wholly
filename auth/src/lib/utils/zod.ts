import z from "zod";

export const zodMessage = (
  name: string,
  opts?: { min?: number; max?: number }
) => {
  let message = `Please enter a valid ${name}`;

  if (opts) {
    if (opts.min && !opts.max) {
      message += ` of at least ${opts.min} character(s)`;
    } else if (opts.max && !opts.min) {
      message += ` of up to ${opts.max} character(s)`;
    } else {
      message += ` between ${opts.min} and ${opts.max} character(s)`;
    }
  }

  return message;
};

export const zodErrors = (name: string) => ({
  required_error: zodMessage(name),
  invalid_type_error: zodMessage(name),
});

export const ZOD_EMAIL_DEFAULT = z
  .string(zodErrors("email"))
  .email(zodMessage("email"))
  .transform((val) => {
    const splitEmail = val.split("@");

    // Normalize the email
    const user = splitEmail[0];
    const domain = splitEmail[1]!.toLowerCase();

    const normalized = user + "@" + domain;
    return normalized;
  });
