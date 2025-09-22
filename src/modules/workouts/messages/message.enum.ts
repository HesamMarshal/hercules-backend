export enum AuthMessage {
  OtpSent = 'کد یکبار مصرف ارسال شد',
  OtpWrong = 'کد یکبار مصرف اشتباه است',
  OtpExpired = 'کد تایید منقضی شده است',
  OtpNotExpired = 'کد تایید منقضی نشده است',

  LoggedIn = 'با موفقیت وارد حساب کاربری خود شدید',
  TryAgain = 'دوباره تلاش کنید',

  MobileExist = 'شماره موبایل وارد شده قبلا ثبت شده است',
  EmailExist = 'ایمیل وارد شده قبلا ثبت شده است',

  LoginAgain = 'مجدد وارد حساب کاربری خود شوید',
  LoginIsRequired = 'وارد حساب کاربری خود شوید',
  AccountNotFound = 'حساب کاربری پیدا نشد.',
}

export enum WorkoutMessage {
  Created = 'تمرین ایجاد شد',
  AlreadyExist = 'این تمرین وجود دارد',
  NotFound = 'تمرین پیدا نشد',
  Deleted = 'تمرین با موفقیت حذف گردید',
  Updated = 'تمرین با موفقیت به روز رسانی گردید',
}
