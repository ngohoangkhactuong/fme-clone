/**
 * Validate email format (HCMUTE student email)
 */
export const validateStudentEmail = (email: string): boolean => {
  const regex = /^(\d+)@student\.hcmute\.edu\.vn$/i;
  return regex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string
): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "Mật khẩu phải có ít nhất 8 ký tự" };
  }
  return { valid: true };
};

/**
 * Extract student ID from email
 */
export const extractStudentId = (email: string): string | null => {
  const match = email.match(/^(\d+)@student\.hcmute\.edu\.vn$/i);
  return match ? match[1] : null;
};
