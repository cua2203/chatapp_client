import { AbstractControl, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;

    // Kiểm tra độ dài
    const hasMinLength = password && password.length >= 8;
    // Kiểm tra có chữ hoa
    const hasUpperCase = /[A-Z]/.test(password);
    // Kiểm tra có chữ thường
    const hasLowerCase = /[a-z]/.test(password);
    // Kiểm tra có số
    const hasNumber = /\d/.test(password);
    // Kiểm tra có ký tự đặc biệt
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid =
      hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !isValid ? { 'weakPassword': true } : null; // Nếu không hợp lệ trả về lỗi
  };
}
