export enum BadRequestMessage {
  InValidLoginData = 'اطلاعات ارسال شده برای ورود صحیح نمی باشد',
  InValidRegisterData = 'اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد',
  SomethingWrong = 'خطایی پیش آمده',
  InvalidCategories = 'دسته بندی وارد شده صحیح نمی باشد',
}
export enum PublicMessage {
  Created = 'با موفقیت ایجاد شد',
  Updated = 'به روز رسانی شد',
  Deleted = 'با موفقیت حذف شد',
  NotAlloweded = 'شما مجاز به انجام این عملیات نیستید',
}
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
export enum UserMessage {
  NotFound = 'حساب کاربری پیدا نشد',
  Deleted = 'حساب کاربری حذف گردید',
  Updated = 'حساب کاربری به روز رسانی شد',
  ConflictPhone = 'این شماره موبایل متعلق به حساب کاربری دیگری است',
  ConflictUsername = 'این نام کاربری قبلا انتخاب شده است. نام دیگری انتخاب کنید',
  ConflictEmail = 'این پست الکترونیک متعلق به حساب کاربری دیگری است',
}

export enum PlanMessage {
  Created = 'برنامه ایجاد شد',
  AlreadyExist = 'این برنامه وجود دارد',
  NotFound = 'برنامه پیدا نشد',
  Deleted = 'برنامه با موفقیت حذف گردید',
  Updated = 'برنامه با موفقیت به روز رسانی گردید',
}

export enum CategoryMessage {
  Created = 'دسته بندی ایجاد شد',
  AlreadyExist = 'این دسته بندی وجود دارد',
  NotFound = 'دسته بندی پیدا نشد',
  Deleted = 'دسته بندی با موفقیت حذف گردید',
  Updated = 'دسته بندی با موفقیت به روز رسانی گردید',
}

export enum NotFoundMessage {
  UserNotFount = 'کاربر پیدا نشد',
  ClinicNotFount = 'کلینک پیدا نشد',
  CategoryNotFount = 'دسته بندی پیدا نشد',
  PlanNotFound = 'برنامه ای پیدا نشد',
  TransacionNotFound = 'تراکنش پیدا نشد',
}
export enum ValidationMessage {
  InvalidPhoneForamt = 'فرمت شماره موبایل وارد شده قابل قبول نیست',
  InvalidImageForamt = 'فرمت تصویر وارد شده قابل قبول نیست',
}
