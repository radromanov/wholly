import z from "zod";

export const zodMessage = (
  fieldname: string,
  opts?: { min?: number; max?: number }
) => {
  let message = `Please enter a valid ${fieldname}`;

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

export const zodErrors = (fieldname: string) => ({
  required_error: zodMessage(fieldname),
  invalid_type_error: zodMessage(fieldname),
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

export const ZOD_NOT_NULL_STRING_DEFAULT = (
  fieldname: string,
  opts?: { min?: number; max?: number }
) => {
  let builder = z.string(zodErrors(fieldname));

  if (opts) {
    if (opts.min && !opts.max) {
      builder = builder.min(opts.min, zodMessage(fieldname, opts));
    } else if (opts.max && !opts.min) {
      builder = builder.max(opts.max, zodMessage(fieldname, opts));
    } else if (opts.min && opts.max) {
      builder = builder
        .min(opts.min, zodMessage(fieldname, opts))
        .max(opts.max, zodMessage(fieldname, opts));
    }
  } else {
    builder = builder.min(1, zodMessage(fieldname, { min: 1 }));
  }

  return builder;
};
