import { z } from 'zod';

// Common Zod schemas for reuse
export const zString = z.string().trim();
export const zName = zString.min(1).max(200);
export const zDescription = zString.max(500);
export const zNullableDescription = zDescription.nullable();
export const zId = z.coerce.number().int().positive();
export const zNullableId = zId.nullable();
export const zEmail = zString.email().max(255);
export const zBit = z.coerce.number().int().min(0).max(1);
export const zDateString = zString.datetime();

// Helper to create nullable string with max length
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};
