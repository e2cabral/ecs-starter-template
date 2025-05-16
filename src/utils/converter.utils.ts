import {ZodSchema} from "zod";

export function validateAndConvert<T>(
  data: unknown,
  schema: ZodSchema<T>
): T {
  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(
      `Validation error: ${JSON.stringify(parsedData.error.issues, null, 2)}`
    );
  }

  return parsedData.data;
}
