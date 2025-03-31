import { ZodError } from "zod";

export default function zodErrorSchema(error: ZodError): Record<string, string> {
  return error.issues.reduce((acc, issue) => {
    // Assuming the first element of the path is the key (like 'name', 'address', etc.)
    const key = issue.path[0];
    if (typeof key === 'string') {
      acc[key] = issue.message;
    }
    return acc;
  }, {} as Record<string, string>);
}
